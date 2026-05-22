#!/usr/bin/env bash
# Bootstrap idempotente do monorepo GDS.
# Pode ser rodado quantas vezes quiser; ações já feitas são puladas.

set -euo pipefail

# Vai para a raiz do monorepo (1 nível acima de scripts/).
cd "$(dirname "$0")/.."

# --------- helpers ---------
c_green()  { printf '\033[0;32m%s\033[0m\n' "$*"; }
c_yellow() { printf '\033[0;33m%s\033[0m\n' "$*"; }
c_blue()   { printf '\033[0;34m%s\033[0m\n' "$*"; }
c_red()    { printf '\033[0;31m%s\033[0m\n' "$*"; }

step() { c_blue ""; c_blue "==> $*"; }
ok()   { c_green "    ✓ $*"; }
warn() { c_yellow "    ! $*"; }
fail() { c_red   "    ✗ $*"; exit 1; }

dc() { docker compose "$@"; }

exec_back()    { dc exec -T back-app bash -lc "$1"; }
exec_codegen() { dc exec -T codegen-app bash -lc "$1"; }

# --------- 1) Arquivos .env (monorepo + apps Symfony) ---------
step "Verificando .env do monorepo"
if [[ ! -f .env ]]; then
    cp .env.example .env
    ok ".env criado a partir de .env.example"
else
    ok ".env já existe"
fi

# As apps Symfony (back / code-generator) precisam de um .env local porque o
# Dotenv tenta lê-lo no boot. O docker-compose já injeta as variáveis sensíveis
# via `environment:`, mas o arquivo precisa existir em disco.
for app in apps/back apps/code-generator; do
    if [[ ! -f "$app/.env" ]]; then
        if [[ -f "$app/.env.example" ]]; then
            cp "$app/.env.example" "$app/.env"
            ok "$app/.env criado a partir de $app/.env.example"
        else
            fail "$app/.env.example não encontrado — não consigo criar $app/.env"
        fi
    else
        ok "$app/.env já existe"
    fi
done

# --------- 2) Sobe MySQL ---------
step "Subindo MySQL e aguardando ficar saudável"
dc up -d mysql
# o healthcheck do compose vai marcar como healthy quando estiver pronto
for i in {1..60}; do
    health=$(docker inspect -f '{{.State.Health.Status}}' gds-mysql 2>/dev/null || echo "starting")
    if [[ "$health" == "healthy" ]]; then
        ok "MySQL healthy"
        break
    fi
    if [[ "$i" == "60" ]]; then
        fail "MySQL não ficou healthy em 5 minutos. Veja: docker compose logs mysql"
    fi
    sleep 5
done

# --------- 3) Sobe demais containers (back + codegen + front) ---------
step "Subindo back, codegen e front"
dc up -d --build back-app back-nginx codegen-app codegen-nginx front
ok "containers de aplicação subiram"

# Da um respiro pro fpm carregar
sleep 3

# --------- 4) Composer install no back ---------
step "back: composer install"
if exec_back "[ -d vendor ] && [ -f vendor/autoload.php ]"; then
    ok "vendor já presente — pulando"
else
    exec_back "composer install --no-interaction --no-progress --prefer-dist"
    ok "vendor instalado"
fi

# --------- 5) JWT keypair ---------
step "back: gerando JWT keypair (skip se já existir)"
if exec_back "[ -f config/jwt/private.pem ] && [ -f config/jwt/public.pem ]"; then
    ok "keypair já existe"
else
    exec_back "bin/console lexik:jwt:generate-keypair --skip-if-exists --no-interaction"
    ok "keypair gerado"
fi

# --------- 6) Schema do banco ---------
step "back: doctrine:schema:update --force"
exec_back "bin/console doctrine:schema:update --force --no-interaction"
ok "schema atualizado"

# --------- 7) Cria admin + user ---------
step "back: gds:bootstrap (admin + user)"
exec_back "bin/console gds:bootstrap --no-interaction"
ok "usuários prontos"

# --------- 8) Assets + cache ---------
step "back: assets:install + cache:clear"
exec_back "bin/console assets:install --symlink --no-interaction" >/dev/null
exec_back "bin/console cache:clear --no-interaction"             >/dev/null
ok "assets e cache OK"

# --------- 9) Composer install no codegen ---------
step "codegen: composer install"
if exec_codegen "[ -d vendor ] && [ -f vendor/autoload.php ]"; then
    ok "vendor já presente — pulando"
else
    exec_codegen "composer install --no-interaction --no-progress --prefer-dist"
    ok "vendor instalado"
fi

# --------- 10) cache codegen ---------
step "codegen: cache:clear"
exec_codegen "bin/console cache:clear --no-interaction" >/dev/null
ok "cache OK"

# --------- 11) Status final ---------
step "Resumo"
dc ps

cat <<EOF

$(c_green "GDS monorepo pronto.")

  Front (Vue 3, Vite)       → http://localhost:${FRONT_HOST_PORT:-9000}
  Back  (Symfony API)       → http://localhost:${BACK_HOST_PORT:-9001}
  Code generator            → http://localhost:${CODEGEN_HOST_PORT:-9003}
  MySQL                     → localhost:${MYSQL_HOST_PORT:-3310}  (user root / senha em .env)

Login default no front:
  admin / admin@gds.local / admin
  user  / user@gds.local  / user

O front pode levar 1-2 min na primeira subida (npm install + vite cold start).
Acompanhe com:  make logs

EOF

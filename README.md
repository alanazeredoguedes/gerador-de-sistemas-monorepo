<div align="center">

# GDS — Gerador de Sistemas

**Plataforma de _Model-Driven Development_ que transforma a modelagem objeto-relacional de um sistema em uma aplicação web full-stack pronta para uso.**

[![PHP](https://img.shields.io/badge/PHP-8.1-777BB4.svg?style=flat&logo=php&logoColor=white)](https://www.php.net/)
[![Symfony](https://img.shields.io/badge/Symfony-6.0-000000.svg?style=flat&logo=symfony&logoColor=white)](https://symfony.com/)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D.svg?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg?style=flat&logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1.svg?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](#licença)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.20316548.svg)](https://doi.org/10.5281/zenodo.20316548)

</div>

---

O **GDS** recebe um diagrama de classes (entidades, atributos e relacionamentos) e gera automaticamente uma aplicação Symfony 6 completa, com painel administrativo (Sonata Admin), API REST autenticada via JWT, front-end web e ambiente Docker — tudo a partir de um único clique no editor visual.

Este repositório é o **monorepo unificado** dos quatro componentes do GDS, originalmente publicados em repositórios separados. Um único `docker-compose.yml` orquestra tudo, e o script `./start.sh` provisiona o ambiente de ponta a ponta.

## Sumário

1. [Início rápido (3 comandos)](#início-rápido-3-comandos)
2. [Arquitetura](#arquitetura)
3. [Componentes](#componentes)
4. [Serviços e portas](#serviços-e-portas)
5. [Usuários criados automaticamente](#usuários-criados-automaticamente)
6. [Estrutura do monorepo](#estrutura-do-monorepo)
7. [Comandos úteis](#comandos-úteis)
8. [Variáveis de ambiente](#variáveis-de-ambiente)
9. [Fluxo de geração de um sistema](#fluxo-de-geração-de-um-sistema)
10. [Modo AWS (produção)](#modo-aws-produção)
11. [Troubleshooting](#troubleshooting)
12. [Stack tecnológica](#stack-tecnológica)
13. [Sobre o TCC e como citar](#sobre-o-tcc-e-como-citar)
14. [Licença](#licença)

---

## Início rápido (3 comandos)

Pré-requisitos: **Docker Engine 20.10+** e **Docker Compose v2**.

```bash
git clone https://github.com/alanazeredoguedes/gerador-de-sistemas-monorepo.git
cd gerador-de-sistemas-monorepo
./start.sh
```

O `start.sh` faz tudo automaticamente:

1. Verifica se o Docker está disponível.
2. Copia `.env.example` → `.env` na primeira execução.
3. Sobe o MySQL e aguarda ele ficar saudável.
4. Sobe back, code-generator e front-end.
5. Instala dependências (Composer + npm) dentro dos containers.
6. Gera o par de chaves JWT (Lexik).
7. Aplica o schema do banco via Doctrine.
8. Executa **`gds:bootstrap`**, que cria os usuários padrão e popula as _seeds_ iniciais (linguagens e frameworks).
9. Limpa cache e instala assets.

> Tempo médio de subida inicial: **3 a 5 minutos** (depende da velocidade da rede para baixar imagens e vendor). Execuções subsequentes são quase instantâneas.

Depois de pronto, abra **<http://localhost:9000>** no navegador.

## Arquitetura

```
                     ┌─────────────────┐
                     │   Browser       │
                     │   (HTTP + JWT)  │
                     └────────┬────────┘
                              │
                              ▼
   ┌─────────────────────────────────────────────────────┐
   │                                                     │
   │   FRONT  :9000  ───REST───►   BACK  :9001           │
   │   Vue 3 + Vite                Symfony 6 + JWT       │
   │                               + Sonata Admin        │
   │                                       │             │
   │                                       │ HTTP POST   │
   │                                       ▼             │
   │                               CODEGEN  :9003        │
   │                               Symfony 6 + Twig      │
   │                               (motor de geração)    │
   │                                       │             │
   │                                       │ clona base  │
   │                                       ▼             │
   │                               apps/base/ (template) │
   │                                       │             │
   │                                       │ grava em    │
   │                                       ▼             │
   │                          output/generated-apps/<id>/│
   │                                                     │
   └─────────────────────────────────────────────────────┘
                              │
                              ▼
                       ┌────────────┐
                       │ MySQL 8.0  │
                       │   :3310    │
                       └────────────┘
```

## Componentes

| Componente | Tecnologia | Diretório | Responsabilidade |
|---|---|---|---|
| **Front** | Vue 3 + Vite | `apps/front/` | Editor visual de diagramas (SPA) |
| **Back** | Symfony 6 + JWT + Sonata Admin | `apps/back/` | API REST, autenticação e persistência |
| **Code Generator** | Symfony 6 + Twig | `apps/code-generator/` | Motor de geração de código |
| **Base** | Symfony 6 | `apps/base/` | Template fundacional clonado pelo gerador (não roda como serviço) |

## Serviços e portas

| Serviço | Container | Porta (host) | Acesso |
|---|---|---|---|
| Front (Vue 3) | `gds-front` | **9000** | <http://localhost:9000> |
| Back API | `gds-back-nginx` → `gds-back-app` | **9001** | <http://localhost:9001> |
| Back Admin | (mesmo) | **9001** | <http://localhost:9001/admin> |
| Code Generator | `gds-codegen-nginx` → `gds-codegen-app` | **9003** | <http://localhost:9003> |
| MySQL | `gds-mysql` | **3310** | `mysql://root:root@localhost:3310/gds_back` |

> Todas as portas são configuráveis no `.env` (`FRONT_HOST_PORT`, `BACK_HOST_PORT`, `CODEGEN_HOST_PORT`, `MYSQL_HOST_PORT`). Mude se já tiver algo ocupando-as.

## Usuários criados automaticamente

O comando `gds:bootstrap` (executado pelo `start.sh`) cria dois usuários distintos para você usar imediatamente:

### Administrador — painel Sonata Admin

| Campo | Valor |
|---|---|
| **Username** | `admin` |
| **E-mail** | `admin@gds.local` |
| **Senha** | `admin` |
| **Roles** | `ROLE_SUPER_ADMIN`, `ROLE_SUPER_API` |
| **Onde usar** | Painel administrativo do back |
| **URL de acesso** | <http://localhost:9001/admin> |

### Usuário padrão — front-end (editor de diagramas)

| Campo | Valor |
|---|---|
| **Username** | `user` |
| **E-mail** | `user@gds.local` |
| **Senha** | `user` |
| **Roles** | `ROLE_SUPER_API` (sem acesso ao admin) |
| **Onde usar** | Front-end Vue e API REST via JWT |
| **URL de acesso** | <http://localhost:9000> |

**Obtendo um token JWT diretamente pela API:**

```bash
curl -X POST http://localhost:9001/api/login_check \
     -H "Content-Type: application/json" \
     -d '{"username":"user@gds.local","password":"user"}'
```

**Para alterar as credenciais padrão**, sobrescreva via flags:

```bash
docker compose exec back-app bin/console gds:bootstrap \
    --admin-username=meuadmin --admin-email=meu@email.com --admin-password=SenhaForte!2026 \
    --user-username=meuuser  --user-email=meuuser@email.com --user-password=OutraSenha!2026
```

> **Importante:** as credenciais acima são para desenvolvimento local. Antes de expor o ambiente publicamente, **rode `gds:bootstrap` com novos valores** e troque também `BACK_APP_SECRET`, `CODEGEN_APP_SECRET` e `BACK_JWT_PASSPHRASE` no `.env`.

### Seeds populadas automaticamente

Além dos usuários, o bootstrap insere dados de catálogo necessários para o editor funcionar:

| Entidade | Registro | Observações |
|---|---|---|
| `ProgrammingLanguage` | **PHP** | Com logo |
| `Framework` | **Symfony** | Vinculado ao PHP, com logo |

Os arquivos-fonte dos logos vivem em `apps/back/data/seed/` e são versionados.

## Estrutura do monorepo

```
gerador-de-sistemas-monorepo/
├── start.sh                       ← ponto de entrada único (você roda isso)
├── Makefile                       ← atalhos (make up, make logs, make shell-back…)
├── docker-compose.yml             ← orquestra mysql + back + codegen + front
├── .env                           ← variáveis (criado a partir de .env.example)
├── .env.example                   ← template versionado
│
├── apps/                          ← código-fonte dos componentes
│   ├── front/                     Vue 3 + Vite — editor visual de diagramas
│   ├── back/                      Symfony 6 + JWT + Sonata — API REST e admin
│   ├── code-generator/            Symfony 6 + Twig — motor de geração
│   │   └── src/Application/Generator/GeneratorBundle/
│   │       ├── Generator.php                       ← orquestrador
│   │       ├── Maker/                              ← cada Maker* gera um tipo de arquivo
│   │       └── Resources/skeleton/*.twig           ← templates dos arquivos gerados
│   └── base/                      Symfony 6 — template fundacional clonado pelo codegen
│
├── docker/
│   ├── php/Dockerfile             imagem PHP 8.1-fpm (usada por back e codegen)
│   ├── nginx/back.conf            reverse proxy do back
│   ├── nginx/codegen.conf         reverse proxy do codegen + serve /downloads
│   └── mysql/init.sql             cria o database gds_back na primeira subida
│
├── scripts/
│   └── bootstrap.sh               setup idempotente (chamado pelo start.sh)
│
└── output/                        ← saídas do gerador (gitignored)
    ├── generated-apps/<hash>/     código-fonte de cada app gerado
    └── downloads/<hash>.zip       zip pronto para download
```

## Comandos úteis

Todos os atalhos abaixo estão no `Makefile`:

| Comando | O que faz |
|---|---|
| `./start.sh` | **Setup inicial completo** (use após clonar) |
| `make up` | Sobe os containers em background |
| `make down` | Derruba os containers (preserva o volume do MySQL) |
| `make build` | (Re)builda imagens |
| `make rebuild` | `down` + build `--no-cache` + `up` |
| `make bootstrap` | Re-executa `scripts/bootstrap.sh` |
| `make logs` | `tail -f` dos logs de todos os containers |
| `make ps` | Status dos containers |
| `make shell-back` | Abre bash dentro do container do back |
| `make shell-codegen` | Abre bash dentro do container do code-gen |
| `make shell-front` | Abre sh dentro do container do front |
| `make shell-mysql` | Abre cliente `mysql` conectado no banco |
| `make clean` | `down -v` — **apaga o banco de dados** |
| `make nuke` | `clean` + remove a imagem PHP local |

Comandos comuns dentro dos containers:

```bash
# Symfony console no back
docker compose exec back-app bin/console <comando>

# Composer no back / codegen
docker compose exec back-app    composer <comando>
docker compose exec codegen-app composer <comando>

# Inspecionar logs de um único serviço
docker compose logs -f back-app
```

## Variáveis de ambiente

Todas vivem em `.env` (criado a partir de `.env.example`):

| Variável | Default | Significado |
|---|---|---|
| `APP_ENV` | `dev` | Ambiente Symfony (`dev`/`prod`) |
| `MYSQL_HOST_PORT` | `3310` | Porta do MySQL no host |
| `BACK_HOST_PORT` | `9001` | Porta do back no host |
| `CODEGEN_HOST_PORT` | `9003` | Porta do code-gen no host |
| `FRONT_HOST_PORT` | `9000` | Porta do front no host |
| `MYSQL_ROOT_PASSWORD` | `root` | Senha root do MySQL |
| `MYSQL_DATABASE_BACK` | `gds_back` | Nome do database do back |
| `BACK_APP_SECRET` | _change-me_ | Secret do framework Symfony (back) |
| `CODEGEN_APP_SECRET` | _change-me_ | Secret do framework Symfony (codegen) |
| `BACK_DATABASE_URL` | `mysql://root:root@mysql:3306/gds_back` | DSN interno do Doctrine |
| `BACK_JWT_PASSPHRASE` | _change-me_ | Passphrase do par JWT |
| `CORS_ALLOW_ORIGIN` | regex localhost | Origens permitidas pelo Nelmio CORS |
| `CODE_GENERATOR_URL` | `http://codegen-nginx` | URL interna do codegen (vista pelo back) |
| `BACK_URL` | `http://back-nginx` | URL interna do back (vista pelo codegen) |
| `VITE_API_BASE_URL` | `http://localhost:9001` | URL pública do back (vista pelo browser) |
| `MOCK_DEPLOY` | `1` | `0` reativa o fluxo AWS (EC2 + SNS + push GitHub) |
| `AWS_KEY` / `AWS_SECRET` | `mock` | Credenciais AWS (só em produção) |

## Fluxo de geração de um sistema

Modo `MOCK_DEPLOY=1` (padrão deste monorepo):

1. O usuário monta o diagrama no front e clica em **Gerar**.
2. Front chama `GET /api/application/generate/{id}` no back.
3. Back faz `POST http://codegen-nginx/generate` com o payload da modelagem.
4. Code-gen:
   - Clona `apps/base/` para `output/generated-apps/<hash>/`.
   - Renderiza todos os arquivos derivados das classes do diagrama (entities, repositories, controllers, admins, forms, views Twig, rotas, services, docker-compose, `.env`, `README.md`, `start_project.sh`…).
   - Empacota tudo em `output/downloads/<hash>.zip`.
5. Code-gen chama de volta `POST /api/application/generate/getRepository` e `/getServer` no back para atualizar o registro da `Application` com a URL/credenciais.
6. Front faz polling e exibe o link de download e as credenciais do app gerado.

Cada app gerado vem com seu próprio `start_project.sh`, totalmente independente do monorepo.

## Modo AWS (produção)

O código preservou o caminho original de produção. Para reativá-lo:

```diff
# .env
- MOCK_DEPLOY=1
+ MOCK_DEPLOY=0
- AWS_KEY=mock
+ AWS_KEY=AKIA...
- AWS_SECRET=mock
+ AWS_SECRET=...
```

```bash
make rebuild && ./start.sh
```

Com `MOCK_DEPLOY=0`, o code-gen volta a:

- Publicar mensagens no **SNS** (`gds-sistema-gerado-repositorio` e `gds-sistema-gerado-servidor`).
- Fazer **push do código gerado no GitHub** (requer ajustar o token em `GitHelper::commitProject`).
- Provisionar uma instância **EC2** com user-data que clona o repositório e roda o `start_project.sh`.

## Troubleshooting

<details>
<summary><b>O <code>start.sh</code> falha com "MySQL não ficou healthy"</b></summary>

A porta `3310` provavelmente está em uso. Edite `.env` e troque `MYSQL_HOST_PORT=3311` (ou outro valor livre). Depois:

```bash
docker compose down
./start.sh
```
</details>

<details>
<summary><b>Front responde mas não consegue chamar o back (CORS / network error)</b></summary>

Confirme que `VITE_API_BASE_URL` no `.env` casa com a porta efetiva do back no host. Se mudou `BACK_HOST_PORT`, atualize também essa variável e rebuilde o front:

```bash
docker compose restart front
```
</details>

<details>
<summary><b>"JWT Token not found" depois de <code>make clean</code></b></summary>

`make clean` apaga o volume do MySQL — os usuários sumiram, mas o keypair em `apps/back/config/jwt/` continua. Rode `./start.sh` de novo para recriar admin/user.
</details>

<details>
<summary><b>Composer install travado / muito lento</b></summary>

Primeira execução baixa ~200 MB de vendor (back + codegen). Se a rede estiver lenta, deixe terminar — execuções subsequentes usam cache. Para ver o que está acontecendo: `make logs`.
</details>

<details>
<summary><b>Build da imagem PHP demora 2 minutos</b></summary>

É o `pecl install imagick` na primeira build da imagem. Acontece **uma única vez** e fica cacheado.
</details>

<details>
<summary><b>Permissões em <code>var/cache</code> ou <code>public/uploads</code></b></summary>

A imagem PHP é construída com o `HOST_UID`/`HOST_GID` do seu usuário. Se mesmo assim algo der errado:

```bash
docker compose exec back-app chmod -R 777 var public/uploads
```
</details>

<details>
<summary><b>Quero zerar tudo e começar do zero</b></summary>

```bash
make clean      # derruba e apaga o volume do MySQL
make nuke       # também remove a imagem PHP buildada
./start.sh      # reinstala do zero
```
</details>

## Stack tecnológica

**Back-end (Symfony 6):**
[Doctrine ORM](https://www.doctrine-project.org/) · [Sonata Admin](https://docs.sonata-project.org/projects/SonataAdminBundle/) · [Lexik JWT](https://github.com/lexik/LexikJWTAuthenticationBundle) · [Nelmio CORS](https://github.com/nelmio/NelmioCorsBundle) · [Sonata Media](https://docs.sonata-project.org/projects/SonataMediaBundle/)

**Front-end:**
[Vue 3](https://vuejs.org/) · [Vite](https://vitejs.dev/) · [Pinia](https://pinia.vuejs.org/) · [Vue Router](https://router.vuejs.org/)

**Infraestrutura:**
[Docker](https://www.docker.com/) · [Docker Compose v2](https://docs.docker.com/compose/) · [MySQL 8.0](https://www.mysql.com/) · [Nginx](https://nginx.org/) · [PHP-FPM 8.1](https://www.php.net/manual/en/install.fpm.php)

## Sobre o TCC e como citar

Este projeto foi desenvolvido como **Trabalho de Conclusão de Curso** em Sistemas de Informação no **Centro Universitário La Salle do Rio de Janeiro (Unilasalle-RJ)**, defendido em **dezembro de 2022**.

- **Autor:** Alan Azeredo Guedes
- **Orientador:** Prof. Msc. Mario João Junior
- **DOI:** [10.5281/zenodo.20316548](https://doi.org/10.5281/zenodo.20316548)

**Como citar (ABNT):**

> GUEDES, A. A. **GDS — Gerador de Sistemas**: uma ferramenta de modelagem e geração de sistemas. 2022. Trabalho de Conclusão de Curso (Bacharelado em Sistemas de Informação) — Centro Universitário La Salle do Rio de Janeiro, Rio de Janeiro, 2022. DOI: 10.5281/zenodo.20316548.

Para metadados estruturados, veja [`CITATION.cff`](apps/base/CITATION.cff).

### Repositórios originais

Antes da unificação neste monorepo, cada componente vivia em seu próprio repositório:

- [gerador-de-sistemas-front](https://github.com/alanazeredoguedes/gerador-de-sistemas-front)
- [gerador-de-sistemas-back](https://github.com/alanazeredoguedes/gerador-de-sistemas-back)
- [gerador-de-sistemas-code-generator](https://github.com/alanazeredoguedes/gerador-de-sistemas-code-generator)
- [gerador-de-sistemas-base](https://github.com/alanazeredoguedes/gerador-de-sistemas-base)

## Licença

Distribuído sob a licença **MIT**. Cada subprojeto em `apps/` mantém o seu próprio arquivo `LICENSE` para fins de citação independente.

---

<div align="center">
<sub>Feito com ☕ por <a href="https://github.com/alanazeredoguedes">Alan Azeredo Guedes</a> — Unilasalle-RJ · 2022</sub>
</div>

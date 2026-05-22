#!/usr/bin/env bash
# =============================================================================
#  GDS — Gerador de Sistemas (monorepo)
#  Ponto de entrada único: depois de clonar o repositório, rode `./start.sh`
#  e o ambiente inteiro sobe (containers, banco, schema, usuários e seeds).
#  Idempotente — pode rodar quantas vezes precisar.
# =============================================================================
set -euo pipefail

cd "$(dirname "$0")"

# --------- helpers ---------
c_green()  { printf '\033[0;32m%s\033[0m\n' "$*"; }
c_yellow() { printf '\033[0;33m%s\033[0m\n' "$*"; }
c_red()    { printf '\033[0;31m%s\033[0m\n' "$*"; }

# --------- pré-checagem: docker e docker compose v2 ---------
if ! command -v docker >/dev/null 2>&1; then
    c_red "Docker não encontrado no PATH."
    c_yellow "  → instale em: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
    c_red "Plugin 'docker compose' (v2) não encontrado."
    c_yellow "  → instale o pacote 'docker-compose-plugin' ou atualize o Docker Desktop."
    exit 1
fi

if ! docker info >/dev/null 2>&1; then
    c_red "Docker daemon não está respondendo."
    c_yellow "  → inicie o serviço:  sudo systemctl start docker   (ou abra o Docker Desktop)"
    exit 1
fi

c_green "Docker OK — delegando para scripts/bootstrap.sh"
echo

# --------- delega ao bootstrap idempotente ---------
exec bash scripts/bootstrap.sh "$@"

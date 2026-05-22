#!/usr/bin/env bash
# Executa comandos dentro do container PHP (serviço "app" do docker-compose).
# Uso: ./run.sh <comando> [args...]
set -e
docker compose exec -T app "$@"

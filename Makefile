SHELL := /bin/bash

# Carrega .env automaticamente se existir
ifneq (,$(wildcard .env))
include .env
export
endif

.PHONY: help start up down build rebuild logs ps bootstrap clean nuke \
        shell-back shell-codegen shell-front shell-mysql \
        back-console codegen-console front-console

help:
	@echo "GDS monorepo — comandos disponíveis"
	@echo ""
	@echo "  make start         Setup completo (igual ./start.sh) — use após clonar"
	@echo "  make up            Sobe todos os containers (mysql, back, codegen, front)"
	@echo "  make down          Para todos os containers"
	@echo "  make build         (Re)builda imagens"
	@echo "  make rebuild       Para, builda do zero e sobe"
	@echo "  make logs          Acompanha logs de todos"
	@echo "  make ps            Lista status dos containers"
	@echo "  make bootstrap     Roda setup 1x: composer, JWT, schema, admin/user"
	@echo "  make clean         down + remove volumes (apaga DB!)"
	@echo "  make nuke          clean + remove imagens buildadas"
	@echo ""
	@echo "  make shell-back    Bash no container back-app"
	@echo "  make shell-codegen Bash no container codegen-app"
	@echo "  make shell-front   Sh no container front"
	@echo "  make shell-mysql   mysql client no container mysql"

up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose build

rebuild:
	docker compose down
	docker compose build --no-cache
	docker compose up -d

logs:
	docker compose logs -f

ps:
	docker compose ps

start:
	bash start.sh

bootstrap:
	bash scripts/bootstrap.sh

clean:
	docker compose down -v

nuke: clean
	docker rmi gds-php81 || true

shell-back:
	docker compose exec back-app bash

shell-codegen:
	docker compose exec codegen-app bash

shell-front:
	docker compose exec front sh

shell-mysql:
	docker compose exec mysql mysql -uroot -p$(MYSQL_ROOT_PASSWORD) $(MYSQL_DATABASE_BACK)

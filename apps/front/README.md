# GDS — Gerador de Sistemas (Frontend)

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.20316548.svg)](https://doi.org/10.5281/zenodo.20316548)

Interface web (SPA) do **GDS — Gerador de Sistemas**, plataforma de *Model-Driven Development* desenvolvida como Trabalho de Conclusão de Curso em Sistemas de Informação no **Centro Universitário La Salle do Rio de Janeiro (Unilasalle-RJ)**, em 2022.

Este repositório contém o **frontend** — editor visual de diagramas objeto-relacionais (classes, atributos, relacionamentos 1:1, 1:N, N:N) usado pelo usuário para modelar o sistema que deseja gerar.

## Sobre o sistema GDS

O GDS recebe a modelagem objeto-relacional de um sistema e **gera automaticamente uma aplicação web full-stack**, incluindo backend PHP/Symfony, API REST documentada (Swagger), autenticação JWT, painel administrativo Sonata Admin, container Docker e deploy automatizado em AWS EC2.

O sistema é composto por **quatro componentes** que cooperam:

| Componente | Responsabilidade | Repositório |
|---|---|---|
| **Frontend (este repo)** | Editor visual de diagramas (Vue 3 SPA) | — |
| **Backend** | API REST, autenticação, persistência dos modelos | [gerador-de-sistemas-back](https://github.com/alanazeredoguedes/gerador-de-sistemas-back) |
| **Code Generator** | Motor de geração de código e deploy | [gerador-de-sistemas-code-generator](https://github.com/alanazeredoguedes/gerador-de-sistemas-code-generator) |
| **Base** | Template-base Symfony para apps gerados | [gerador-de-sistemas-base](https://github.com/alanazeredoguedes/gerador-de-sistemas-base) |

## Arquitetura

```
┌─────────────┐        ┌─────────────┐         ┌──────────────────┐
│ FRONTEND    │  HTTPS │ BACKEND     │ aciona  │ CODE GENERATOR   │
│ (este repo) │ ─────► │ Symfony 6   │ ──────► │ + AwsHelper      │
│ Vue 3 SPA   │  REST  │ + JWT       │         │ + GitHub deploy  │
└─────────────┘        └─────────────┘         └────────┬─────────┘
                                                        │ clona e
                                                        │ adapta
                                                        ▼
                                               ┌──────────────────┐
                                               │ BASE             │
                                               │ template Symfony │
                                               │ + bundles core   │
                                               └──────────────────┘
```

## Stack

- **Vue 3** + Composition API
- **Vite** (build tool)
- **Vuex** (gerenciamento de estado)
- **Vue Router** (navegação)
- **Axios** (cliente HTTP)
- **@shopify/draggable** (drag-and-drop para o editor de diagramas)
- **SweetAlert2**, **Vue Toastify** (UI feedback)

## Como executar (local)

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
npm install
```

### Modo desenvolvimento

```bash
npm run dev
# disponível em http://localhost:9000
```

### Build de produção

```bash
npm run build
# artefatos gerados em ./dist
```

### Executar via Docker

```bash
docker compose up -d
# disponível em http://localhost:9000
```

## Como citar

Se você usar este software em pesquisa, por favor cite-o:

> Guedes, A. A. (2022). *GDS — Gerador de Sistemas: Uma ferramenta de modelagem e geração de sistemas (Frontend)*. Trabalho de Conclusão de Curso, Centro Universitário La Salle do Rio de Janeiro. DOI: 10.5281/zenodo.XXXXXXX

Veja também o arquivo [`CITATION.cff`](./CITATION.cff) para metadados estruturados.

## Sobre o TCC

- **Autor:** Alan Azeredo Guedes
- **Orientador:** Prof. Msc. Mario João Junior
- **Instituição:** Centro Universitário La Salle do Rio de Janeiro (Unilasalle-RJ)
- **Curso:** Sistemas de Informação
- **Defesa:** Dezembro de 2022

## Licença

Distribuído sob a licença **MIT**. Veja [`LICENSE`](./LICENSE) para detalhes.

# GDS — Gerador de Sistemas (Base)

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.20316548.svg)](https://doi.org/10.5281/zenodo.20316548)

Template-base (Symfony 6) do **GDS — Gerador de Sistemas**, plataforma de *Model-Driven Development* desenvolvida como Trabalho de Conclusão de Curso em Sistemas de Informação no **Centro Universitário La Salle do Rio de Janeiro (Unilasalle-RJ)**, em 2022.

Este repositório fornece a **estrutura fundacional** que o motor de geração de código clona e adapta para cada aplicação produzida pelo GDS. Ele já vem com Symfony 6, Sonata Admin, autenticação JWT e um conjunto padronizado de bundles reusáveis (Segurança, Usuários, Mídia, Conteúdo, Configurações) prontos para serem estendidos com as entidades modeladas pelo usuário.

## Sobre o sistema GDS

O GDS recebe a modelagem objeto-relacional de um sistema (classes, atributos, relacionamentos) e gera automaticamente uma aplicação web full-stack. O sistema é composto por **quatro componentes** que cooperam:

| Componente | Responsabilidade | Repositório |
|---|---|---|
| Frontend | Editor visual de diagramas (Vue 3 SPA) | [gerador-de-sistemas-front](https://github.com/alanazeredoguedes/gerador-de-sistemas-front) |
| Backend | API REST, autenticação, persistência | [gerador-de-sistemas-back](https://github.com/alanazeredoguedes/gerador-de-sistemas-back) |
| Code Generator | Motor de geração de código e deploy | [gerador-de-sistemas-code-generator](https://github.com/alanazeredoguedes/gerador-de-sistemas-code-generator) |
| **Base (este repo)** | Template-base Symfony para apps gerados | — |

## Arquitetura

```
┌─────────────┐        ┌─────────────┐         ┌──────────────────┐
│ FRONTEND    │  HTTPS │ BACKEND     │ aciona  │ CODE GENERATOR   │
│ Vue 3 SPA   │ ─────► │ Symfony 6   │ ──────► │ + AwsHelper      │
│             │  REST  │ + JWT       │         │ + GitHub deploy  │
└─────────────┘        └─────────────┘         └────────┬─────────┘
                                                        │ clona e
                                                        │ adapta
                                                        ▼
                                               ┌──────────────────┐
                                               │ BASE (este repo) │
                                               │ template Symfony │
                                               │ + bundles core   │
                                               └──────────────────┘
```

## Stack

- **PHP 8.1**
- **Symfony 6**
- **Sonata Admin** (painel administrativo)
- **Doctrine ORM**
- **MySQL**
- **JWT** (lexik/jwt-authentication-bundle)
- **Docker** + Docker Compose

## Bundles reusáveis incluídos

- `Application/Project/SecurityUserBundle` — entidades User/Group
- `Application/Project/SecurityAdminBundle` — autenticação administrativa
- `Application/Project/ContentBundle` — gestão de conteúdo
- `Application/Project/MediaBundle` — uploads e galeria (Sonata Media)
- `Application/Project/SettingBundle` — configurações da aplicação

## Como executar (local)

### Pré-requisitos

- Docker e Docker Compose

### Instalação

```bash
docker compose build app
docker compose up -d
./start_project.sh
```

Comandos dentro do container:

```bash
docker compose exec app <comando>
```

## Convenções da API REST

O template já vem com um conjunto padronizado de operadores REST para filtragem, ordenação e paginação que todos os sistemas gerados herdam.

### Filtragem

Operadores enviados via querystring no formato `campo[operador]=valor`:

| Operador | Descrição | Exemplo |
|---|---|---|
| `igual` | Igualdade | `nome[igual]=lucas` |
| `diferente` | Diferença | `status[diferente]=ativo` |
| `maior` | Maior que | `preco[maior]=10` |
| `maior_ou_igual` | Maior ou igual | `preco[maior_ou_igual]=10` |
| `menor` | Menor que | `estoque[menor]=100` |
| `menor_ou_igual` | Menor ou igual | `estoque[menor_ou_igual]=100` |
| `nulo` | É nulo | `ativo[nulo]` |
| `nao_nulo` | Não é nulo | `ativo[nao_nulo]` |
| `comeca_com` | Começa com | `nome[comeca_com]=a` |
| `termina_com` | Termina com | `email[termina_com]=@gmail.com` |
| `contem` | Contém | `nome[contem]=d` |

Exemplo de composição:

```
GET /api/usuarios?nome[igual]=lucas&sobrenome[diferente]=souza
```

### Ordenação

Aplica-se via `campo[ordenar_por]=asc|desc`. Múltiplas chaves são suportadas:

```
GET /api/usuarios?id[ordenar_por]=asc&nome[ordenar_por]=desc
```

### Paginação

| Operador | Descrição | Default |
|---|---|---|
| `pagina` | Número da página | `1` |
| `paginaTamanho` | Itens por página | `10` |

```
GET /api/usuarios?pagina=2&paginaTamanho=20
```

## Como citar

> Guedes, A. A. (2022). *GDS — Gerador de Sistemas: Template-base Symfony*. Trabalho de Conclusão de Curso, Centro Universitário La Salle do Rio de Janeiro. DOI: 10.5281/zenodo.XXXXXXX

Veja também [`CITATION.cff`](./CITATION.cff) para metadados estruturados.

## Sobre o TCC

- **Autor:** Alan Azeredo Guedes
- **Orientador:** Prof. Msc. Mario João Junior
- **Instituição:** Centro Universitário La Salle do Rio de Janeiro (Unilasalle-RJ)
- **Curso:** Sistemas de Informação
- **Defesa:** Dezembro de 2022

## Licença

Distribuído sob a licença **MIT**. Veja [`LICENSE`](./LICENSE) para detalhes.

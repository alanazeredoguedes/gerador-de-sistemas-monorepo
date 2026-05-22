
// URL base da API.
// • Em dev (Vite), vem de import.meta.env.VITE_API_BASE_URL — definida no .env do front
//   ou pela variável de ambiente do container front no docker-compose.
// • Como o front roda no browser, esse valor precisa apontar para a porta do HOST
//   (ex.: http://localhost:9001), não para o DNS interno do docker (back-nginx).
export const URI_BASE_API   = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9001'
export const API_VERSION    = 'api'
export const TOKEN_NAME     = 'TOKEN_JWT'


# 🚀 Fullstack User Management

CRUD de usuários e perfis com **NestJS 11** (backend) + **Next.js 16 / React 19** (frontend). Dados em memória para prototipagem rápida.

[![Stack](https://img.shields.io/badge/Stack-NestJS%20|%20Next.js%20|%20React%20|%20TS-rose)](#) [![Node](https://img.shields.io/badge/Node-18%2B-green)](#) [![Status](https://img.shields.io/badge/Status-Prototype-lightgrey)](#)

## 🎯 Objetivo
Demonstrar um CRUD modular simples e comunicação REST clara entre backend NestJS e frontend Next.js utilizando arrays em memória (sem persistência) para foco na arquitetura.

## 🧱 Stack Essencial
| Categoria | Tecnologias |
|-----------|-------------|
| Runtime | Node 18+ (testado com 18.x e 20.x) |
| Backend | NestJS 11, TypeScript, Express, UUID |
| Frontend | Next.js 16, React 19, Axios, Tailwind (básico) |
| Infra | In-memory data, sem auth, sem DB |

## 📂 Estrutura
```
backend/src/{controllers,services,entities,helpers,mocks,modules}
frontend/{app,api,types,public}
```
Padrão por feature; serviços mantêm dados em memória.

## 🗃️ Modelo de Dados
```ts
interface User { id: string; firstName: string; lastName: string; email: string; isActive: boolean; profileId: string; }
interface Profile { id: string; name: string; }
```

## ⚙️ Como Rodar
```bash
# Backend
cd backend
npm install
npm run start:dev

# Frontend (outro terminal)
cd frontend
npm install
npm run dev
```
App: http://localhost:3000  |  API: http://localhost:3001

## 🌱 Variáveis de Ambiente
Arquivo: `frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🔌 Endpoints Principais
| Recurso | Método | Endpoint | Descrição |
|---------|--------|----------|-----------|
| Usuário | GET | /users | Listar todos |
| Usuário | GET | /users?profileId=ID | Filtrar por perfil |
| Usuário | GET | /users/:id | Buscar por ID |
| Usuário | POST | /users | Criar novo |
| Usuário | PUT | /users | Atualizar (body contém id) |
| Usuário | PUT | /users/:id/toggle-active | Alternar ativo/inativo |
| Usuário | DELETE | /users/:id | Remover |
| Perfil | GET | /profiles | Listar perfis |
| Perfil | GET | /profiles/:id | Buscar perfil |

## 💡 Diferenciais
- Arquitetura por feature (controllers / services / módulos)
- Código enxuto sem dependências desnecessárias
- BaseURL configurável via env (`NEXT_PUBLIC_API_URL`)
- Pronto para evoluir (validação, banco, Swagger)

## ⚠️ Limitações
- Sem persistência (reiniciar = reset)
- Sem autenticação / autorização
- Sem testes implementados ainda

## 🗺️ Roadmap (próximos passos)
`class-validator` • Swagger • Banco (Postgres + ORM) • Testes (unit/E2E) • Docker • Auth JWT • Logs estruturados.

## 🧪 Testar Rapidamente (cURL)
```bash
# Listar usuários
curl http://localhost:3001/users

# Criar usuário
curl -X POST http://localhost:3001/users \
	-H "Content-Type: application/json" \
	-d '{"firstName":"Ana","lastName":"Costa","email":"ana@example.com","profileId":"2"}'

# Toggle ativo
curl -X PUT http://localhost:3001/users/1/toggle-active
```

## 📜 Licença / Uso
Projeto de desafio técnico feito por Amanda Lopes. Uso livre para avaliação.

---
Feito com foco em clareza e simplicidade.

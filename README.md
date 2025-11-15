# Fullstack User Management

CRUD de usuários e perfis com **NestJS 11** (backend) + **Next.js 16 / React 19** (frontend). Dados em memória para prototipagem rápida.

## Objetivo
Demonstrar arquitetura modular simples (Controllers → Services → Dados em memória) e consumo via Axios no frontend.

## Stack Essencial
Node: 18+ (testado com 18.x e 20.x)  
Backend: NestJS, TypeScript, Express, UUID  
Frontend: Next.js, React, Axios, Tailwind  
Infra leve: Sem DB, sem auth, sem testes ainda.

## Estrutura
```
backend/src/{controllers,services,entities,helpers,mocks,modules}
frontend/{app(api pages),api,index.ts,types,index.ts}
```
Árvore completa em comentários no código.

## Modelo de Dados
```ts
interface User { id: string; firstName: string; lastName: string; email: string; isActive: boolean; profileId: string; }
interface Profile { id: string; name: string; }
```

## Como Rodar
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
Acessar: http://localhost:3000 (API em http://localhost:3001)

## Variáveis de Ambiente
`frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Endpoints Principais
Usuários: GET /users | GET /users/:id | GET /users?profileId=1 | POST /users | PUT /users | PUT /users/:id/toggle-active | DELETE /users/:id  
Perfis: GET /profiles | GET /profiles/:id

## Diferenciais
- Separação clara por feature
- Código enxuto e direto (sem libs extras)
- BaseURL configurável via env
- Pronto para evoluir (validação, persistência, Swagger)

## Limitações
- Dados somem ao reiniciar (in-memory)
- Sem autenticação / autorização
- Testes ainda não implementados

---
Projeto de desafio técnico. Versão enxuta do README.

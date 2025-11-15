# 🎯 Fullstack User Management

Uma aplicação fullstack simples para gerenciamento de usuários e perfis, desenvolvida com **NestJS** (backend) e **Next.js** (frontend), com dados mockados em memória.

## ✨ Funcionalidades Implementadas

### Backend (NestJS)
- ✅ **CRUD de Usuários**: Criar, ler, atualizar e deletar usuários
- ✅ **Buscar Usuário por ID**: Endpoint para obter um usuário específico
- ✅ **Ativar/Desativar Usuários**: Toggle de status de ativo/inativo
- ✅ **Filtrar por Perfil**: Listar usuários filtrados por perfil
- ✅ **CRUD de Perfis**: Criar, ler e listar perfis
- ✅ **API RESTful**: Endpoints com status codes apropriados
- ✅ **CORS Configurado**: Para comunicação com frontend

### Frontend (Next.js)
- ✅ **Página Home**: Dashboard com navegação
- ✅ **Listagem de Usuários**: Exibir todos os usuários com filtro por perfil
- ✅ **Criar Usuário**: Formulário para criar novos usuários
- ✅ **Editar Usuário**: Página para atualizar dados do usuário
- ✅ **Deletar Usuário**: Remover usuário com confirmação
- ✅ **Ativar/Desativar**: Botão para alternar status do usuário
- ✅ **Listagem de Perfis**: Visualizar todos os perfis disponíveis
- ✅ **Design Responsivo**: Interface moderna com CSS

## 🏗️ Estrutura do Projeto

```
fullstack-user-management/
├── backend/
│   ├── src/
│   │   ├── types/
│   │   │   └── index.ts          # Interfaces User e Profile
│   │   ├── profiles/
│   │   │   ├── profile.controller.ts
│   │   │   ├── profile.service.ts
│   │   │   └── profile.module.ts
│   │   ├── users/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.module.ts
│   │   ├── app.module.ts         # Módulo raiz
│   │   └── main.ts               # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
│
└── frontend/
    ├── app/
    │   ├── page.tsx              # Home page
    │   ├── layout.tsx            # Root layout
    │   ├── globals.css           # Estilos globais
    │   ├── profiles/
    │   │   └── page.tsx          # Lista de perfis
    │   └── users/
    │       ├── page.tsx          # Lista de usuários
    │       ├── new/
    │       │   └── page.tsx      # Criar usuário
    │       └── [id]/
    │           └── page.tsx      # Editar usuário
    ├── api/
    │   └── index.ts              # Configuração da API com axios
    ├── types/
    │   └── index.ts              # Interfaces compartilhadas
    ├── package.json
    ├── tsconfig.json
    └── next.config.js
```

## 🚀 Como Rodar a Aplicação

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### 1. Instalar Dependências

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 2. Iniciar o Backend

```bash
cd backend
npm run start:dev
```

O servidor estará disponível em `http://localhost:3001`

### 3. Iniciar o Frontend (em outro terminal)

```bash
cd frontend
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### 4. Acessar a Aplicação

Abra seu navegador e acesse: `http://localhost:3000`

## 🔌 Endpoints da API

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/users` | Listar todos os usuários |
| `GET` | `/users?profileId=1` | Filtrar usuários por perfil |
| `GET` | `/users/:id` | Buscar usuário por ID |
| `POST` | `/users` | Criar novo usuário |
| `PUT` | `/users/:id` | Atualizar usuário |
| `PUT` | `/users/:id/toggle-active` | Ativar/desativar usuário |
| `DELETE` | `/users/:id` | Deletar usuário |

### Perfis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/profiles` | Listar todos os perfis |
| `GET` | `/profiles/:id` | Buscar perfil por ID |

## 📝 Exemplos de Requisições

### Criar Usuário
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "João",
    "lastName": "Silva",
    "email": "joao@example.com",
    "profileId": "1"
  }'
```

### Listar Usuários
```bash
curl http://localhost:3001/users
```

### Atualizar Usuário
```bash
curl -X PUT http://localhost:3001/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "novo@example.com"
  }'
```

### Ativar/Desativar Usuário
```bash
curl -X PUT http://localhost:3001/users/1/toggle-active
```

## 💾 Dados Mockados

### Usuários Iniciais
1. **João Silva** (Admin)
   - Email: joao@example.com
   - Status: Ativo
   
2. **Maria Santos** (User)
   - Email: maria@example.com
   - Status: Ativo
   
3. **Pedro Oliveira** (User)
   - Email: pedro@example.com
   - Status: Inativo

### Perfis Iniciais
1. **Admin** - Perfil de administrador
2. **User** - Perfil de usuário regular
3. **Moderator** - Perfil de moderador

## 🛠️ Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js robusto
- **TypeScript** - Tipagem estática
- **Express** - Server HTTP (integrado no NestJS)

### Frontend
- **Next.js** - Framework React moderno
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Axios** - Cliente HTTP

## 📚 Decisões Técnicas

### 1. **Padrão de Módulos (Backend)**
   - Organização por feature (users, profiles)
   - Separação clara entre Controller, Service e tipos
   - Facilita manutenção e escalabilidade

### 2. **Gerenciamento de Estado (Frontend)**
   - Uso de `useState` para estado local
   - `useEffect` para efeitos colaterais
   - Mantém simplicidade sem dependências externas

### 3. **Cliente HTTP (Frontend)**
   - Axios configurado centralmente em `api/index.ts`
   - Facilita mudanças futuras de baseURL
   - Tratamento centralizado de erros

### 4. **Estilos**
   - CSS inline para simplicidade
   - Sem dependências de UI libraries
   - Facilita compreensão do código

### 5. **Dados em Memória**
   - Arrays em memória no serviço
   - Dados resetam ao reiniciar servidor
   - Perfeito para prototipagem

## 🔧 Possíveis Melhorias

### Backend
- [ ] **Validação com class-validator**: Adicionar validação de DTOs
- [ ] **Documentação Swagger**: Gerar documentação automática da API
- [ ] **Autenticação JWT**: Implementar segurança
- [ ] **Banco de Dados**: Integrar TypeORM com PostgreSQL/MongoDB
- [ ] **Logging**: Adicionar sistema de logs estruturados
- [ ] **Tests**: Implementar testes unitários e E2E
- [ ] **Paginação**: Adicionar paginação nos endpoints de listagem

### Frontend
- [ ] **Componentes Reutilizáveis**: Extrair componentes (Button, Input, Modal)
- [ ] **Gerenciamento de Estado**: Implementar Redux ou Context API
- [ ] **Testes**: Adicionar testes com Jest/React Testing Library
- [ ] **Validação de Formulário**: Usar bibliotecas como react-hook-form
- [ ] **UI Library**: Integrar Material-UI ou Chakra UI
- [ ] **Loading States**: Estados de loading mais sofisticados
- [ ] **Tratamento de Erros**: Modal de erros com retry
- [ ] **Paginação**: Implementar paginação na listagem

### Geral
- [ ] **Docker**: Containerizar aplicação
- [ ] **CI/CD**: Adicionar GitHub Actions
- [ ] **E2E Tests**: Testes com Cypress ou Playwright
- [ ] **Ambiente**: Arquivo .env para configurações

## 🚦 Status HTTP Utilizados

- **200 OK**: Requisição bem-sucedida
- **201 Created**: Recurso criado com sucesso
- **204 No Content**: Sucesso sem retorno de conteúdo (DELETE)
- **400 Bad Request**: Dados inválidos
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro no servidor

## 🧪 Como Testar

### Via Frontend
1. Acesse `http://localhost:3000`
2. Clique em "👥 Usuários"
3. Teste as funcionalidades:
   - Criar novo usuário
   - Filtrar por perfil
   - Editar usuário
   - Ativar/desativar
   - Deletar usuário

### Via API (cURL ou Postman)
```bash
# Listar usuários
curl http://localhost:3001/users | json_pp

# Filtrar por perfil
curl http://localhost:3001/users?profileId=1 | json_pp

# Criar usuário
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Ana","lastName":"Costa","email":"ana@example.com","profileId":"2"}'
```

## 📝 Notas

- Todos os dados são armazenados em memória
- Ao reiniciar o servidor, os dados são resetados
- CORS está habilitado para `http://localhost:3000`
- Sem autenticação - todos os endpoints são públicos

## 📄 Licença

Este projeto é fornecido como está para fins educacionais.

---

**Desenvolvido com ❤️ para o Desafio Técnico Fullstack**

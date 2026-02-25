# Sistema para Agendamento de Consultas (AgendaMed API)

## Descrição

AgendaMed API é uma API REST desenvolvida para gerenciar agendamentos de consultas médicas. Ela centraliza o cadastro de usuários, médicos, especialidades e o fluxo de marcação, atualização e cancelamento de consultas, com controle de permissões por perfil (admin, operador, usuário).

## Objetivo

Fornecer uma interface de backend simples e segura para aplicações cliente (web, mobile) realizarem operações relacionadas a consultas médicas, com persistência em Postgres e autenticação via JWT.

## Funcionalidades principais

- Cadastro e autenticação de usuários
- Gerenciamento de perfis de usuário (obter perfil do usuário logado)
- Cadastro e listagem de especialidades médicas
- Cadastro, listagem e gerenciamento de médicos
- Agendamento, listagem, busca (por nome e CPF), atualização e cancelamento de consultas
- Paginação padrão nas listas (10 itens por página)

## Tecnologias

- Node.js + TypeScript
- Vite (frontend relacionado; este repositório contém a API e referências ao front-end)
- Prisma ORM + PostgreSQL
- JWT para autenticação

## Instalação (local)

1. Clone o repositório e acesse a pasta do projeto:

```bash
git clone <URL_DO_REPOSITORIO>
cd agendamed_api
```

2. Instale as dependências:

```bash
npm ci
```

3. Crie um arquivo `.env` na raiz com as variáveis listadas abaixo.

4. Inicie o banco de dados (Docker Compose):

```bash
docker compose up -d
```

5. Rode as migrations do Prisma (aplica alterações no banco):

```bash
npx prisma migrate dev
```

6. Inicie a API em modo de desenvolvimento:

```bash
npm run dev
```

Observação: se for a primeira execução e houver um script de seed, execute-o após as migrations conforme sua configuração local.

## Variáveis de ambiente (Backend)

Adicione as seguintes variáveis no arquivo `.env`:

- APP_HOST
- DATABASE_URL
- NODE_ENV
- JWT_SECRET
- JWT_REFRESH_SECRET
- PORT

## Variáveis de ambiente (Front-end)

Se estiver usando o front-end separado, configure no front-end (.env) a variável:

- VITE_API_BASE_URL

## Docker (Banco de Dados)

O projeto inclui um `docker-compose.yml` para orquestrar o Postgres. Para levantar o serviço de banco localmente:

```bash
docker compose up -d
```

Para remover os containers:

```bash
docker compose down
```

## Migrations e seed

Após o banco subir, aplique as migrations:

```bash
npx prisma migrate dev
```

Se houver um script de seed (ver `prisma/seed.ts`), execute conforme sua configuração do Prisma (por exemplo `npx prisma db seed`).

## Scripts úteis

- `npm run dev` — inicia a API em modo desenvolvimento
- `npm run build` — compila o projeto (se disponível)
- `npm start` — inicia a aplicação em modo produção (se disponível)

## Documentação da API

Endpoints e especificações podem ser encontradas em `src/docs/swagger.json`.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar na aplicação
- [x] Deve ser possível se autenticar na aplicação
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível cadastrar a especialidade dos médicos
- [x] Deve ser possível cadastrar um médico
- [x] Deve ser possível cadastrar uma consulta
- [x] Deve ser possível listar todos usuários cadastrados
- [x] Deve ser possível listar as consultas
- [x] Deve ser possível listar as especialidades
- [x] Deve ser possível listar os médicos
- [x] Deve ser possível buscar consultas (por nome e cpf)
- [x] Deve ser possível atualizar os dados das consultas
- [x] Deve ser possível excluir/cancelar uma consulta

## RNs (Regras de negócio)

- [x] Usuário não pode se cadastrar com email duplicado
- [x] Somente usuário operador pode cadastrar consultas, especialidades e médicos
- [x] Somente usuário operador pode desabilitar/cancelar consultas
- [x] Somente usuários admin podem cadastrar operadores e admins.

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário dever estar criptografada
- [x] As senha devem conter mais de 6 digitos e devem possuir letras, numeros e caracteres especiais
- [x] Utilizar JWT como forma de autenticação
- [x] Os Dados devem ser persistidos em banco Postgres
- [x] Todas as listas de dados precisam estar paginadas com 10 itens por página

## Contato

Para dúvidas ou contribuições abra uma issue ou PR no repositório.


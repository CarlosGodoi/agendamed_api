# Sistema para agendamentos de consultas

## Descrição da API

Esta API foi desenvolvida para gerenciar agendamentos de consultas médicas. O objetivo principal é facilitar o processo de agendamento, permitindo que usuários se cadastrem, autentiquem e realizem agendamentos de forma eficiente. A API oferece funcionalidades para gerenciar médicos, especialidades e consultas, garantindo uma experiência fluida para os usuários.

## Funcionalidades

- Cadastro de usuários
- Autenticação de usuários
- Gerenciamento de perfis de usuários
- Cadastro e gerenciamento de especialidades médicas
- Cadastro e gerenciamento de médicos
- Agendamento e gerenciamento de consultas
- Listagem de usuários, consultas e especialidades
- Busca de consultas por nome e CPF
- Atualização e cancelamento de consultas

## Instalação e Uso

Para instalar e utilizar a API, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd agendamed_api
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados no arquivo `.env`.
4. Execute as migrações:
   ```bash
   npx prisma migrate dev
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```

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
- [x] Os Dados devem ser persistidos em banco postgres
- [x] Todas as listas de dados precisam estar paginadas com 10 itens por página

# Sistema para agendamentos de consultas

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar na aplicação
- [x] Deve ser possível se autenticar na aplicação
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível cadastrar a especialidade dos médicos
- [x] Deve ser possível cadastrar um médico
- [] Deve ser possível cadastrar uma consulta
- [x] Deve ser possível listar todos usuários cadastrados
- [] Deve ser possível listar as consultas
- [x] Deve ser possível listar as especialidades
- [] Deve ser possível listar os médicos
- [] Deve ser possível buscar consultas (por nome e cpf)
- [] Deve ser possível atualizar os dados das consultas
- [] Deve ser possível excluir/cancelar uma consulta

## RNs (Regras de negócio)

- [x] Usuário não pode se cadastrar com email duplicado
- [] Somente usuário operador pode cadastrar consultas, especialidades e médicos
- [] Somente usuário operador pode desabilitar/cancelar consultas
- [] Somente usuários admin podem cadastrar operadores e admins.

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário dever estar criptografada
- [x] As senha devem conter mais de 6 digitos e devem possuir letras, numeros e caracteres especiais
- [x] Utilizar JWT como forma de autenticação
- [x] Os Dados devem ser persistidos em banco postgres
- [] Todas as listas de dados precisam estar paginadas com 10 itens por página

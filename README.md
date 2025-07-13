# Sobre o Projeto

Este projeto tem como objetivo desenvolver uma aplicação web utilizando TypeScript com foco nos conceitos de autenticação de usuários,
manutenção de senhas, operações CRUD (Create, Read, Update, Delete) e conectividade com banco de dados
PostgreSQL.

## Tecnologias Utilizadas

- **Node.js**: Um ambiente de execução JavaScript que permite executar código JavaScript no servidor.
- **Express**: Um framework para Node.js que facilita a criação de aplicações web e APIs.
- **Prisma**: Um ORM (Object-Relational Mapping) que simplifica a interação com o banco de dados.
- **PostgreSQL**: Um sistema de gerenciamento de banco de dados relacional que armazena os dados da aplicação.


## Como Rodar o Projeto

### Pré-requisitos

Antes de rodar o projeto, você precisa ter os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [PostgreSQL](https://www.postgresql.org/download/) (versão 12 ou superior)
- [npm](https://www.npmjs.com/get-npm) (geralmente vem com o Node.js)

### Passos para Rodar o Projeto

1. **Clone o Repositório**:
   git clone https://github.com/WallaceMarinho/CRUD-Users-Typescript.git
   
   cd backend-projeto


2.  **Instale as dependências**:
   npm install

3.  **Configure o Banco de Dados**:
Instale o PostgreSQL em seu site oficial, crie um banco de dados dentro do cliente Postgre ou em terminal conforme o arquivo schema.prisma e atualize a variável DATABASE_URL no arquivo .env com as credenciais do seu banco de dados.

4.  **Execute as Migrações do Prisma**:
npx prisma migrate dev --name init

5. **Inicie o Servidor**:
npm run dev

6. **Configurando o Frontend**:
entre no front com cd ../frontend no terminal e baixe as dependências com npm install

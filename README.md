# Projeto de Gerenciamento de Produtos

Este repositório contém um projeto desenvolvido em NestJS para gerenciamento de produtos, utilizando MongoDB como banco de dados. O projeto inclui funcionalidades básicas de CRUD para produtos, autenticação de usuários e autorização baseada em tokens JWT.

## Requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- Node.js (versão LTS)
- npm (gerenciador de pacotes do Node.js)
- MongoDB (local ou remoto)

## Instalação

1. **Clone o repositório**

  ```bash
  git clone https://github.com/seu-usuario/nome-do-repositorio.git
  ```
2. **Instale as dependências**   

  ```bash
  npm install
  ```
4. **Docker Compose**
  ```wsl
  docker-compose up
  ```
5. **Configuração do Banco de Dados**

  - Certifique-se de ter o MongoDB instalado e em execução na sua máquina.
  - O projeto está configurado para conectar ao MongoDB através da URL padrão mongodb://localhost:27017.

6. **Configuração das Variáveis de Ambiente**

  - Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente conforme necessário, 
    especialmente se estiver usando configurações específicas para o MongoDB, JWT, ou outras.

7. **Executar o Projeto**

  ```bash
  npm run start:dev

8. **Executar Testes**
  ```bash
  npm test

## Exemplos de Requisições
  - A seguir estão alguns exemplos de requisições que podem ser feitas ao servidor NestJS para gerenciamento de produtos:

1. **Autenticação de Usuário**

  - Endpoint: /sessions
  - Método: POST
  - Descrição: Autentica um usuário e retorna um token JWT válido.
  - Corpo da Requisição: 
  ```json
    {
      "email": "usuario@example.com",
      "password": "senha123"
    }
  ```
  - Exemplo de Resposta: 
  ```json
    {
      "accessToken": "seu-token-jwt"
    }
  ```
2. **Criação de Produto**

  - Endpoint: /products
  - Método: POST
  - Exemplo de Requisição:
  ```json
    {
      "nome": "Novo Produto",
      "descricao": "Um novo produto",
      "preco": "120",
      "categoria": "novo",
      "estoque": "100"
    }
  ```
  - Exemplo de Resposta:
  ```json
    {
      "name": "Novo Produto",
      "description": "Um novo produto",
      "price": 120,
      "category": "novo",
      "stock": 100,
      "_id": "id do produto",
      "createdAt": "Data de criação",
      "updatedAt": "Data de atualização",
      "__v": controle de versão
  }
  ```

3. **Listar todos os Produtos**

  - Endpoint: /products
  - Método: GET
  - Exemplo de Resposta:
  ```json
  [
    {
      "_id": "60c9b85e81b87f0039cbee7a",
      "nome": "Produto 1",
      "categoria": "Categoria 1",
      "preco": 100,
      "estoque": 10
    },
    {
      "_id": "60c9b85e81b87f0039cbee7b",
      "nome": "Produto 2",
      "categoria": "Categoria 2",
      "preco": 150,
      "estoque": 15
    }
  ]
  ```

4. **Buscar Produtos pelo ID**
  - Endpoint: /products/:id
  - Método: GET
  - Descrição: Busca produto pelo ID.
  - Exemplo de Resposta:
  ```json
    {
      "_id": "60c9b85e81b87f0039cbee7a",
      "nome": "Produto 1",
      "categoria": "Categoria 1",
      "preco": 100,
      "estoque": 10
    }
  ```

5. **Atualizar Produto**

  - Endpoint: /products/:id
  - Método: PUT
  - Exemplo de Requisição:
  ```json
    {
      "_id": "60c9b85e81b87f0039cbee7a",
      "nome": "Produto 2",
      "categoria": "Categoria 2",
      "preco": "500",
      "estoque": "10"
    }
  ```
  - Exemplo de Resposta:
  ```json
    {
      "_id": "60c9b85e81b87f0039cbee7a",
      "nome": "Produto 2",
      "categoria": "Categoria 2",
      "preco": "500",
      "estoque": "10",
      "createdAt": "Data de criação",
      "updatedAt": "Data de atualização",
      "__v": controle de versão
    }
  ```
6. **Deletar Produto**

  - Endpoint: /products/:id
  - Método: DELETE
  - Exemplo de Resposta:
  ```json
    {
     "message": "Produto deletado com sucesso"
    }
  ```

# Contribuindo
  - Contribuições são bem-vindas! Sinta-se à vontade para enviar pull
    requests e reportar issues se encontrar problemas ou melhorias.

# Licença
  - Este projeto está licenciado sob a MIT License.
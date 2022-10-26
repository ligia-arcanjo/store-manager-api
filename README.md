# Store Manager

## Sumário

- [Store Manager](#store-manager)
  - [Sumário](#sumário)
  - [Sobre este projeto](#sobre-este-projeto)
    - [O que foi desenvolvido](#o-que-foi-desenvolvido)
    - [Tecnologias utilizadas](#tecnologias-utilizadas)
  - [Execução da aplicação](#execução-da-aplicação)
    - [Variáveis de ambiente](#variáveis-de-ambiente)
    - [Rodando no Docker](#rodando-no-docker)
    - [Rodando localmente](#rodando-localmente)
      - [Criando banco de dados localmente](#criando-banco-de-dados-localmente)
    - [Instalação das dependências e execução](#instalação-das-dependências-e-execução)
  - [Testes](#testes)
  - [Autoria](#autoria)

## Sobre este projeto

### O que foi desenvolvido

Neste projeto foi desenvolvida uma API RESTful utilizando a arquitetura MSC (model-service-controller). A API construída é um sistema de gerenciamento de vendas, na qual é possível criar, visualizar, deletar e atualizar produtos e vendas.

### Tecnologias utilizadas

- Node.js
- Express
- MySQL
- mysql2
- dotenv
- nodemon
- ESlint

## Execução da aplicação

### Variáveis de ambiente
Para realizar a conexão com o banco de dados, renomeie o arquivo que está na raiz do projeto `.env.example` para `.env` com as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `seu-usuario-aqui` e a senha `sua-senha-aqui` seu arquivo ficará desta forma:

  ```
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_USER=seu-usuario-aqui
  MYSQL_PASSWORD=sua-senha-aqui
  MYSQL_DATABASE=StoreManager
  PORT=3001
  ```

A variável `PORT` do arquivo .env deve ser utilizada para a conexão com o servidor;
A variável `MYSQL_PORT` deve ser utilizada para conexão com o banco de dados;

### Rodando no Docker

⚠ Lembre-se de parar o mysql se estiver usando localmente na porta padrão (3306), ou adapte, caso queria fazer uso da aplicação em containers.

1) Rode os serviços node e db com o comando:

    ```
    docker-compose up -d
    ```

    Esses serviços irão inicializar um container chamado store_manager e outro chamado store_manager_db.

2) Use o comando:

    ```
    docker exec -it store_manager bash.
    ```

    Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
    Instale as dependências com `npm install`.

⚠ Atenção ⚠ Caso opte por utilizar o Docker, todos os comandos disponíveis no `package.json` (`npm start`, `npm test`, etc) devem ser executados dentro do container, ou seja, no terminal que aparece após a execução do comando docker exec citado acima.

### Rodando localmente

#### Criando banco de dados localmente

Para utilizar o banco de dados criado e utilizar a API, importe localmente o conteúdo do arquivo `StoreManager.sql`, que está na raiz do projeto.

### Instalação das dependências e execução

1) Para rodar a aplicação localmente, faça o clone do repositório e entre na pasta:

    ```
    git clone https://github.com/ligia-arcanjo/store-manager-api.git
    cd store-manager-api
    ```

2) Executando o servidor:

    Instale as dependências:
    ```
    npm install
    ```

    Execute o servidor:
    ```
    npm start
    ```

## Testes

Os testes foram desenvolvidos utilizando Chai, Mocha e Sinon. E estão escritos dentro da pasta `/test/unit`.

Atraves do comando abaixo é possível rodar os testes e a cobertura de testes do projeto:

```
npm test
```

## Autoria

Ligia Arcanjo Gonçalves

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ligiaarcanjo/)

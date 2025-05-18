# ⚙️ Backend E-commerce com Node.js e Express

## Visão Geral

Este repositório contém o backend da aplicação de e-commerce, construído com Node.js e o framework Express. Ele fornece uma API robusta para gerenciar produtos, autenticar usuários (incluindo administradores) e suportar as funcionalidades do painel administrativo. Os dados são persistidos em arquivos JSON para fins de demonstração.

## Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript server-side.
* **Express:** Framework web minimalista e flexível para Node.js, utilizado para construir a API.
* **bcrypt:** Biblioteca para realizar o hash de senhas de forma segura.
* **jsonwebtoken (JWT):** Utilizado para gerar e verificar tokens de autenticação.
* **multer:** Middleware Node.js para lidar com o upload de arquivos (imagens de produtos).
* **cors:** Middleware para habilitar o Cross-Origin Resource Sharing.
* **dotenv:** Utilizado para carregar variáveis de ambiente a partir de um arquivo `.env`.
* **fs (File System Module):** Módulo nativo do Node.js para operações de leitura e escrita de arquivos.
* **path:** Módulo nativo do Node.js para manipulação de caminhos de arquivos.
* **express-rate-limit:** Middleware para limitar a frequência de requisições para proteger contra ataques de força bruta e DDoS.

## Estrutura do Projeto
.
├── data/
│   ├── admins.json       # Dados dos usuários administradores
│   └── produtos.json     # Dados dos produtos do e-commerce
│   └── usuarios.json     # Dados dos usuários comuns
├── middlewares/
│   ├── auth.middleware.js # Middleware para autenticação JWT
│   └── upload.middleware.js # Middleware para lidar com uploads de arquivos (Multer)
├── models/
│   ├── products.model.js # Lógica para acessar e manipular dados de produtos
│   └── users.model.js    # Lógica para acessar e manipular dados de usuários
├── routes/
│   ├── admin.routes.js   # Rotas para funcionalidades administrativas
│   └── auth.routes.js    # Rotas para autenticação (login)
├── services/
│   ├── admin.service.js  # Lógica de negócios para funcionalidades administrativas
│   └── auth.service.js   # Lógica de negócios para autenticação
├── .env                  # Arquivo de variáveis de ambiente
├── .gitignore            # Especifica arquivos ignorados pelo Git
├── index.js              # Ponto de entrada da aplicação backend
├── package-lock.json     # Detalhes das dependências instaladas (npm)
└── package.json          # Informações do projeto e dependências

## Endpoints da API

### Rotas de Autenticação (`/auth`)

* `POST /login`: Autentica um usuário (comum ou administrador) e retorna um token JWT em caso de sucesso. Espera `username` e `password` no corpo da requisição.

### Rotas Administrativas (`/admin`) - Protegidas por JWT

* `GET /produtos`: Retorna uma lista de todos os produtos.
* `GET /produtos/:id`: Retorna os detalhes de um produto específico pelo ID.
* `GET /produtos/search?name=`: Busca produtos pelo nome (título).
* `POST /produtos`: Adiciona um novo produto. Espera `title`, `price`, `stock` no corpo e opcionalmente um arquivo de imagem (`thumbnail`) via `multipart/form-data`.
* `PUT /produtos/:id`: Atualiza os dados de um produto existente. Espera `title`, `price`, `stock` no corpo e opcionalmente um novo arquivo de imagem (`thumbnail`) via `multipart/form-data`.
* `DELETE /produtos/:id`: Exclui um produto pelo ID.
* `PATCH /produtos/:id/estoque`: Atualiza o estoque de um produto específico. Espera `stock` no corpo da requisição.
* `DELETE /arquivos/:nome`: Deleta um arquivo JSON específico (funcionalidade de demonstração).

## Como Rodar o Backend

1.  **Clone o repositório do backend:**
    ```bash
    git clone [https://github.com/Carlos-Roberto-da-Silva-Filho/bacck_end_express.git](https://github.com/Carlos-Roberto-da-Silva-Filho/bacck_end_express.git)
    cd bacck_end_express
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Configure as variáveis de ambiente:**
    * Crie um arquivo `.env` na raiz do projeto (se ainda não existir).
    * Adicione a chave secreta para JWT e a porta do servidor:
      ```
      JWT_SECRET=sua_chave_secreta_aqui
      PORT=3000
      ```
4.  **Inicie o servidor backend:**
    ```bash
    npm start
    # ou
    node index.js
    ```
    O backend estará rodando na porta especificada no arquivo `.env` (padrão: `http://localhost:3000`).

## Observações

* Este backend utiliza arquivos JSON (`data/produtos.json`, `data/usuarios.json`, `data/admins.json`) para persistir os dados. Em um ambiente de produção, um banco de dados real seria recomendado.
* A autenticação de administradores é separada da autenticação de usuários comuns, com seus dados armazenados em arquivos distintos (`admins.json` e `usuarios.json`).
* As rotas administrativas são protegidas pelo middleware `auth.middleware.js`, que verifica a validade do token JWT enviado no header `Authorization` (Bearer token).
* O middleware `upload.middleware.js` (configurado com `multer`) é utilizado para lidar com o upload de imagens ao criar ou editar produtos. As imagens são armazenadas na pasta `public/img`.
* O tratamento de erros é básico e pode ser aprimorado com middlewares de erro mais robustos.
* A limitação de taxa de requisições (`express-rate-limit`) é aplicada para proteger as rotas contra uso excessivo.

## Autor

Carlos Roberto da Silva Filho

Sinta-se à vontade para contribuir com este projeto\!
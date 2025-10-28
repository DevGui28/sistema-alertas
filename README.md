# Sistema de Alertas de Emergência

Um sistema de alertas de emergência para intranet, permitindo que um administrador envie notificações em tempo real para clientes conectados.

## Tecnologias Utilizadas

- **Backend:** Node.js, Express, WebSocket (ws)
- **Frontend/Cliente:** Electron, HTML5
- **Desenvolvimento:** Nodemon
- **Build:** Electron Builder

## Estrutura dos Arquivos

```
sistema-alertas
├── public/
│   ├── admin.html      # Painel do administrador para enviar alertas
│   └── client.html     # Tela que o cliente vê e onde recebe os alertas
├── .gitignore          # Arquivos e pastas ignorados pelo Git
├── main.js             # Ponto de entrada principal do Electron (processo principal)
├── package.json        # Metadados do projeto e dependências
├── preload.js          # Script de pré-carregamento do Electron
├── README.md           # Este arquivo
├── server.js           # Servidor backend (Express + WebSocket)
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado

## Instalação

1. Clone o repositório (ou baixe os arquivos).
2. Navegue até o diretório do projeto.
3. Instale as dependências com o comando:
   ```bash
   npm install
   ```

## Como Executar

Este projeto consiste em duas partes que precisam ser executadas: o **servidor** e o **cliente**.

1.  **Iniciar o Servidor:**
    O servidor é responsável por gerenciar os clientes e distribuir os alertas. Para iniciá-lo, execute:
    ```bash
    npm start
    ```
    *Para desenvolvimento, você pode usar `npm run dev` para que o servidor reinicie automaticamente após alterações no código.*

2.  **Iniciar o Cliente (Aplicação Desktop):**
    O cliente é a aplicação Electron que os usuários finais verão. Para abri-la, execute o seguinte comando em um **novo terminal**:
    ```bash
    npm run start:client
    ```

## Scripts Disponíveis

- `npm start`: Inicia o servidor de produção.
- `npm run dev`: Inicia o servidor em modo de desenvolvimento com Nodemon.
- `npm run start:client`: Inicia a aplicação desktop do cliente Electron.
- `npm run dist`: Cria um pacote de distribuição/instalador da aplicação.

## Desenvolvimento (Setup do Projeto)

Caso precise configurar o ambiente do zero, estes são os comandos para instalar as dependências de desenvolvimento e para gerar o build do aplicativo.

**Instalando dependências de desenvolvimento:**
```bash
npm install --save-dev electron
npm install --save-dev electron-builder
```

**Gerando o instalador:**
```bash
npm run dist
```
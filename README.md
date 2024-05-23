# To-Do List Application

Esta é uma aplicação de To-Do List criada com React, Vite, e Tailwind CSS. A aplicação permite adicionar, editar, mover, e remover tarefas entre diferentes estados: "To Do", "In Progress", e "Completed". O aplicativo também suporta tema claro/escuro.

## Funcionalidades

- Adicionar novas tarefas
- Editar tarefas existentes
- Mover tarefas entre "To Do", "In Progress", e "Completed"
- Remover tarefas
- Alternar entre tema claro e escuro
- Validação para impedir que tarefas vazias sejam salvas
- Notificações visuais para feedback ao adicionar ou mover tarefas

## Pré-requisitos

- Node.js (versão 12 ou superior)
- npm ou yarn

## Como Executar a Aplicação

### 1. Clonar o Repositório

```sh
git clone hhttps://github.com/O-Farias/ToDo-List
cd ToDo-List
```

### 2. Instalar Dependências

Utilizando npm:

```sh
npm install
```

Utilizando yarn:

```sh
yarn install
```

### 3. Executar o Servidor de Desenvolvimento

Utilizando npm:

```sh
npm install
```

Utilizando yarn:

```sh
yarn install
```

### 4. Executar o Servidor de Desenvolvimento

Abra seu navegador e acesse http://localhost:3000.

## Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Cria a aplicação para produção.
- `serve`: Serve a aplicação em modo de produção.

## Componentes

### `TodoForm.jsx`

Componente para adicionar novas tarefas.

### `TodoItem.jsx`

Componente para exibir e editar uma tarefa individual.

### `TodoList.jsx`

Componente para listar todas as tarefas.

### `App.jsx`

Componente principal da aplicação que gerencia o estado e o layout das colunas de tarefas.

## Personalização

### Tema Claro/Escuro

Você pode alternar entre o tema claro e escuro clicando no ícone de sol/lua no canto superior direito da aplicação.

### Ícones de Confirmação

Ícones de confirmação aparecem temporariamente ao adicionar ou mover tarefas para fornecer feedback visual ao usuário.

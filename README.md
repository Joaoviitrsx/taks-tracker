# Task Tracker CLI

Uma interface de linha de comando (CLI) simples, desenvolvida em Node.js, para gerenciar tarefas localmente usando um arquivo JSON.

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior.
- Não é necessário instalar bibliotecas externas.

## Como executar

Execute os comandos no terminal, dentro da pasta do projeto.

### Criar uma nova tarefa

```bash
node index.js add "Comprar mantimentos"
```

### Listar tarefas

```bash
# Listar todas as tarefas
node index.js list

# Filtrar por status
node index.js list todo
node index.js list in-progress
node index.js list done
```

### Marcar uma tarefa como concluída

```bash
node index.js markDone 1
```

### Marcar uma tarefa como em andamento

```bash
node index.js markInProgress 1
```

### Atualizar a descrição de uma tarefa

```bash
node index.js update 1 "Estudar Node.js"
```

### Excluir uma tarefa

```bash
node index.js delete 1
```

## Armazenamento

As tarefas são armazenadas localmente no arquivo `tasks.json`, gerenciado pelo módulo nativo `fs` do Node.js.

O arquivo de dados é criado ou atualizado conforme as tarefas são manipuladas. Ele está incluído no `.gitignore` para evitar o envio de dados locais ao GitHub.

## Tecnologias utilizadas

- JavaScript
- Node.js
- Sistema de arquivos nativo (`fs`)
- JSON
- Git e GitHub

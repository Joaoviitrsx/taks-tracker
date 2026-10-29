const { addTask, loadTasks, saveTasks } = require('./storage');
const [command, ...args] = process.argv.slice(2);

if (!command) {
  console.error('Uso: node index.js <comando> [argumentos]');
  process.exit(1);
}

const commands = {

  add: (args) => {
    const description = args.join(' ');
    if (!description) {
      console.error('Descrição da tarefa não fornecida.');
      process.exit(1);
    }

    const tasks = loadTasks();
    const now = new Date();

    const task = {
      id: tasks.length + 1,
      description: description,
      status: 'todo',
      createdAt: now,
      updatedAt: now
    };

    addTask(task);
    console.log(`Tarefa adicionada: (ID:${task.id})`);
  },
  list: (args) => {
    const tasks = loadTasks();
    const status = args[0];
    const filteredTasks = status ? tasks.filter(task => task.status === status) : tasks;

    if (filteredTasks.length === 0) {
      console.log('Nenhuma tarefa encontrada.');
      return;
    }
    for (const task of filteredTasks) {
      console.log(`ID: ${task.id}, Descrição: ${task.description}, Status: ${task.status}, Criada em: ${task.createdAt}, Atualizada em: ${task.updatedAt}`);
    }
  },
  markDone: (args) => {
    const taskId = parseInt(args[0]);
    if (isNaN(taskId)) {
      console.error('ID da tarefa inválido.');
      process.exit(1);
    }
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      console.error(`Tarefa com ID ${taskId} não encontrada.`);
      process.exit(1);
    }
    task.status = 'done';
    task.updatedAt = new Date();
    // Assuming there's a function to save tasks, e.g., saveTasks(tasks)
    saveTasks(tasks);
    console.log(`Tarefa (ID:${task.id}) marcada como concluída.`);
},

  markInProgress: (args) => {
    const taskId = parseInt(args[0]); 
    if (isNaN(taskId)) {
      console.error('ID da tarefa inválido.');
      process.exit(1);
    }
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      console.error(`Tarefa com ID ${taskId} não encontrada.`);
      process.exit(1);
    }
    task.status = 'in-progress';
    task.updatedAt = new Date();
    saveTasks(tasks);
    console.log(`Tarefa (ID:${task.id}) marcada como em andamento.`);
  },

  update: (args) => {
    const taskId = parseInt(args[0]);
    const newDescription = args.slice(1).join(' ');
    if (isNaN(taskId) || !newDescription) {
      console.error('ID da tarefa inválido ou descrição não fornecida.');
      process.exit(1);
    }
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      console.error(`Tarefa com ID ${taskId} não encontrada.`);
      process.exit(1);
    }
    task.description = newDescription;
    task.updatedAt = new Date();
    saveTasks(tasks);
    console.log(`Tarefa (ID:${task.id}) atualizada.`);
  },

  delete: (args) => {
    const taskId = parseInt(args[0]);
    if (isNaN(taskId)) {
      console.error('ID da tarefa inválido.');
      process.exit(1);
    }
    let tasks = loadTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      console.error(`Tarefa com ID ${taskId} não encontrada.`);
      process.exit(1);
    }
    tasks.splice(taskIndex, 1);
    saveTasks(tasks);
    console.log(`Tarefa (ID:${taskId}) excluída.`);
  }
};

if (!commands[command]) {
  console.error(`Comando desconhecido: ${command}`);
  process.exit(1);
}

commands[command](args);


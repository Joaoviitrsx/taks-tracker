const fs = require('fs');
const FILE = 'tasks.json'; 

function loadTasks(){
    if(!fs.existsSync(FILE)) {
        return [];
    }

    try {
        const data = fs.readFileSync(FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler o arquivo de tarefas:', error);
        return [];
    }
}

function saveTasks(tasks) {
    tasks = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(FILE, tasks, 'utf8');
}

function addTask(task) {
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
}

module.exports = {
    loadTasks,
    saveTasks,
    addTask
};


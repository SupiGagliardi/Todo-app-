
const todoList = (function() {

    let todos = [

    ];

    class todoTask {

        constructor(task, date, info, priority) {
            this.task = task;
            this.date = date;
            this.info = info;
            this.priority = priority;
        };

        addTask (task, date, info, priority) {

            const newTask = new todoTask(task, date, info, priority);
            todos.push(newTask);
        };
    };

    return {todos};

})();



console.log('hi')












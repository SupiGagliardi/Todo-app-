
const todoList = (function () {

    let projects = [
        [],
    ];

    let currentProject = 0;

    function createProject() {
        projects.push([])
    };

    class CreateTodo {
        constructor(title, description, dueDate) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = false;
            this.completed = false;
        };
    };

    function addTodo(title, description, dueDate) {
        const newTodo = new CreateTodo(title, description, dueDate);
        projects[currentProject].push(newTodo);
    };

    function deleteTodo(index) {
        if (projects[currentProject].length === 0) {
            return
        } else {
            projects[currentProject].splice(index, 1);
        }
    };

    function changePriority(index) {
        projects[currentProject][index].priority = true;
    };

    function completeTodo(index) {
        projects[currentProject][index].completed = true;
    }


    addTodo('asd', 'asd', 2020);
    addTodo('asdd', 'asdd', 2021);
    deleteTodo(3);
    changePriority(1);
    completeTodo(1);
    createProject();
    createProject();


    console.log(projects);

})();




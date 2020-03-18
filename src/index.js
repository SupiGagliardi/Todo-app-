
import { setDate } from './dates';
import { isBefore, parseISO, endOfDay, startOfDay, isAfter } from 'date-fns'
import { domMenu, checkboxStyle, hideBackground, showBackground, addTaskDOM, renderTasks, addProjectDOM, renderProjects } from './dom';

const todoList = (function () {


    domMenu();
    hideBackground();
    showBackground();
    addTaskDOM();


    let projects = [
        { name: 'Inbox', tasks: [] },
    ];

    let currentProject = 0;

    function createProject(name) {
        projects.push(
            {
                name: name,
                tasks: []
            }
        )
    };

    function render() {

        const taskList = document.querySelector('.task-list');

        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
        };
        
        projects[currentProject].tasks.forEach((task, index) => {

            renderTasks(task.task, task.dueDate, index)
        })

        checkboxStyle();

    }

    class CreateTask {
        constructor(task, dueDate, originalDate) {
            this.task = task;
            this.dueDate = dueDate;
            this.originalDate = originalDate;
        };
    };

    function addTask(arr) {

        if (arr === undefined) return

        const newTask = new CreateTask(arr[0], arr[1], arr[2]);
        projects[currentProject].tasks.push(newTask);
    };

    function completeTask(index) {

        projects[currentProject].tasks.splice(index, 1)

    }


    const addTaskBtn = document.querySelector('#addTask-btn')

    addTaskBtn.addEventListener('click', () => {

        const taskList = document.querySelector('.task-list');

        addTask(addTaskDOM());

        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
        };

        projects[currentProject].tasks.sort((a, b) => {

            if (isBefore(parseISO(a.originalDate), parseISO(b.originalDate))) {
                return -1
            } else {
                return 1
            }
        })
        render();
    })

    const taskList = document.querySelector('.task-list')


    taskList.addEventListener('click', e => {


        if (e.target.className.includes('checkmark')) {

            const index = e.target.id

            const task = document.querySelector(`.n${index}`)

            task.classList.toggle('hide-task')

            setTimeout(() => {
                completeTask(index)

                while (taskList.firstChild) {
                    taskList.removeChild(taskList.firstChild)
                };

                render()
            }, 400)
        }
    })

    const addProjectBtn = document.querySelector('#add-project-btn')


    addProjectBtn.addEventListener('click', () => {

        const input = document.querySelector('#project-input')

        if (input.validity.valid) {
            createProject(addProjectDOM())
            renderProjects(projects)
        } else {
            return
        }
    });

    renderProjects(projects);





    const projectList = document.querySelector('#projects-ul')


    projectList.addEventListener('click', e => {

        const projectTitle = document.querySelector('.project-title')

        if (e.target.className.includes('project')) {

            const projectLi = document.querySelectorAll('.project')

            projectLi.forEach((project) => {
                project.classList.remove('word-highlight')
            });


            const project = e.target
            projectTitle.textContent = project.textContent

            projectLi[project.id].classList.add('word-highlight')
            currentProject = project.id
            render()
        }
    })




})();




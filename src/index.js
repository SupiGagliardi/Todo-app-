
import { setDate } from './dates';
import { isBefore, parseISO, endOfDay, startOfDay, isAfter } from 'date-fns'
import { domMenu, checkboxStyle, hideBackground, showBackground, addTaskDOM, renderTasks, addProjectDOM, renderProjects } from './dom';
import { projectStorage } from './localStorage'

const todoList = (function () {


    domMenu();
    hideBackground();
    showBackground();
    addTaskDOM();

    let projects;

    let currentProject;


    function loadStorage () {

        let projectStorage = JSON.parse(localStorage.getItem('Projects storage'))
        let currentProjectStorage = localStorage.getItem('Current project')
    
        if (projectStorage === null) {

            console.log('es null')

            projects = [
                { name: 'Inbox', tasks: [] },
            ]

            currentProject = 0;

            renderProjects(projects, '.project', currentProject)
            render()
        } else {
            projects = projectStorage;
            currentProject = currentProjectStorage;

            console.log(`No es null, projects: ${projects} y current es ${currentProject}`)


            renderProjects(projects, '.project', currentProject)
            render()

        };
    };

    loadStorage()

    function createProject(name) {
        projects.push(
            {
                name: name,
                tasks: []
            }
        )
    };

    function deleteProject(index) {
        projects.splice(index, 1)
        currentProject = index - 1
    }

    function render() {

        const projectTitle = document.querySelector('.project-title')

        projectTitle.textContent = projects[currentProject].name;

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
        projectStorage(projects, currentProject);
    })

    const taskList = document.querySelector('.task-list')


    taskList.addEventListener('click', e => {


        if (e.target.className.includes('checkmark')) {

            const index = e.target.id

            const task = document.querySelector(`.n${index}`)

            task.classList.toggle('hide-task')

            setTimeout(() => {
                completeTask(index)
                projectStorage(projects, currentProject);

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
            renderProjects(projects, '.project', currentProject)
            projectStorage(projects, currentProject);

            projects.forEach((project, index) => {

                if (projects.length === (index + 1)) {

                    const projectTitle = document.querySelector('.project-title')
                    projectTitle.textContent = project.name
                    currentProject = index
                    render()
                    renderProjects(projects, '.project', currentProject)
                    projectStorage(projects, currentProject);

                }
            })
        } else {
            return
        }
    });

    renderProjects(projects, '.project', currentProject)


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
            projectStorage(projects, currentProject);
        }
    })


    const deleteProjectBtn = document.querySelector('.delete-project')

    deleteProjectBtn.addEventListener('click', () => {

        if (currentProject == 0) {
            return
        } else {
            deleteProject(currentProject);
            renderProjects(projects, '.project', currentProject)
            projectStorage(projects, currentProject);
    
            const projectTitle = document.querySelector('.project-title')
            projectTitle.textContent = projects[currentProject].name
    
            render()
        }
    })



})();




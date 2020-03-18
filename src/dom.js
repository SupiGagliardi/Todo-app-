import { setDate } from './dates';
export { domMenu, checkboxStyle, hideBackground, showBackground, addTaskDOM, renderTasks, addProjectDOM, renderProjects, projectDisplays };



function domMenu() {

    const menu = document.querySelector('.ham-menu');
    const main = document.querySelector('main')
    const projectList = document.querySelector('#projects-ul')



    function openMenu() {
        document.querySelector('nav').style.cssText = 'width: 11rem;';
        document.querySelector('.project-section').style.cssText = 'visibility: visible'
        document.querySelector('.delete-project').style.cssText = 'visibility: visible'
        document.querySelector('.invisible-div').classList.add('dark-veil')
    }

    function closeMenu() {
        document.querySelector('nav').style.cssText = 'width: 0';
        document.querySelector('.project-section').style.cssText = 'visibility: hidden'
        document.querySelector('.delete-project').style.cssText = 'visibility: hidden'
        document.querySelector('.invisible-div').classList.remove('dark-veil')
    }

    menu.addEventListener('click', () => {
        openMenu();
    })

    main.addEventListener('click', () => {
        closeMenu();
    })

    projectList.addEventListener('click', e => {

        if (e.target.className.includes('project')) {

            closeMenu()
        }
    })
}


function checkboxStyle() {

    const checkboxes = document.querySelectorAll('input[type=checkbox]');

    checkboxes.forEach((cb, index) => {

        cb.addEventListener('click', () => {

            const label = document.querySelector(`.label${index}`);
            const strike = document.querySelector(`.strike${index}`);

            if (!cb.checked) {
                label.style.cssText = 'background-color: rgb(206, 206, 206)'
                strike.style.cssText = 'text-decoration: none'
            } else {
                label.style.cssText = 'background-color: #FF4141'
                strike.style.cssText = 'text-decoration: line-through'
            };
        });
    });
};



function hideBackground() {

    const newTaskBtn = document.querySelector('#new-task');

    newTaskBtn.addEventListener('click', () => {

        document.querySelector('.background-image').style.cssText = 'display: none'
        document.querySelector('.new-task').style.cssText = 'display: none'
        document.querySelector('.add-task').style.cssText = 'display: block'
        document.querySelector('main').style.cssText = 'justify-content: initial'
        document.querySelector('.task-list').style.cssText = 'display: flex'

    })
}

function showBackground() {

    const cancelTaskBtn = document.querySelector('#cancel-task');

    cancelTaskBtn.addEventListener('click', () => {

        document.querySelector('.background-image').style.cssText = 'display: initial'
        document.querySelector('.new-task').style.cssText = 'display: initial'
        document.querySelector('.add-task').style.cssText = 'display: none'
        document.querySelector('main').style.cssText = 'justify-content: space-between'
        document.querySelector('.task-list').style.cssText = 'display: none'

    })
}


function addTaskDOM() {

    const taskInput = document.querySelector('#task-input')
    const dateInput = document.querySelector('#date-input')

    const taskValue = taskInput.value
    const dateValue = setDate(dateInput.value)
    const dateOriginal = dateInput.value

    if (taskValue === '' || dateValue === 'Invalid date') {
        taskInput.value = ''
        dateInput.value = ''
        return
    } else {
        taskInput.value = ''
        dateInput.value = ''
        return [taskValue, dateValue, dateOriginal];
    }
}

function renderTasks(task, date, index) {

    const taskList = document.querySelector('.task-list');

    const taskDiv = document.createElement('div')
    taskDiv.classList.add(`task`)
    taskDiv.classList.add(`n${index}`)
    taskList.appendChild(taskDiv);

    const checkboxDiv = document.createElement('div')
    taskDiv.appendChild(checkboxDiv);

    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    input.id = `cb${index}`
    checkboxDiv.appendChild(input)

    const label = document.createElement('label')
    label.setAttribute('for', `cb${index}`)
    label.classList.add('checkmark')
    label.classList.add(`label${index}`)
    label.id = `${index}`
    checkboxDiv.appendChild(label)

    const span = document.createElement('span')
    span.classList.add('task-text')
    span.classList.add(`strike${index}`)
    span.textContent = task
    checkboxDiv.appendChild(span)

    const dateDiv = document.createElement('div')
    dateDiv.classList.add('date')
    taskDiv.appendChild(dateDiv)

    const datePara = document.createElement('p')
    datePara.textContent = date
    dateDiv.appendChild(datePara)


}


function addProjectDOM() {

    const input = document.querySelector('#project-input')
    const inputValue = input.value

    if (inputValue === '') {
        input.value = ''
    } else {
        input.value = ''
        return inputValue
    };
};


function renderProjects(array) {

    const projects = document.querySelector('#projects-ul');

    while (projects.firstChild) {
        projects.removeChild(projects.firstChild)
    };

    array.forEach((project, index) => {

        const li = document.createElement('li')
        li.style.cursor = 'pointer'
        li.id = index
        li.classList.add('project')

        if (array.length === 1) {
            li.classList.add('word-highlight')
        } else if (array.length === (index + 1)) {
            li.classList.add('word-highlight')
        }

        li.textContent = project.name
        projects.appendChild(li)
    })

}


function projectDisplays() {

    const newProjectBtn = document.querySelector('.new-project');
    const cancelBtn = document.querySelector('#cancel-btn');
    const addProject = document.querySelector('.add-project');

    addProject.classList.add('hide-add-project');

    newProjectBtn.addEventListener('click', () => {

        addProject.classList.toggle('hide-add-project')
        newProjectBtn.classList.toggle('hide-new-project')
    })

    cancelBtn.addEventListener('click', () => {

        document.querySelector('#project-input').value = ''
        addProject.classList.toggle('hide-add-project');
        newProjectBtn.classList.toggle('hide-new-project')

    })

}

projectDisplays()



export { projectStorage }

function projectStorage (array, current) {

    localStorage.setItem('Projects storage', JSON.stringify(array));
    localStorage.setItem('Current project', current);

}



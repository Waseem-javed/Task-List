// creater variables
const form = document.querySelector("#addTaskBtn");
const taskList = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const inputtask = document.querySelector('#task');
const deleteitem = document.querySelector('.delete-item')

holdEventListeners();
// let declare a function that hold all events
function holdEventListeners() {

    // DOM CONTENT LOAD EVENT
    document.addEventListener('DOMContentLoaded', getTasks);

    // add task event
    form.addEventListener('click', addTask);
    // add delete event
    taskList.addEventListener('click', deleteItem);
    // clear event occur
    clearbtn.addEventListener('click', clearTask);

    // filter Task
    filter.addEventListener('keyup', filteringTask);
}

// Get task item from localstorage and below function for that
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        // create li item elemet
        const li = document.createElement("li");
        li.className = "collection-item";
        // create textnode
        li.appendChild(
            document.createTextNode(task)
        );
        // create rightside delete icon
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        // icon html ok
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);

        // // store into local storage
        // storeIntoLS(inputtask.value);
        // // when item add then input field should be empty below
    	})

}

// Add Task function
function addTask(e) {
        if (inputtask.value === "") {
           return alert("Fill the Field..");          
        }
        // create li item elemet
        const li = document.createElement("li");
        li.className = "collection-item";
        // create textnode
        li.appendChild(document.createTextNode(inputtask.value));
        // create rightside delete icon
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        // icon html ok
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);

        // store into local storage
        storeIntoLS(inputtask.value);

        // when item add then input field should be empty below
        inputtask.value = "";

        e.preventDefault();
    }
// store into localstorage
function storeIntoLS(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    
	localStorage.setItem("tasks", JSON.stringify(tasks));
}


// delete item
function deleteItem(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you Sure..?')) {
            e.target.parentElement.parentElement.remove();
            removeItemFromLS(e.target.parentElement.parentElement);
        }
    }
}

// Remove item from localstorage
function removeItemFromLS(taskitem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task, index) => {
        if (taskitem.textContent === task) {
            tasks.slice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear Task
function clearTask() {
    // taskList.innerHTML = '';
    // inputtask.value = '';

    // faster way to delete item from list
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
}

// filtering task
function filteringTask(e) {
    const text = e.target.value;
    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

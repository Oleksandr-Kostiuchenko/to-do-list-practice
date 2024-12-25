//* Find elements
const updatedTodoList = [];

let HTMLtasksArr = [];
let HTMLinProgresTasks = [];
const addBtn = document.querySelector('.add-btn');
const deleteBtn = document.querySelector('.delete-btn');
const recycleBtn = document.querySelector('.recycle-btn');
const inProgressBtn = document.querySelector('.in-progress-btn');
const completeBtn = document.querySelector('.complete-btn');
const inputTask = document.querySelector('.task-input');

const toDoList = document.querySelector('.to-do-list');
const inProgresslist = document.querySelector('.in-progress-list');
const completedList = document.querySelector('.completed-list');

//* Renovate tasks
const fillTasks = () => {
    try {
        if(sessionStorage.length === 0){
            return;
        }

        const TasksFromSS = JSON.parse(sessionStorage.getItem('tasks'));
        const TasksInProgressFromSS = JSON.parse(sessionStorage.getItem('inProgressTasks'));

        // console.log(TasksFromSS);
        if(TasksFromSS !== null){
            HTMLtasksArr = TasksFromSS;
        } if(TasksInProgressFromSS !== null){
            HTMLinProgresTasks = TasksInProgressFromSS;
        }

        toDoList.insertAdjacentHTML('beforeend', TasksFromSS.join(''));
        inProgresslist.insertAdjacentHTML('beforeend', TasksInProgressFromSS.join(''));
    } catch(err){
        console.log(err);
    }
}

fillTasks();

//* Function Add
const createTaskTemplate = () => {
    return `<li class="list-item">📌${inputTask.value}</li>`;
} 

//* Add event listeners Add btn
addBtn.addEventListener('click', event => {
    if(inputTask.value.trim() !== ''){
        const HTMLTask = createTaskTemplate();
        toDoList.insertAdjacentHTML('beforeend', HTMLTask);

        HTMLtasksArr.push(HTMLTask);
        sessionStorage.setItem(`tasks`, JSON.stringify(HTMLtasksArr));

        inputTask.value = '';
    }
})

//* Add event listeners to-do-list selected
toDoList.addEventListener('click', event => {
    if(event.target.classList.contains('list-item')){
        const items = document.querySelectorAll('.list-item');
        items.forEach(el => el.classList.remove('selected'));

        event.target.classList.toggle('selected');
    }
})

//* Add event listeners delete BTN
deleteBtn.addEventListener('click', event => {
    const selectedItem = document.querySelector('.selected');
    if (!selectedItem) {
        alert('Please select a task to delete.');
        return;
    }

    selectedItem.remove();

    const tasks = JSON.parse(sessionStorage.getItem('tasks'));

    const taskIndex = tasks.findIndex(task => task.includes(selectedItem.textContent.trim()));

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
    }
});


//* Add event listeners recycle BTN
recycleBtn.addEventListener('click', event => {
    const selectedItems = document.querySelectorAll('.list-item');
    selectedItems.forEach(el => el.remove());

    HTMLtasksArr = [];
    sessionStorage.setItem('tasks', '');
    sessionStorage.removeItem('tasks');

    HTMLinProgresTasks = [];
    sessionStorage.setItem('inProgressTasks', '');
    sessionStorage.removeItem('inProgressTasks');
})

//* Add event listeners in-progress-btn
inProgressBtn.addEventListener('click', event => {
    const selectedItem = document.querySelector('.selected');
    selectedItem.remove();
    const selectedCopy = selectedItem;

    const inProgressHtmlTask = `<li class="list-item">${selectedCopy.textContent}</li>`;
    inProgresslist.insertAdjacentHTML('beforeend', inProgressHtmlTask);

    HTMLinProgresTasks.push(inProgressHtmlTask);
    sessionStorage.setItem(`inProgressTasks`, JSON.stringify(HTMLinProgresTasks));

    const toDoListHTML = JSON.parse(sessionStorage.getItem('tasks'));
    // console.log(toDoListHTML);

    toDoListHTML.map(el => {
        if(el !== inProgressHtmlTask) {
            updatedTodoList.push(el);
        }
    })
    
    sessionStorage.setItem('tasks', JSON.stringify(updatedTodoList));
})

//* Add event listeners in-progress-list selected
inProgresslist.addEventListener('click', event => {
    if(event.target.classList.contains('list-item')){
        const items = document.querySelectorAll('.list-item');
        items.forEach(el => el.classList.remove('selected'));

        event.target.classList.toggle('selected');
    }
})

//* Add event listeners in complete-btn
completeBtn.addEventListener('click', event => {
    const selectedItem = document.querySelector('.selected');
    selectedItem.remove();

    const selectedCopy = selectedItem;
    completedList.insertAdjacentHTML('beforeend', `<li class="list-item">${selectedCopy.textContent}</li>`);
})

//* Add event listeners completed-list selected
completedList.addEventListener('click', event => {
    if(event.target.classList.contains('list-item')){
        const items = document.querySelectorAll('.list-item');
        items.forEach(el => el.classList.remove('selected'));

        event.target.classList.toggle('selected');
    }
})

//* Add event listeners to selected items for modal

toDoList.addEventListener('dblclick', event => {
    const instance = basicLightbox.create(`
        <div class="modal">
            <p class="modal-text">${event.target.textContent}</p>
            <p class="description-text">
                ${localStorage.getItem(`${event.target.textContent}`)}
            </p>

            <input class="description-input" placeholder="Add description">
            <button class="add-description-btn" type="button">Add</button>

            <a class="close">Close</a>
        </div>
    `, {
        onShow: (instance) => {
            instance.element().querySelector('a').onclick = instance.close;

            const descriptionBtn = instance.element().querySelector('.add-description-btn');
            const descriptionInput = instance.element().querySelector('.description-input');
            const descriptionText = instance.element().querySelector('.description-text');

            descriptionBtn.addEventListener('click', () => {
                if(descriptionInput.value.trim() !== ''){
                    localStorage.setItem(`${event.target.textContent}`, `${descriptionInput.value}`);
                    descriptionText.textContent = localStorage.getItem(`${event.target.textContent}`); 

                    descriptionInput.value = '';
                }
            });
        }
    })

    if(event.target.classList.contains('list-item') && event.target.classList.contains('selected')){
        instance.show();
    }
})

inProgresslist.addEventListener('dblclick', event => {
    const instance = basicLightbox.create(`
        <div class="modal">
            <p class="modal-text">${event.target.textContent}</p>
            <p class="description-text"></p>

            <input class="description-input" placeholder="Add description">
            <button class="add-description-btn" type="button">Add</button>

            <a class="close">Close</a>
        </div>
    `, {
        onShow: (instance) => {
            instance.element().querySelector('a').onclick = instance.close;

            const descriptionBtn = instance.element().querySelector('.add-description-btn');
            const descriptionInput = instance.element().querySelector('.description-input');
            const descriptionText = instance.element().querySelector('.description-text');

            descriptionBtn.addEventListener('click', () => {
                descriptionText.textContent = descriptionInput.value;
                descriptionInput.value = '';
            });
        }
    })

    if(event.target.classList.contains('list-item') && event.target.classList.contains('selected')){
        instance.show();
    }
})

completedList.addEventListener('dblclick', event => {
    const instance = basicLightbox.create(`
        <div class="modal">
            <p class="modal-text">${event.target.textContent}</p>
            <p class="description-text"></p>

            <input class="description-input" placeholder="Add description">
            <button class="add-description-btn" type="button">Add</button>

            <a class="close">Close</a>
        </div>
    `, {
        onShow: (instance) => {
            instance.element().querySelector('a').onclick = instance.close;

            const descriptionBtn = instance.element().querySelector('.add-description-btn');
            const descriptionInput = instance.element().querySelector('.description-input');
            const descriptionText = instance.element().querySelector('.description-text');

            descriptionBtn.addEventListener('click', () => {
                descriptionText.textContent = descriptionInput.value;
                descriptionInput.value = '';
            });
        }
    })

    if(event.target.classList.contains('list-item') && event.target.classList.contains('selected')){
        instance.show();
    }
})
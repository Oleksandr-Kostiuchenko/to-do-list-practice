//* Find elements
const updatedTodoList = [];
const updatedInProgressList = [];

let HTMLtasksArr = [];
let HTMLinProgresTasks = [];
let HTMLCompletedTasks = [];

const timeP = document.querySelector('.time-p');
const addBtn = document.querySelector('.add-btn');
const deleteBtn = document.querySelector('.delete-btn');
const recycleBtn = document.querySelector('.recycle-btn');
const inProgressBtn = document.querySelector('.in-progress-btn');
const completeBtn = document.querySelector('.complete-btn');
const inputTask = document.querySelector('.task-input');

const toDoList = document.querySelector('.to-do-list');
const inProgresslist = document.querySelector('.in-progress-list');
const completedList = document.querySelector('.completed-list');

//* Time
const now = new Date();
console.log(date.format(now, 'HH:mm DD/MM'));
timeP.textContent = date.format(now, 'HH:mm');

//* Renovate input content
inputTask.addEventListener('input', event => {
    const taskText = event.target.value;
    localStorage.setItem('inputTask', taskText);
});

//* Renovate tasks
const fillTasks = () => {
    try {
        if(localStorage.length === 0){ //Исправить проверку, на коректную
            return;
        }

        if(localStorage.getItem('inputTask')){
            inputTask.value = localStorage.getItem('inputTask');
        }

        const TasksFromSS = JSON.parse(localStorage.getItem('tasks'));
        const TasksInProgressFromSS = JSON.parse(localStorage.getItem('inProgressTasks'));
        const TasksCompletedFromSS = JSON.parse(localStorage.getItem('completedTasks'));

        // console.log(TasksFromSS);
        if(TasksFromSS !== null){
            HTMLtasksArr = TasksFromSS;
        } if(TasksInProgressFromSS !== null){
            HTMLinProgresTasks = TasksInProgressFromSS;
        }if(TasksCompletedFromSS !== null){
            HTMLCompletedTasks = TasksCompletedFromSS;
        }

        toDoList.insertAdjacentHTML('beforeend', TasksFromSS.join(''));
        inProgresslist.insertAdjacentHTML('beforeend', TasksInProgressFromSS.join(''));
        completedList.insertAdjacentHTML('beforeend', TasksCompletedFromSS.join(''));
    } catch(err){
        console.log(err);
    }
}

fillTasks();

//* Function Add
const createTaskTemplate = () => {
    return `<li class="list-item" data-list="to-do">📌${inputTask.value}</li>`;
} 

//* Add event listeners Add btn
addBtn.addEventListener('click', event => {
    if(inputTask.value.trim() !== ''){
        const HTMLTask = createTaskTemplate();
        toDoList.insertAdjacentHTML('beforeend', HTMLTask);

        HTMLtasksArr.push(HTMLTask);
        localStorage.setItem(`tasks`, JSON.stringify(HTMLtasksArr));

        localStorage.removeItem('inputTask');
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

    console.log(selectedItem);
    selectedItem.remove();

    let tasks = [];
    if(selectedItem.dataset.list === 'to-do') {
        tasks = JSON.parse(localStorage.getItem('tasks'));

        const taskIndex = tasks.find(task => task.includes(selectedItem.textContent.trim()));
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }else if(selectedItem.dataset.list === 'in-progress'){
        tasks = JSON.parse(localStorage.getItem('inProgressTasks'));

        const taskIndex = tasks.find(task => task.includes(selectedItem.textContent.trim()));
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            localStorage.setItem('inProgressTasks', JSON.stringify(tasks));
        }
    }else if(selectedItem.dataset.list === 'completed'){
        tasks = JSON.parse(localStorage.getItem('completedTasks'));

        const taskIndex = tasks.find(task => task.includes(selectedItem.textContent.trim()));
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            localStorage.setItem('completedTasks', JSON.stringify(tasks));
        }
    }
});


//* Add event listeners recycle BTN
recycleBtn.addEventListener('click', event => {
    const selectedItems = document.querySelectorAll('.list-item');
    selectedItems.forEach(el => el.remove());

    HTMLtasksArr = [];
    localStorage.removeItem('tasks');

    HTMLinProgresTasks = [];
    localStorage.removeItem('inProgressTasks');

    HTMLCompletedTasks = [];
    localStorage.removeItem('completedTasks');
})

//* Add event listeners in-progress-btn
inProgressBtn.addEventListener('click', event => {
    const selectedItem = document.querySelector('.selected');
    if(selectedItem.dataset.list === 'to-do'){
        selectedItem.remove();
        const selectedCopy = selectedItem;
    
        const inProgressHtmlTask = `<li class="list-item" data-list="in-progress">${selectedCopy.textContent}</li>`;
        inProgresslist.insertAdjacentHTML('beforeend', inProgressHtmlTask);
    
        HTMLinProgresTasks.push(inProgressHtmlTask);
        localStorage.setItem(`inProgressTasks`, JSON.stringify(HTMLinProgresTasks));
    
        const toDoListHTML = JSON.parse(localStorage.getItem('tasks'));

        const updatedTodoList = toDoListHTML.filter(el => el !== `<li class="list-item" data-list="to-do">${selectedCopy.textContent}</li>`);
        
        localStorage.setItem('tasks', JSON.stringify(updatedTodoList));
    } else{
        return;
    }
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
    if(selectedItem.dataset.list === 'in-progress'){
        selectedItem.remove();
        const selectedCopy = selectedItem;
    
        const CompletedHTMLTask = `<li class="list-item" data-list="completed">${selectedCopy.textContent}</li>`;
        completedList.insertAdjacentHTML('beforeend', CompletedHTMLTask);
    
        HTMLCompletedTasks.push(CompletedHTMLTask);
        localStorage.setItem(`completedTasks`, JSON.stringify(HTMLCompletedTasks));
    
        const inProgressHTML = JSON.parse(localStorage.getItem('inProgressTasks'));
        const updatedInProgressList = inProgressHTML.filter(el => el !== `<li class="list-item" data-list="in-progress">${selectedCopy.textContent}</li>`);
        
        localStorage.setItem('inProgressTasks', JSON.stringify(updatedInProgressList));
    } else{
        return;
    }
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

completedList.addEventListener('dblclick', event => {
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
//* Find elements
const addBtn = document.querySelector('.add-btn');
const deleteBtn = document.querySelector('.delete-btn');
const recycleBtn = document.querySelector('.recycle-btn');
const inProgressBtn = document.querySelector('.in-progress-btn');
const completeBtn = document.querySelector('.complete-btn');
const inputTask = document.querySelector('.task-input');

const toDoList = document.querySelector('.to-do-list');
const inProgresslist = document.querySelector('.in-progress-list');
const completedList = document.querySelector('.completed-list');

//* Function Add
const createTaskTemplate = () => {
    return `<li class="list-item">📌${inputTask.value}</li>`;
} 

//* Add event listeners Add btn
addBtn.addEventListener('click', event => {
    if(inputTask.value.trim() !== ''){
        toDoList.insertAdjacentHTML('beforeend',createTaskTemplate());
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
    selectedItem.remove();
})

//* Add event listeners recycle BTN
recycleBtn.addEventListener('click', event => {
    const selectedItems = document.querySelectorAll('.list-item');
    selectedItems.forEach(el => el.remove());
})

//* Add event listeners in-progress-btn
inProgressBtn.addEventListener('click', event => {
    const selectedItem = document.querySelector('.selected');
    selectedItem.remove();

    const selectedCopy = selectedItem;
    inProgresslist.insertAdjacentHTML('beforeend', 
        `<li class="list-item">
            ${selectedCopy.textContent}
        </li>`);
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
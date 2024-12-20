//TODO: Створи список з 10 елементів. 
//? Коли користувач клікає на будь-який елемент, у консоль має виводитись текст цього елемента і змінюватися його колір.
//? Використовуй делегування подій.

//TODO: Додай кнопку "Видалити".
//? Коли користувач натискає на кнопку, цей елемент має видалятись зі списку.

//* Find elements
const elementsListDiv = document.querySelector('.elements-div');
const elementList = document.querySelector('.elements-list');
const deleteBtn = document.querySelector('.delete-btn');
const addButton = document.querySelector('.add-btn');
const inputNum = document.querySelector('.input-number');

//* Add event listener
elementsListDiv.addEventListener('click', event => {
    if(event.target.classList.contains('elements-div')){
        return;
    }
    else if(event.target.classList.contains('element-item')) {
        const items = document.querySelectorAll('.element-item');
        items.forEach(el => el.classList.remove('selected'));

        event.target.classList.toggle('selected');
        console.log(event.target.textContent);
    } else if(event.target.classList.contains('delete-btn')){
        const selectedItem = document.querySelector('.selected');
        selectedItem.remove();
    }
    else if(event.target.classList.contains('add-btn')) {
        elementList.insertAdjacentHTML('beforeend', `<li class="element-item" data-id="${inputNum.value}">Element ${inputNum.value}</li>`);
    }
});
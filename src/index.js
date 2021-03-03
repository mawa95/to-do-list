import "./main.scss";

let $todoInput; //miejsce gdzie użytkownik wpisuje treść zadania
let $alertInfo; // info o braku zadania, konieczności dodania
let $addBtn; // przycisk add dodaje nowe elementy do listy
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask; //nowo dadane LI

let $popup; // pobrany popup
let $popupInfo; // alert w popupie na pusty tekst
let $editedTodo; //edytowany Todo
let $popupInput; //tekst wpisywany w inputa w popupie
let $addPopupBtn; // przycisk "zatwierdź" w popupie
let $closeTodoBtn; //przycisk od zamykania popupa
let $idNumber = 0 ;
let $allTasks;


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

// pobieranie elementów
const prepareDOMElements = () => {

    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');

    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');

};

// nasłuchiwanie na zdarzenia
const prepareDOMEvents = () => {

    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);

};
// tworzenie i dodawanie elementu listy
const addNewTask = () => {

    if ($todoInput.value !== '') {
        $idNumber++;//
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);//dodajemy id do zadania 
        $ulList.appendChild($newTask);
        $todoInput.value = '';
        $alertInfo.innerText = '';
        createToolsArea();

    } else {
        $alertInfo.innerText = 'Wpisz treść zadania!';

    }
};

const enterCheck = () => {
    if (event.keyCode === 13 ){
        addNewTask();
    };
};

//tworzenie przycisków edycji zadań
const createToolsArea = () => {

    toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fa fa-check"></i>'

    editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = 'EDIT';

    deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fa fa-times"></i>'

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);

};

//kliknięcia w przycicki edycji, usuwania, check

const checkClick = (e) => {

    if (e.target.closest('button').classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');

    } else if (e.target.closest('button').className === 'edit') {
       editTask(e);
    } else if (e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }
};

//edycja zadan
const editTask = (e) => {
    const oldTdo = e.target.closest('li').id; //klik na button edid i odwolujemy się do jego najbliżego li
    $editedTodo = document.getElementById(oldTdo);
    $popupInput.value = $editedTodo.firstChild.textContent; // w inpucie popupa pojawia się treść edytowanego zadania
    $popup.style.display = "flex";

}

// sprawdzamy czy popup nie jest pusty i zmieniamy treść zadania po edycji
const changeTodo = () => {
    if ($popupInput.value !== ''){
        $editedTodo.firstChild.textContent = $popupInput.value; //do naszego pobranego li przypisujemy treść z inputa
        $popup.style.display = "none"; 
        $popupInfo.innerText = '';
    }else {
        $popupInfo.innerText = "Musisz podać jakąś treść";
    };
};


//zamykanie popup
const closePopup = () => {
    $popup.style.display = "none";
    $popupInfo.innerText = '';
   };
//usuwanie zadania
const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if($allTasks.length === 0 ){
        $alertInfo.innerText = "Brak zadań na liście"
    }
};


document.addEventListener('DOMContentLoaded', main);
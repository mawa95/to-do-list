import "./main.scss";
//dark mode
//popup/dodać zachowanie poza
//mobilny wygląd
//filtrowanie listy
//drag and drop


let $todoInput; //miejsce gdzie użytkownik wpisuje treść zadania
let $alertInfo; // info o braku zadania, konieczności dodania
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask; //nowo dadane LI
let $completeBtn;//checkbox wykonanego zadania
let $darkModeBtn;
let $darkModeIco;
let $lightModeIco;

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
    $ulList = document.querySelector('.todoList ul');
    $darkModeBtn = document.querySelector('.darkModeBtn');
    $darkModeIco = document.querySelector('.darkModeIco')
    $lightModeIco = document.querySelector('.lightModeIco');

    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');

};

// nasłuchiwanie na zdarzenia
const prepareDOMEvents = () => {

    $todoInput.addEventListener('keyup', enterCheck);
    $ulList.addEventListener('click', checkClick);
    $ulList.addEventListener('click', checkCheckbox);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $darkModeBtn.addEventListener('click', changeMode);
    

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
        //do nowej funkcji
        $alertInfo.innerText = '';
        createToolsArea();

    } else {
        $alertInfo.innerText = 'Type something!';

    }
};
// dodanie zadania na enter
const enterCheck = (event) => {
    if (event.keyCode === 13 ){
        addNewTask();
    };
};

//tworzenie przycisków edycji zadań
const createToolsArea = () => {
    let toolsPanel;
<<<<<<< Updated upstream
    let completeBtn;
=======
    let checkLabel;
    let span;
>>>>>>> Stashed changes
    let editBtn;
    let deleteBtn;

    toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);
   
    $completeBtn = document.createElement('input');
    $completeBtn.classList.add('complete');
    $completeBtn.setAttribute("type", "checkbox");
<<<<<<< Updated upstream
=======
    
    checkLabel = document.createElement('label');
    checkLabel.classList.add('checkbox');

    // span = document.createElement('span');
    // checkLabel.appendChild(span);
>>>>>>> Stashed changes
   
    editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = '<i class="fa fa-edit"></i>';

    deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fa fa-times"></i>'

    toolsPanel.appendChild($completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);


};

const checkClick = (e) => {

    if (e.target.closest('button').className === 'edit') {
       editTask(e);
    } else if (e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }
};

//kliknięcia w przycicki edycji, usuwania, 
const checkCheckbox = (e) => {

    if (e.target.closest('input').checked === true ){
        e.target.closest('li').classList.add('completed');
    
    } else {
        e.target.closest('li').classList.remove('completed');
    }
};

//edycja zadan
const editTask = (e) => {
    const oldTdo = e.target.closest('li').id; //klik na button edid i odwolujemy się do jego najbliżego li
    $editedTodo = document.getElementById(oldTdo);
    $popupInput.value = $editedTodo.firstChild.textContent; // w inpucie popupa pojawia się treść edytowanego zadania
    $popup.style.display = "flex";

}
//event listner do konkretnego elementu, parent elem
// sprawdzamy czy popup nie jest pusty i zmieniamy treść zadania po edycji
const changeTodo = () => {
    if ($popupInput.value !== ''){
        $editedTodo.firstChild.textContent = $popupInput.value; //do naszego pobranego li przypisujemy treść z inputa
        $popup.style.display = "none"; 
        $popupInfo.innerText = '';
    }else {
        $popupInfo.innerText = "You have to type something!";
    };
};


//zamykanie popup, zrób prawdziwy popup
const closePopup = () => {
    $popup.style.display = "none";
    $popupInfo.innerText = '';
   };

//usuwanie zadania
const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if($allTasks.length === 0 ){
        $alertInfo.innerText = "No todo's yet"
    }
};

const changeMode = () => {
    document.body.classList.toggle('darkMode');

    if(document.body.classList.contains('darkMode')){
        $lightModeIco.classList.add('hide')
        $darkModeIco.classList.remove('hide');
        
    } else {
        $lightModeIco.classList.remove('hide');
        $darkModeIco.classList.add('hide');
       
        
    };
}

document.addEventListener('DOMContentLoaded', main);
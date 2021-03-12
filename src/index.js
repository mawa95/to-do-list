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
let $completeBtn; //checkbox wykonanego zadania
let $darkModeBtn; //przycisk do zmiany darkmode/lightmode
let $darkModeIco; //ikona darkMode
let $lightModeIco; //ikona lightMode
let $sumItems; //liczba wszystkich zadań na liście
let $completedTodoBtn; //przycisk do filtrowania zadań zrobionych
let $activeTodoBtn; //przycisk do filtrowania zadań aktywnych, do zrobienia
let $activeTodo;//zadanie niezrobione
let $completedTodo;// zadanie zrobione z klasą completed
let $allTodoBtn; //przycisk pokazujący wszystkie zadania z listy
let $clearCompletedBtn;

let $popup; // pobrany popup
let $popupInfo; // alert w popupie na pusty tekst
let $editedTodo; //edytowany Todo
let $popupInput; //tekst wpisywany w inputa w popupie
let $addPopupBtn; // przycisk "zatwierdź" w popupie
let $closeTodoBtn; //przycisk od zamykania popupa
let $idNumber = 0;
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

    $sumItems = document.querySelector('.sumItems');
    $completedTodoBtn = document.querySelector('.completedTodo');
    $activeTodoBtn = document.querySelector('.activeTodo');
    $allTodoBtn = document.querySelector('.allTodo');
    $clearCompletedBtn = document.querySelector('.clearCompleted')

};

// nasłuchiwanie na zdarzenia
const prepareDOMEvents = () => {

    $todoInput.addEventListener('keyup', enterCheck);
    $ulList.addEventListener('click', checkClick);
    $ulList.addEventListener('click', checkCheckbox);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $darkModeBtn.addEventListener('click', changeMode);

    $completedTodoBtn.addEventListener('click', filterCompleted);
    $activeTodoBtn.addEventListener('click', filterActive);
    $allTodoBtn.addEventListener('click', filterAll);
    $clearCompletedBtn.addEventListener('click', clearCompletedItems);




};
// tworzenie i dodawanie elementu listy
const addNewTask = () => {

    if ($todoInput.value !== '') {
        $idNumber++; //
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`); //dodajemy id do zadania 
        $ulList.appendChild($newTask);


        $todoInput.value = '';
        //do nowej funkcji
        $alertInfo.innerText = '';
        createCheckbox();
        createToolsArea();
        numberOfListItems();




    } else {
        $alertInfo.innerText = 'Type something!';

    }
};
const createCheckbox = () => {
    let checkLabel;
    let span;
    $completeBtn = document.createElement('input');
    $completeBtn.classList.add('complete');
    $completeBtn.setAttribute("type", "checkbox");

    checkLabel = document.createElement('label');
    checkLabel.classList.add('checkbox');

    span = document.createElement('span');

    checkLabel.appendChild(span);
    checkLabel.appendChild($completeBtn)

    $newTask.prepend(checkLabel);
}
// dodanie zadania na enter
const enterCheck = (event) => {
    if (event.keyCode === 13) {
        addNewTask();
    };
};

//tworzenie przycisków edycji zadań
const createToolsArea = () => {
    let toolsPanel;
    let editBtn;
    let crossImg;
    let deleteBtn;

    toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = '<i class="fa fa-edit"></i>';

    deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    crossImg = document.createElement('div');
    crossImg.classList.add('crossImg');
    deleteBtn.appendChild(crossImg);

    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);




};

const checkClick = (e) => {

    if (e.target.closest('button').className === 'edit') {
        editTask(e);
    } else if (e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }

     numberOfListItems();


};

//kliknięcia w przycicki edycji, usuwania, 
const checkCheckbox = (e) => {

    if (e.target.closest('input').checked === true) {
        e.target.closest('li').classList.add('completed');

    } else {
        e.target.closest('li').classList.remove('completed');
    }
    numberOfListItems();
};

//edycja zadan
const editTask = (e) => {
    const oldTodo = e.target.closest('li').id; //klik na button edit i odwolujemy się do jego najbliżego li
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.nextSibling.textContent;; // w inpucie popupa pojawia się treść edytowanego zadania
    $popup.style.display = "flex";

}
//event listner do konkretnego elementu, parent elem
// sprawdzamy czy popup nie jest pusty i zmieniamy treść zadania po edycji
const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.nextSibling.textContent = $popupInput.value; //do naszego pobranego li przypisujemy treść z inputa
        $popup.style.display = "none";
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = "You have to type something!";
    };
};


//zamykanie popup, zrób prawdziwy popup
const closePopup = (e) => {
    $popup.style.display = "none";
    $popupInfo.innerText = '';

    // if(!e.target.closest('div').classList.contains('popup')){
    //     $popup.style.display = "none";
        
    // }
};

//usuwanie zadania
const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if ($allTasks.length === 0) {
        $alertInfo.innerText = "No todo's yet"
    }
};
// funkcja przęłaczająca darkmode/lightmode
const changeMode = () => {
    document.body.classList.toggle('darkMode');

    if (document.body.classList.contains('darkMode')) {
        $lightModeIco.classList.add('hide')
        $darkModeIco.classList.remove('hide');

    } else {
        $lightModeIco.classList.remove('hide');
        $darkModeIco.classList.add('hide');


    };

}
//funkcja zliczająca ilośc zadań do zrobienia
const numberOfListItems = () => {
    let caunter = 0;
    for (let i = 0; i < $allTasks.length; i++) {
        caunter++
        if ($allTasks[i].classList.contains('completed')) {
            caunter = caunter - 1;
        }
    }
    $sumItems.innerText = `${caunter} items left`;
}

// funkcja ukrywa wszystkie zadania z wyjątkiem completed
const filterCompleted = () => {

    for (let i = 0; i < $allTasks.length; i++) {
        //ukryj
        $allTasks[i].style.display = 'none';

        $activeTodoBtn.classList.remove('active');
        $allTodoBtn.classList.remove('active');
        $completedTodoBtn.classList.add('active');
        //if activ pokaz
        if ($allTasks[i].classList.contains('completed')) {
            let $activeTodo = $allTasks[i].style.display = 'flex';

        };

    }
}

//funcka ukrywa wszystkie zadania z wyjątkiem aktywnych
const filterActive = () => {

    for (let i = 0; i < $allTasks.length; i++) {

        $allTasks[i].style.display = 'none';

        $activeTodoBtn.classList.add('active');
        $allTodoBtn.classList.remove('active');
        $completedTodoBtn.classList.remove('active');

        if (!$allTasks[i].classList.contains('completed')) {
            let $completedTodo = $allTasks[i].style.display = 'flex';

        };
    }
}

//funkcja pozakuje wszystkie zadania na liście
const filterAll = () => {

    for (let i = 0; i < $allTasks.length; i++) {

        $activeTodoBtn.classList.remove('active');
        $allTodoBtn.classList.add('active');
        $completedTodoBtn.classList.remove('active');

        $allTasks[i].style.display = 'flex';

    }
   
}

// funkcja usuwa zadania z klasą completed
const clearCompletedItems = () => {
    let arr = []
    for (let i = 0; i < $allTasks.length; i++) {
       
        if ($allTasks[i].classList.contains('completed')) {
            let $activeTodo = $allTasks[i];

            $activeTodo.remove();
            // let $activeTodo = arr.push($allTasks[i])
            // $activeTodo.remove;
        };
        
    }
   
}

document.addEventListener('DOMContentLoaded', main);
const toDoForm = document.querySelector(".jsForm");
const textInput = toDoForm.querySelector(".jsTextInput");
const addBtn = toDoForm.querySelector(".jsAddBtn");
const toDoList = document.querySelector(".jsList");

let toDos = [];
const LS_TODOS = "toDoList"

const handleDelete = (event) => {
 const li = event.target.parentNode.parentNode;
 toDoList.removeChild(li);

 const currentId = li.id;
 const cleanToDo = toDos.filter( obj => obj.id !== parseInt(currentId));
 toDos = cleanToDo;
 saveToDos();
 location.reload();
}

const saveToDos = () => {
 localStorage.setItem(LS_TODOS, JSON.stringify(toDos));
}

const paintToDo = (text) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    const delBtn = document.createElement("button");
    li.id = newId;
    span.innerHTML = text.length > 35? `${text.slice(0,30)}...` : text;
    delBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    delBtn.style = "border: none; background-color: inherit;"
    delBtn.addEventListener("click", handleDelete);
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    li.scrollIntoView({block:"center", behavior:"smooth"});
    const toDoObj = {
        text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos(toDos);
}


const handleSubmit = (event) => {
    event.preventDefault();
    const currentInput = textInput.value;
    if (currentInput){
        paintToDo(currentInput);
    }
    textInput.value = "";
    textInput.focus();
}

const loadLocalData = () => {
    const loadedData = localStorage.getItem(LS_TODOS);
    const parsedData = JSON.parse(loadedData);
    parsedData !== null? parsedData.forEach(obj =>paintToDo(obj.text)) : "";
}


const init = () => {
    loadLocalData();
    toDoForm.addEventListener("submit", handleSubmit);
    addBtn.addEventListener("click", handleSubmit);
}

init();
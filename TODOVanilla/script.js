const formEl = document.getElementById("form");
const inputEl = document.getElementById("todoInput");
const todosEl = document.getElementById("todosList");

initApp();

function initApp() {
  const dbTodos = JSON.parse(localStorage.getItem("todos"));

  if (dbTodos) {
    dbTodos.forEach((todo) => {
      addTodo(todo);
    });
  }

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
  });
}

function addTodo(todo) {
  let todoText = inputEl.value;

  if (todo) {
    todoText = todo.text;
  }
  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }
    todoEl.innerText = todoText;
    todoEl.addEventListener("contextmenu", (e) => {
      contextMenuAction(e, todoEl);
    });
    todoEl.addEventListener("click", () => {
      clickAction(todoEl);
    });
    todosEl.appendChild(todoEl);
  }
  inputEl.value = "";
  updateLocalStorage();
}

function contextMenuAction(e, todoEl) {
  e.preventDefault();
  todoEl.remove();
  updateLocalStorage();
}

function clickAction(todoEl) {
  todoEl.classList.toggle("completed");
  updateLocalStorage();
}

function updateLocalStorage() {
  const todosEl = document.querySelectorAll("li");
  const todos = [];
  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

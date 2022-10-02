// Instructions
// Make a GET request with fetch to http://localhost:3000/todos to load all Todos from the server and render them in a list. Completed Todos should be grey and scored out.
// When the form is submitted, make POST request with fetch to http://localhost:3000/todos to create a new Todo. Update the list of Todos without reloading the page.

// const { create } = require("json-server");

const todosURL = "http://localhost:3000/todos"

// GET ALL TODOS FROM THE JSON FILE
function getTodos() {
  fetch(todosURL)
    .then(function (response) {
    console.log("Get Todos", response);
    return response.json();
    })
    .then(function (data) {
      console.log("Get Todos", data);
      const ulEl = document.getElementById("todo-list");

      data.forEach((element) => {
        const li = document.createElement("li");
        ulEl.appendChild(li);
        li.innerHTML = element.title;
        if(element.completed === true) {
          li.setAttribute("class", "completed");
        }
      });
    });
};

// DISPLAY ALL TODOS IN THE BROWSER
function addTodos() {
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", () => {
    const input = document.getElementById("todo-title");
    console.log("Input Todos", input.value);
    createNewTodo(input.value);
  });
};

// CREATE A NEW TODO IN THE JSON FILE
function createNewTodo(todo) {
  fetch(todosURL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: todo,
      completed: false,
    }),
  }).then(function (response) {
    console.log("Create New Todo", response);
    return response.json();
  });
};

// RENDER ALL TODOS IN THE BROWSER
function render() {
  getTodos();
  addTodos()
}

render();

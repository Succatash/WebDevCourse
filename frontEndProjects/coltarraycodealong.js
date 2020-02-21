//window.setTimeout(function() {//}, 500);
let todos = ["buy new turtle"];

let input = prompt("what would you like to do?");

while (input !== "quit") {
  if (input === "list") {
    listTodos();
  } else if (input === "new") {
    addTodo();
  } else if (input === "delete") {
    deleteTodo();
  }
  input = prompt("what would you like to do?");
}
console.log(`Final list includes ${todos}`);

function listTodos() {
  todos.forEach(function(todo, indexes) {
    console.log("************");
    console.log(`${indexes}: ${todo}`);
  });
}

function addTodo() {
  //ask for new todos
  let newTodo = prompt("add new todo");
  //add to todos array
  todos.push(newTodo);
}

function deleteTodo() {
  //ask for index of todo to be deleted
  let index = prompt("enter index of todo to delete");
  //delete
  todos.splice(index, 1, "deleted");
  console.log(`todo ${index} deleted`);
}

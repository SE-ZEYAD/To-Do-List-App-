let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let submitClear = document.querySelector(".clear");
let tasksDiv = document.querySelector(".tasks");

//Empty Array Task To Store Tasks
let arrOfTasks = [];

//Trigger Get Data From Local Storage
GetDataFromLocalStorage();

//Check Data in Local Storage
if (localStorage.getItem("tasks")) {
  arrOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

//Add Task
submit.onclick = (_) => {
  if (input.value !== "") {
    addTaskToArray(input.value); //Add Task To Array Of Tasks
    input.value = "";
  }
};

//Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Update Button
  if (e.target.classList.contains("task")) {
    // Get Task Id
    e.target.classList.toggle("done");
  }
  toggleStatusTaskWith(e.target.getAttribute("data-id"));
});

//Initialze Add Task Function
function addTaskToArray(textValue) {
  //Task Data
  const task = {
    id: Date.now(),
    title: textValue,
    isDone: false,
  };
  //Add Task To Array
  arrOfTasks.push(task);
  //Add Tasks To Page
  addElementToPageFrom(arrOfTasks);
  //Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrOfTasks);
}

//Add Tasks To Page
function addElementToPageFrom(arrOfTasks) {
  // Empty Task Div
  tasksDiv.innerHTML = "";

  // Loop Through Array Of Tasks
  arrOfTasks.forEach((task) => {
    // Create Task Div
    let div = document.createElement("div");
    // Add Class To Task Div
    div.className = "task";
    // Add Done Task Class To Task Div
    if (task.isDone) {
      div.className = "task done";
    }
    // Add Custom Attribute To Task Div
    div.setAttribute("data-id", task.id);
    // Add Task Div To Page
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement("span");
    // Add Class To Delete Button
    span.className = "del";
    // Add Text To Delete Button
    span.appendChild(document.createTextNode("Delete"));
    // Add Delete Button To Task Div
    div.appendChild(span);
    // Add Task Div To Tasks Div
    tasksDiv.appendChild(div);
  });
}

//Add Tasks To Local Storage
function addDataToLocalStorageFrom(arrOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
}

//Get Tasks To Local Storage
function GetDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementToPageFrom(tasks);
  }
}

//Delete Task From Local Storage
function deleteTaskWith(taskId) {
  // For Explain Only
  for (let i = 0; i < arrOfTasks.length; i++) {
    console.log(`${arrOfTasks[i].id} === ${taskId}`);
  }
  arrOfTasks = arrOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrOfTasks);
}

//Update State In Local Sotrage
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrOfTasks.length; i++) {
    if (arrOfTasks[i].id == taskId) {
      arrOfTasks[i].isDone == false
        ? (arrOfTasks[i].isDone = true)
        : (arrOfTasks[i].isDone = false);
    }
  }
  addDataToLocalStorageFrom(arrOfTasks);
}

//Clear All Tasks
submitClear.onclick = function () {
  localStorage.clear();
  location.reload();
};

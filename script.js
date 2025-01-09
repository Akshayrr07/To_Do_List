const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const clearAllBtn = document.getElementById("clear-all-btn");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a new task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  addTask(taskText);
  saveTaskToLocalStorage(taskText);
  taskInput.value = "";
});

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
});

// Add a task to the UI
function addTask(taskText, completed = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTaskStatusInLocalStorage(taskText, li.classList.contains("completed"));
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeTaskFromLocalStorage(taskText);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Local Storage Functions
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ text, completed }) => addTask(text, completed));
}

function saveTaskToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatusInLocalStorage(taskText, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((task) => task.text === taskText);
  if (task) task.completed = completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

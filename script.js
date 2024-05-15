document.addEventListener('DOMContentLoaded', (event) => {
  if (localStorage.getItem('tasks')) {
      document.getElementById('taskList').innerHTML = localStorage.getItem('tasks');
  }
  if (localStorage.getItem('completedTasks')) {
      document.getElementById('completedList').innerHTML = localStorage.getItem('completedTasks');
  }
  if (localStorage.getItem('recycleBin')) {
      document.getElementById('recycleBin').innerHTML = localStorage.getItem('recycleBin');
  }
});

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  
  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  li.innerHTML = `<span>${taskText}</span>
                  <button onclick="completeTask(this)">Complete</button>
                  <button onclick="deleteTask(this)">Delete</button>`;
  taskList.appendChild(li);
  taskInput.value = '';
  saveTasks();
}

function completeTask(button) {
  const li = button.parentNode;
  li.removeChild(button.nextSibling); // remove the delete button
  li.innerHTML += `<button onclick="deleteCompletedTask(this)">Delete</button>`;
  const completedList = document.getElementById('completedList');
  completedList.appendChild(li);
  saveTasks();
}

function deleteTask(button) {
  if (confirm('Are you sure you want to delete this task?')) {
      const li = button.parentNode;
      const recycleBin = document.getElementById('recycleBin');
      recycleBin.appendChild(li);
      li.removeChild(button.previousSibling); // remove the complete button
      button.innerText = 'Restore';
      button.onclick = function() { restoreTask(this); };
      const deletePermanentlyButton = document.createElement('button');
      deletePermanentlyButton.innerText = 'Delete Permanently';
      deletePermanentlyButton.onclick = function() { deletePermanently(this); };
      li.appendChild(deletePermanentlyButton);
      saveTasks();
  }
}

function deleteCompletedTask(button) {
  if (confirm('Are you sure you want to delete this completed task?')) {
      const li = button.parentNode;
      li.parentNode.removeChild(li);
      saveTasks();
  }
}

function restoreTask(button) {
  const li = button.parentNode;
  const taskList = document.getElementById('taskList');
  taskList.appendChild(li);
  li.innerHTML = `<span>${li.childNodes[0].textContent}</span>
                  <button onclick="completeTask(this)">Complete</button>
                  <button onclick="deleteTask(this)">Delete</button>`;
  saveTasks();
}

function deletePermanently(button) {
  if (confirm('Are you sure you want to permanently delete this task?')) {
      const li = button.parentNode;
      li.parentNode.removeChild(li);
      saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem('tasks', document.getElementById('taskList').innerHTML);
  localStorage.setItem('completedTasks', document.getElementById('completedList').innerHTML);
  localStorage.setItem('recycleBin', document.getElementById('recycleBin').innerHTML);
}

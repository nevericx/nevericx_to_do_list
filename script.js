const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const completedList = document.getElementById('completedList');
const trashList = document.getElementById('trashList');
const tabs = document.querySelectorAll('.tab');
const lists = document.querySelectorAll('.list');

addBtn.addEventListener('click', addTask);
tabs.forEach(tab => tab.addEventListener('click', switchTab));

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  const li = createTodoItem(text);
  todoList.appendChild(li);
  taskInput.value = '';
}

function createTodoItem(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '완료';
  completeBtn.classList.add('complete-btn');
  completeBtn.addEventListener('click', () => completeTask(li, text));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '삭제';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => deleteTask(li, text));

  li.append(span, completeBtn, deleteBtn);
  return li;
}

function completeTask(li, text) {
  li.remove();
  const done = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;

  const restoreBtn = document.createElement('button');
  restoreBtn.textContent = '복원';
  restoreBtn.classList.add('complete-btn');
  restoreBtn.addEventListener('click', () => restoreTask(done, text));

  done.append(span, restoreBtn);
  completedList.appendChild(done);
}

function restoreTask(li, text) {
  li.remove();
  const restored = createTodoItem(text);
  todoList.appendChild(restored);
}

function deleteTask(li, text) {
  li.remove();
  const deleted = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;

  const restoreBtn = document.createElement('button');
  restoreBtn.textContent = '복원';
  restoreBtn.classList.add('complete-btn');
  restoreBtn.addEventListener('click', () => restoreTask(deleted, text));

  deleted.append(span, restoreBtn);
  trashList.appendChild(deleted);
}

function switchTab(e) {
  const targetTab = e.target.dataset.tab;
  tabs.forEach(tab => tab.classList.remove('active'));
  lists.forEach(list => list.classList.remove('active'));
  e.target.classList.add('active');
  document.getElementById(`${targetTab}List`).classList.add('active');
}

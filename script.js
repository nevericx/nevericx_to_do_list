const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const completedList = document.getElementById('completedList');
const trashList = document.getElementById('trashList');
const tabs = document.querySelectorAll('.tab');
const lists = document.querySelectorAll('.list');
const dateDisplay = document.getElementById('dateDisplay');
const completedContainer = document.getElementById('completedContainer');
const trashContainer = document.getElementById('trashContainer');
const emptyCompletedBtn = document.getElementById('emptyCompletedBtn');
const emptyTrashBtn = document.getElementById('emptyTrashBtn');

addBtn.addEventListener('click', addTask);
tabs.forEach(tab => tab.addEventListener('click', switchTab));
emptyCompletedBtn.addEventListener('click', emptyCompleted);
emptyTrashBtn.addEventListener('click', emptyTrash);

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  const li = createTodoItem(text);
  todoList.appendChild(li);
  taskInput.value = '';
}

function updateDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  dateDisplay.textContent = `📅 ${month}월 ${day}일`;
}

updateDate();

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
  span.classList.add('completed-text');

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
  e.target.classList.add('active');

  lists.forEach(list => list.classList.remove('active'));
  document.querySelectorAll('.list-container').forEach(c => c.classList.remove('active'));

  if (targetTab === 'todo') {
    todoList.classList.add('active');
  } else if (targetTab === 'completed') {
    completedList.classList.add('active');
    completedContainer.classList.add('active');
  } else if (targetTab === 'trash') {
    trashList.classList.add('active');
    trashContainer.classList.add('active');
  }
}

function emptyCompleted() {
  completedList.innerHTML = '';
}

function emptyTrash() {
  trashList.innerHTML = '';
}

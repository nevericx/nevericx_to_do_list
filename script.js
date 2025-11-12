const dateTitle = document.getElementById("dateTitle");
function updateDate() {
  const now = new Date();
  dateTitle.textContent = `${now.getMonth() + 1}월 ${now.getDate()}일 오늘 할 일`;
}
updateDate();
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) updateDate();
}, 60000);

const tabs = document.querySelectorAll(".tab");
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const clearTrashBtn = document.getElementById("clearTrashBtn");
const themeToggle = document.getElementById("themeToggle");

const todoList = document.getElementById("todoList");
const completedList = document.getElementById("completedList");
const trashList = document.getElementById("trashList");

let tasks = { todo: [], completed: [], trash: [] };

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("tasks");
  const savedTheme = localStorage.getItem("theme");

  if (saved) tasks = JSON.parse(saved);
  renderAll();

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    document.querySelectorAll(".list, .tab-content").forEach(el =>
      el.classList.remove("active")
    );

    if (tab.dataset.tab === "todo") {
      todoList.classList.add("active");
    } else if (tab.dataset.tab === "completed") {
      document.getElementById("completedSection").classList.add("active");
      completedList.classList.add("active");
    } else if (tab.dataset.tab === "trash") {
      document.getElementById("trashSection").classList.add("active");
      trashList.classList.add("active");
    }

    clearCompletedBtn.classList.add("hidden");
    clearTrashBtn.classList.add("hidden");
    if (tab.dataset.tab === "completed") clearCompletedBtn.classList.remove("hidden");
    if (tab.dataset.tab === "trash") clearTrashBtn.classList.remove("hidden");
  });
});

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  const task = { text };
  tasks.todo.push(task);
  saveData();
  renderAll();

  input.value = "";
  input.focus();
}

function renderAll() {
  renderList(todoList, tasks.todo, "todo");
  renderList(completedList, tasks.completed, "completed");
  renderList(trashList, tasks.trash, "trash");
}

function renderList(container, arr, mode) {
  container.innerHTML = "";

  if (arr.length === 0) {
    const emptyMsg = document.createElement("li");
    emptyMsg.className = "empty-msg";
    if (mode === "todo") emptyMsg.textContent = "📝 할 일을 추가해보세요!";
    if (mode === "completed") emptyMsg.textContent = "완료된 할 일이 아직 없어요 😴";
    if (mode === "trash") emptyMsg.textContent = "🗑 휴지통이 비어있어요";
    container.appendChild(emptyMsg);
    return;
  }

  arr.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${task.text}</span><div></div>`;
    const btnBox = li.querySelector("div");

    if (mode === "todo") {
      const completeBtn = createBtn("✔", "complete-btn", () => completeTask(index));
      const delBtn = createBtn("🗑", "delete-btn", () => moveToTrash("todo", index));
      btnBox.append(completeBtn, delBtn);
    }

    if (mode === "completed") {
      li.classList.add("completed");
      const restoreBtn = createBtn("↩", "restore-btn", () => restoreFromCompleted(index));
      const delBtn = createBtn("🗑", "delete-btn", () => moveToTrash("completed", index));
      btnBox.append(restoreBtn, delBtn);
    }

    if (mode === "trash") {
      const restoreBtn = createBtn("↩", "restore-btn", () => restoreFromTrash(index));
      const removeBtn = createBtn("✖", "delete-btn", () => deleteForever(index));
      btnBox.append(restoreBtn, removeBtn);
    }

    container.appendChild(li);
  });
}

function createBtn(text, cls, handler) {
  const b = document.createElement("button");
  b.textContent = text;
  b.className = cls;
  b.addEventListener("click", handler);
  return b;
}

function completeTask(index) {
  const [task] = tasks.todo.splice(index, 1);
  tasks.completed.push(task);
  saveData();
  renderAll();
}

function moveToTrash(type, index) {
  const [task] = tasks[type].splice(index, 1);
  tasks.trash.push(task);
  saveData();
  renderAll();
}

function restoreFromCompleted(index) {
  const [task] = tasks.completed.splice(index, 1);
  tasks.todo.push(task);
  saveData();
  renderAll();
}

function restoreFromTrash(index) {
  const [task] = tasks.trash.splice(index, 1);
  tasks.todo.push(task);
  saveData();
  renderAll();
}

function deleteForever(index) {
  tasks.trash.splice(index, 1);
  saveData();
  renderAll();
}

clearCompletedBtn.addEventListener("click", () => {
  tasks.completed = [];
  saveData();
  renderAll();
});
clearTrashBtn.addEventListener("click", () => {
  tasks.trash = [];
  saveData();
  renderAll();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

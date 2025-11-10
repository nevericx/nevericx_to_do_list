const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return alert("할 일을 입력해주세요.");

  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", () => li.remove());

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

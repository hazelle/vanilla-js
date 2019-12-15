const form = document.querySelector(".taskForm");
const inputText = document.querySelector(".addTask");
const pendingUl = document.querySelector("#ul-pending");
const finishedUl = document.querySelector("#ul-finished");

const pendingCount = document.querySelector('.pending-count');
const finishedCount = document.querySelector('.finished-count');

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

// Add task to localStorage
function addToLocalStorage(lsKey, value) {
  let currentValue = JSON.parse(localStorage.getItem(lsKey));
  const beforeLength = currentValue.length;
  currentValue.push(value);
  localStorage.setItem(lsKey, JSON.stringify(currentValue));
  return currentValue.length === beforeLength + 1;
}

// Remove task from localStorage
function removeFromLocalStorage(lsKey, value) {
  let currentValue = JSON.parse(localStorage.getItem(lsKey));
  const beforeLength = currentValue.length;
  currentValue.forEach((val, idx) => {
    if (parseInt(val.id, 10) === parseInt(value, 10)) {
      currentValue.splice(idx, 1);
    }
  });
  localStorage.setItem(lsKey, JSON.stringify(currentValue));
  return currentValue.length === beforeLength - 1;
}

// Default button form
function formButton(emoji) {
  let button = document.createElement("button");
  button.innerHTML = emoji;
  button.classList.add("button");
  return button;
}

// Make delete button
function formDeleteButton(lsKey, uniqueId) {
  let deleteButton = formButton("&#10060;");
  deleteButton.addEventListener("click", function() {
    if (removeFromLocalStorage(lsKey, uniqueId)) {
      this.parentElement.remove();
      countTasks();
    }
  });
  return deleteButton;
}

// Make finish button or back button
function formOptionButton(lsKey, uniqueId) {
  let optionButton = formButton(lsKey === PENDING_LS ? "&#9989;" : "&#9194;");
  optionButton.addEventListener("click", function() {
    if (
      removeFromLocalStorage(lsKey, uniqueId) &&
      addToList(lsKey === PENDING_LS ? FINISHED_LS : PENDING_LS, uniqueId)
    ) {
      this.parentElement.remove();
      countTasks();
    }
  });
  return optionButton;
}

function countTasks() {
    pendingCount.innerText = `(${pendingUl.childElementCount} tasks)`;
    finishedCount.innerText = `(${finishedUl.childElementCount} tasks)`;
}

// Add task to list by key
function addToList(key, id, text) {
  const lsKey = key ? key : PENDING_LS;
  const uniqueId = id ? id : new Date().getTime();
  const taskName = id
    ? text
      ? text
      : document.getElementById(
          `${uniqueId}-${lsKey === PENDING_LS ? FINISHED_LS : PENDING_LS}-span`
        ).innerText
    : inputText.value;

  const taskSpan = document.createElement("span");
  taskSpan.innerText = taskName;
  taskSpan.id = `${uniqueId}-${lsKey}-span`;

  const li = document.createElement("li");
  li.appendChild(taskSpan);
  li.appendChild(formOptionButton(lsKey, uniqueId));
  li.appendChild(formDeleteButton(lsKey, uniqueId));

  (lsKey === PENDING_LS ? pendingUl : finishedUl).appendChild(li);

  inputText.value = "";

  countTasks();

  if (!text) {
    const taskObj = { id: uniqueId, text: taskName };
    return addToLocalStorage(lsKey, taskObj);
  }
}

// Load task from localStorage value
function loadTask(lsKey) {
  const localStorageValue = localStorage.getItem(lsKey);
  if (localStorageValue && localStorageValue != null) {
    const list = JSON.parse(localStorageValue);
    list.forEach(value => {
        console.log(`value: ${JSON.stringify(value)}`)
      addToList(lsKey, value.id, value.text);
    });
  } else {
    localStorage.setItem(lsKey, JSON.stringify([]));
  }
  countTasks();
}

function init() {
  pendingUl.innerHTML = "";
  finishedUl.innerHTML = "";

  loadTask(PENDING_LS);
  loadTask(FINISHED_LS);

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (inputText.value.length > 0) {
        addToList();
    }
  });
}

init();

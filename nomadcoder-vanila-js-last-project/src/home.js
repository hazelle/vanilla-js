const IMAGE_NUMBER = 4;
const nameForm = document.querySelector(".name-form");
const nameInput = document.querySelector(".name-input");
const nameSpan = document.querySelector(".name-span");

const USERNAME_LS = "USERNAME";

function paintBackground() {
  const imageNumber = Math.floor(Math.random() * IMAGE_NUMBER) + 1;
  document.body.style.backgroundImage = `url('../images/${imageNumber}.jpg')`;
}

function setUserName(name) {
  nameInput.style.display = "none";
  nameSpan.innerHTML = `${name} !`;
}

function loadUserName() {
  const userName = localStorage.getItem(USERNAME_LS);
  if (userName) {
    setUserName(userName);
  }
}

function init() {
  console.log("homejs");
  paintBackground();

  loadUserName();

  nameForm.addEventListener("submit", function(event) {
    event.preventDefault();
    localStorage.setItem(USERNAME_LS, nameInput.value);
    setUserName(nameInput.value);
  });
}

init();

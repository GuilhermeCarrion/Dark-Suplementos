const container = document.getElementById('container');

const registerBtn = document.getElementById('register');

const loginBnt = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  container.classList.add("active");
});

loginBnt.addEventListener('click', () => {
  container.classList.remove("active");
});
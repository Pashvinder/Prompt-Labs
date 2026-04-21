// LOGIN PAGE
const form = document.getElementById("loginForm");

const username = document.getElementById("username");
const password = document.getElementById("password");

const userError = document.getElementById("userError");
const passError = document.getElementById("passError");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let valid = true;

  if (username.value.trim() === "") {
    userError.textContent = "Username cannot be empty";
    valid = false;
  } else {
    userError.textContent = "";
  }

  if (password.value.length < 6) {
    passError.textContent = "Password must be at least 6 characters";
    valid = false;
  } else {
    passError.textContent = "";
  }

  if (valid) {
    alert("Login Successful");
    window.location.href = "index.html";
  }
});


// PROMPT GENERATOR


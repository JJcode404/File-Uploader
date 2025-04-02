const divpassword = document.getElementById("matchpass");
const password_input = document.getElementById("passwordDls");
const confirmPassword_input = document.getElementById("cfrmpassord");
const error_P = document.createElement("p");
const borderred = document.querySelectorAll(".validate input");
const signUp_btn = document.querySelector('[type = "submit"]');

error_P.classList.add("error");
error_P.innerHTML = "* Passwords do not match";

function addborderRed() {
  borderred.forEach((input) => {
    input.classList.add("inputerror");
  });
}
function removeborderRed() {
  borderred.forEach((input) => {
    input.classList.remove("inputerror");
  });
}
function addGreenBoder() {
  borderred.forEach((input) => {
    input.classList.add("passswordvalid");
  });
}
function removeGreenBorder() {
  borderred.forEach((input) => {
    input.classList.remove("passswordvalid");
  });
}

function checkMatchPass() {
  const firstpass = password_input.value;
  const secondPass = confirmPassword_input.value;

  if (firstpass !== secondPass) {
    if (!divpassword.contains(error_P)) {
      divpassword.appendChild(error_P);
      addborderRed();
    }
  } else {
    if (divpassword.contains(error_P)) {
      divpassword.removeChild(error_P);
      removeborderRed();
    }
  }
}

signUp_btn.addEventListener("click", function (event) {
  checkMatchPass();
  if (password_input.value !== confirmPassword_input.value) {
    event.preventDefault();
    removeGreenBorder();
  }
});

confirmPassword_input.addEventListener("input", (event) => {
  if (password_input.value == confirmPassword_input.value) {
    addGreenBoder();
    error_P.remove();
  }
});

password_input.addEventListener("input", (event) => {
  if (password_input.value == confirmPassword_input.value) {
    addGreenBoder();
    error_P.remove();
  }
});

confirmPassword_input.addEventListener("input", (event) => {
  if (password_input.value !== confirmPassword_input.value) {
    removeGreenBorder();
  } else if (
    password_input.value == null &&
    confirmPassword_input.value == null
  ) {
    removeGreenBorder();
  }
});

password_input.addEventListener("input", (event) => {
  if (password_input.value !== confirmPassword_input.value) {
    removeGreenBorder();
  } else if (password_input.value == "" && confirmPassword_input.value == "") {
    removeGreenBorder();
    removeborderRed();
  }
});

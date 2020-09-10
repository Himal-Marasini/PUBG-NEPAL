(() => {
  let domVar, getInput, validationError, validation, inputData;

  domVar = {
    email: document.querySelector(".login__email"),
    password: document.querySelector(".login__password"),
    submit: document.querySelector(".login__submitBtn"),
    errorContainer: document.querySelector(".login__error"),
    errorText: document.querySelector(".loginError__text"),
    stateVariable: false
  };

  getInput = function () {
    return {
      email: domVar.email.value,
      password: domVar.password.value
    };
  };

  validationError = function (errorMessage) {
    domVar.errorContainer.style.display = "block";
    domVar.errorText.textContent = errorMessage;

    setTimeout(function () {
      domVar.errorContainer.style.display = "none";
    }, 2000);
  };

  validation = function () {
    let domInput = getInput();

    if (domInput.email == " " || domInput.email.length == 0) {
      validationError("Email Or Password is Incorrect");
      return;
    }
    if (domInput.password == " " || domInput.password.length == 0 || domInput.password.length < 6) {
      validationError("Email Or Password is Incorrect");
      return;
    }
    domVar.stateVariable = true;
  };

  inputData = function (data) {
    const userData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch("/login", userData);
  };

  function validationInput() {
    validation();

    if (domVar.stateVariable) {
      inputData(getInput());
      domVar.stateVariable = false;
    }
  }

  domVar.submit.addEventListener("click", validationInput);
})();

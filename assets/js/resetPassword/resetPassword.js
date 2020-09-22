(() => {
  let domVariables, getInput, validationError, validation, sendDataToServer;

  domVariables = {
    newPassword: document.getElementById("newPassword"),
    confirmPassword: document.getElementById("confirmPassword"),
    btn_submit: document.getElementById("btn-submit"),
    error_wrapper: document.querySelector(".error-wrapper"),
    error_text: document.querySelector(".error-text"),
    state: false
  };

  getInput = () => {
    return {
      newPassword: domVariables.newPassword.value,
      confirmPassword: domVariables.confirmPassword.value
    };
  };

  validationError = function (errorMessage) {
    domVariables.error_wrapper.style.display = "block";
    domVariables.error_text.textContent = errorMessage;

    setTimeout(function () {
      domVariables.error_wrapper.style.display = "none";
    }, 8000);
  };

  validation = function () {
    let domInput = getInput();

    if (
      domInput.newPassword == " " ||
      domInput.newPassword.length == 0 ||
      domInput.newPassword.length < 6
    ) {
      validationError("New password length need to be greater than 6 letters !!");
      return;
    }
    if (domInput.confirmPassword.length == 0 || domInput.confirmPassword !== domInput.newPassword) {
      validationError(`Confirm password do not match !!`);
      return;
    }
    domVariables.state = true;
  };

  sendDataToServer = async function (inputData) {
    const data = { ...inputData };
    const url = window.location.href;
    const tok_id = url.split("=");
    data.tok_id = tok_id[1];
    const res = await fetch("/user/reset-password", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();

    if (res.status !== 200) {
      domVariables.error_wrapper.style.display = "block";
      domVariables.error_text.textContent = result.message;

      setTimeout(function () {
        domVariables.error_wrapper.style.display = "none";
      }, 15000);

      throw new Error("Error");
    }

    domVariables.error_wrapper.classList = "success-wrapper";
    domVariables.error_wrapper.style.display = "block";
    domVariables.error_text.textContent = result.message;

    // Redirect the user
    setTimeout(function () {
      window.location.href = result.redirect;
    }, 1000);
  };

  domVariables.btn_submit.addEventListener("click", function (e) {
    validation();
    if (domVariables.state) {
      sendDataToServer(getInput());
      domVariables.state = false;
    }
  });
})();

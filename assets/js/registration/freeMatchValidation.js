const uiVariables = (() => {
  return {
    domVariables: {
      errorContainer: document.getElementById("registration__error"),
      errorText: document.querySelector(".registrationError__text"),
      spinner: document.querySelector(".spinner"),
      overlay: document.getElementById("overlay"),
      emailId: document.querySelector(".registrator_emailfield"),
      matchType: document.querySelector(".registrator_matchTypefield"),
      player_name: document.getElementById("player_name"),
      player_id: document.getElementById("player_id"),
      registerForm: document.getElementById("registerForm"),
      id: document.getElementById("id"),
      btn_submit: document.querySelector(".registration__submitBtn"),
      state: false
    },

    domInputValue: function () {
      return {
        emailId: uiVariables.domVariables.emailId.value,
        matchType: uiVariables.domVariables.matchType.value,
        player_name: uiVariables.domVariables.player_name.value,
        player_id: parseInt(uiVariables.domVariables.player_id.value),
        id: uiVariables.domVariables.id.value
      };
    }
  };
})();

const validation = (() => {
  const elms = ["registrator_emailId", "registrator_matchType", "player_name", "player_id", "id"];
  const userData = {};
  const domVariables = uiVariables.domVariables;

  function validationError(err) {
    domVariables.errorContainer.classList = "message__error";
    domVariables.errorContainer.style.display = "block";
    domVariables.errorText.textContent = err;
    setTimeout(function () {
      domVariables.errorContainer.style.display = "none";
    }, 5000);
  }

  function validationInputField(input, message) {
    if (input == " " || input.length == 0) {
      validationError(message);
      return false;
    } else {
      return true;
    }
  }

  return {
    validateInput: function (domVar) {
      const input = domVar;
      if (!validationInputField(input.emailId, "Please Enter the Email ID !!!")) {
        return false;
      }
      if (!validationInputField(input.player_name, "Please Enter the Player Name !!!")) {
        return false;
      }
      if (isNaN(input.player_id)) {
        validationError("Please Enter the Player Character ID !!!");
        return false;
      }

      elms.forEach((elm) => {
        userData[elm] = document.getElementById(elm).value;
      });
      uiVariables.domVariables.state = true;
    },
    userData: userData
  };
})();

const controller = ((uiCtrl, validCtrl) => {
  const domVariable = uiCtrl.domVariables;
  validation.validateInput;
  function run() {
    const inputVal = uiCtrl.domInputValue();
    validCtrl.validateInput(inputVal);

    const inputData = validCtrl.userData;

    if (domVariable.state) {
      // Show
      domVariable.overlay.style.display = "block";
      domVariable.spinner.style.display = "block";
      fetch(`/register/auth/free-match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
      }).then(async (res) => {
        const data = await res.json();

        if (res.status !== 200) {
          // Here I can show the Error Box
          // Hide
          domVariable.overlay.style.display = "none";
          domVariable.spinner.style.display = "none";

          domVariable.errorContainer.classList = "message__error";
          domVariable.errorContainer.style.display = "block";
          domVariable.errorText.textContent = data.message;

          setTimeout(function () {
            domVariable.errorContainer.style.display = "none";
          }, 5000);
          throw new Error("Error Occurred !!");
        }

        domVariable.overlay.style.display = "none";
        domVariable.spinner.style.display = "none";

        domVariable.errorContainer.classList = "message__success";
        domVariable.errorContainer.style.display = "block";
        domVariable.errorText.textContent = data.message;
        setTimeout(function () {
          domVariable.errorContainer.style.display = "none";
        }, 8000);
      });

      domVariable.emailId.value = "";
      domVariable.player_name.value = "";
      domVariable.player_id.value = "";

      // Change back the State Variable
      domVariable.state = false;
    }
  }

  domVariable.btn_submit.addEventListener("click", run);
})(uiVariables, validation);

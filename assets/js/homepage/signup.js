(() => {

    let domVar, getInput, validation, inputData;

    domVar = {
        username: document.querySelector('.signup__username'),
        email: document.querySelector('.signup__email'),
        phoneNumber: document.querySelector('.signup__phoneNumber'),
        password: document.querySelector('.signup__password'),
        confirmPassword: document.querySelector('.signup__confirmPass'),
        errorContainer: document.querySelector('.signUp__error'),
        errorText: document.querySelector('.signUperror__text'),
        submit: document.querySelector('.signup__submitBtn'),
        stateVariable: false
    };

    getInput = function () {
        return {
            username: domVar.username.value,
            email: domVar.email.value,
            phoneNumber: parseInt(domVar.phoneNumber.value),
            password: domVar.password.value,
            // confirmPassword: domVar.confirmPassword.value
        };
    };

    function validationError(errorMessage) {
        domVar.errorContainer.style.display = "block";
        domVar.errorText.textContent = errorMessage;

        setTimeout(function () {
            domVar.errorContainer.style.display = 'none';
        }, 3000);
    }

    validation = function () {
        let domInput = getInput();

        if (domInput.username == " " || domInput.username.length == 0) {
            validationError('Username Should be bigger than 4 words and Lesser than 20 words');
            return;
        }
        if (domInput.email == " " || domInput.email.length == 0) {
            validationError('Not an Valid Email ID');
            return;
        }
        if (domInput.phoneNumber == " " || domInput.phoneNumber == 0 || domInput.phoneNumber.length < 10) {
            validationError('Not an Valid Phone Number');
            return;
        }
        if (domInput.password == " " || domInput.password.length == 0 || domInput.password.length < 6) {
            validationError('Password must be bigger than 6 Characters');
            domVar.errorContainer.style.width = "330px";
            console.log('Hello from pw');
            return;
        }
        domVar.stateVariable = true;
        // if (domInput.confirmPassword == " " || domInput.confirmPassword.length == 0 || domInput.password == domInput.confirmPassword) {
        //     validationError(`Password doesn't Match`);
        //     return;
        // }
    };

    inputData = function (data) {
        const userData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch('/signup', userData);
    };

    clearField = function () {
        domVar.username.value = "";
        domVar.email.value = "";
        domVar.phoneNumber.value = "";
        domVar.password.value = "";
        domVar.confirmPassword.value = "";
    };

    function validationInput() {

        validation();

        if (domVar.stateVariable) {
            inputData(getInput());
            clearField();
            console.log('Data has been send to the server');
            domVar.stateVariable = false;
        }

    }

    domVar.submit.addEventListener('click', validationInput);

})();
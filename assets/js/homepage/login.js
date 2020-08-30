(() => {

    let domVar, getInput, validationError, validation, inputData;

    domVar = {
        email: document.getElementById("email"),
        password: document.getElementById("password"),
        submit: document.getElementById("btn-submit"),
        errorContainer: document.querySelector('.error-wrapper'),
        errorText: document.querySelector('.text-message'),
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
        }, 5000);
    };

    validation = function () {
        let domInput = getInput();

        if (domInput.email == " " || domInput.email.length == 0) {
            validationError('Please enter your email address');
            return;
        }
        if (domInput.password == " " || domInput.password.length == 0 || domInput.password.length < 6) {
            validationError('Email or Password is invalid !!');
            return;
        }
        domVar.stateVariable = true;
    };

    inputData = function (data) {
        const userData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

       fetch('/login', userData).then(async res=>{
        if (res.status !== 200) {
            const err = await res.json();
            validationError(err.message)
            throw new Error('Error Occurred !!');
        }else{
            domVar.errorContainer.classList = "success-wrapper"
            domVar.errorContainer.style.display = "block";

            domVar.errorText.textContent = "Logged In Successfully !!";
    
            setTimeout(function () {
                domVar.errorContainer.style.display = "none";
                window.location.href = "/";
            }, 1500);
        }
        }).catch(err=>{
            console.log(err)
        });
    };

    function validationInput() {
        validation();
        if (domVar.stateVariable) {
            inputData(getInput());
            domVar.stateVariable = false;
        }
    };

    domVar.submit.addEventListener('click', validationInput);

})();
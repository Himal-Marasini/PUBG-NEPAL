(() => {

    let domVar, getInput, validation, inputData;

    domVar = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phoneNumber: document.getElementById('phone_number'),
        khaltiId:document.getElementById('khalti_id'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirm_password'),
        errorContainer: document.querySelector('.error-wrapper'),
        errorText: document.querySelector('.text-message'),
        submit: document.getElementById('btn-submit'),
        stateVariable: false
    };

    getInput = function () {
        return {
            name: domVar.name.value,
            email: domVar.email.value,
            phoneNumber: domVar.phoneNumber.value,
            khaltiId:domVar.khaltiId.value,
            password: domVar.password.value,
            confirmPassword: domVar.confirmPassword.value
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

        if (domInput.name == " " || domInput.name.length <= 4) {
            validationError('Name should be bigger than 4 letters');
            return;
        }
        if (domInput.email == " " || domInput.email.length == 0) {
            validationError('Please enter a valid email id !!');
            return;
        }
        if (domInput.phoneNumber == " " || domInput.phoneNumber == 0 || domInput.phoneNumber.length < 10) {
            validationError('Please enter a valid phone number !!');
            return;
        }
        if (domInput.khaltiId == " " || domInput.khaltiId == 0 ) {
            validationError('Please enter a valid Khalti ID');
            return;
        }
        if (domInput.password == " " || domInput.password.length == 0 || domInput.password.length < 6) {
            validationError('Password must be bigger than 6 Characters');
            return;
        }
        if (domInput.confirmPassword == " " || domInput.confirmPassword.length == 0 || domInput.confirmPassword.length < 6) {
            validationError('Confirm password not matched !!');
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

        fetch('/sign-up', userData).then(async res =>{
            if(res.status !== 200){
                const err = await res.json();
                validationError(err.message);
                throw new Error('Error Occurred !!');
            }else{
                domVar.errorContainer.classList = "success-wrapper"
                domVar.errorContainer.style.display = "block";
    
                domVar.errorText.textContent = "Account has been created successfully !!";
        
                setTimeout(function () {
                    domVar.errorContainer.style.display = "none";
                    window.location.href = "/";
                }, 1500);
            };
        }).catch(err=>{
            console.log(err);
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
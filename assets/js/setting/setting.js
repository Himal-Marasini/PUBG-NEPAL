(()=>{
    let domVariables, getInput, validationError, validation, sendDataToServer;
    
    domVariables = {
        oldPassword:document.getElementById('oldPassword'),
        newPassword:document.getElementById('newPassword'),
        confirmPassword:document.getElementById('confirmPassword'),
        btn_submit:document.getElementById('btn-submit'),
        error_wrapper:document.querySelector('.error-wrapper'),
        error_text:document.querySelector('.error-text'),
        state:false
    };

    getInput = () => {
        return {
            oldPassword:domVariables.oldPassword.value,
            newPassword:domVariables.newPassword.value,
            confirmPassword:domVariables.confirmPassword.value
        }
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

        if (domInput.oldPassword == " " || domInput.oldPassword.length == 0) {
            validationError('Please enter your old password !!');
            return;
        }
        if (domInput.newPassword == " " || domInput.newPassword.length == 0 || domInput.newPassword.length < 6) {
            validationError('New password length need to be greater than 6 letters !!');
            return;
        }
        if(domInput.confirmPassword.length == 0 || domInput.confirmPassword !== domInput.newPassword){
            validationError(`Confirm password do not match !!`);
            return;
        }
        domVariables.state = true;
    };

    sendDataToServer = async function (inputData) {
        console.log(inputData)
        const res = await fetch('/user/change-password', {
            method:'Post',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(inputData)
        });
        const data = await res.json();

        if(res.status !== 200){
            domVariables.error_wrapper.style.display = 'block';
            domVariables.error_text.textContent = data.message;

            setTimeout(function(){
                domVariables.error_wrapper.style.display = 'none';
            }, 15000);

            throw new Error("Error");
        }

        domVariables.error_wrapper.classList = "success-wrapper";
        domVariables.error_wrapper.style.display = 'block';
        domVariables.error_text.textContent = data.message;

        setTimeout(()=>{
            domVariables.error_wrapper.classList = "error-wrapper";
            domVariables.error_wrapper.style.display = 'none';
        }, 6000);

        domVariables.oldPassword.value = "";
        domVariables.newPassword.value = "";
        domVariables.confirmPassword.value = "";
    };

    domVariables.btn_submit.addEventListener('click', function(e){
        validation();
        if (domVariables.state) {
            sendDataToServer(getInput());
            domVariables.state = false;
        }
    });
})();
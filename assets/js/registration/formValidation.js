const validate = (function () {

    let domVariables;

    domVariables = {
        errorContainer: document.querySelector('.registration__error'),
        errorText: document.querySelector('.registrationError__text'),
        registratorName: document.querySelector('.registrator_namefield'),
        teamName: document.querySelector('.registrator_teamNamefield'),
        phoneNumber: document.querySelector('.registrator_phonefield'),
        emailId: document.querySelector('.registrator_emailfield'),
        payReceiveId: document.querySelector('.registrator_payGatewayfield'),
        matchType: document.querySelector('.registrator_matchTypefield'),
        memberOne_name: document.getElementById('memberOne_name'),
        memberOne_charId: document.getElementById('memberOne_charId'),
        memberTwo_name: document.getElementById('memberTwo_name'),
        memberTwo_charId: document.getElementById('memberTwo_charId'),
        memberThree_name: document.getElementById('memberThree_name'),
        memberThree_charId: document.getElementById('memberThree_charId'),
        memberFour_name: document.getElementById('memberFour_name'),
        memberFour_charId: document.getElementById('memberFour_charId'),
        registerForm: document.getElementById('registerForm')
    };

    function inputValue() {

        const inputData = {
            registratorName: domVariables.registratorName.value,
            teamName: domVariables.teamName.value,
            phoneNumber: domVariables.phoneNumber.value,
            emailId: domVariables.emailId.value,
            payReceiveId: domVariables.payReceiveId.value,
            matchType: domVariables.matchType.value,
            memberOne_name: domVariables.memberOne_name.value,
            memberOne_charId: parseInt(domVariables.memberOne_charId.value),
            memberTwo_name: domVariables.memberTwo_name.value,
            memberTwo_charId: parseInt(domVariables.memberTwo_charId.value),
            memberThree_name: domVariables.memberThree_name.value,
            memberThree_charId: parseInt(domVariables.memberThree_charId.value),
            memberFour_name: domVariables.memberFour_name.value,
            memberFour_charId: parseInt(domVariables.memberFour_charId.value),
        };

        return inputData;
    }

    function validationError(err) {
        domVariables.errorContainer.style.display = 'block';
        domVariables.errorText.textContent = err;

        setTimeout(function () {
            domVariables.errorContainer.style.display = "none";
        }, 5000);
    }

    function validationInputField(input, message) {
        if (input == ' ' || input.length == 0) {
            validationError(message);
            return false;
        } else {
            return true;
        }

    }

    function validateInput() {

        const input = inputValue();

        if (!validationInputField(input.registratorName, "Please Enter the Registrator Name !!!")) {
            return false;
        }
        if (!validationInputField(input.teamName, "Please Enter the Team Name")) {
            return false;
        }
        if (!validationInputField(input.phoneNumber, "Please Enter the Phone Number")) {
            return false;
        }
        if (!validationInputField(input.emailId, "Please Enter the Email ID")) {
            return false;
        }
        if (!validationInputField(input.payReceiveId, "Please Enter the Khalti ID")) {
            return false;
        }
        if (!validationInputField(input.memberOne_name, "Please Enter the Member One Name")) {
            return false;
        }
        if (isNaN(input.memberOne_charId)) {
            validationError('Please Enter the Member One Character ID');
            return false;
        }
        if (!validationInputField(input.memberTwo_name, "Please Enter the Member Two Name")) {
            return false;
        }
        if (isNaN(input.memberTwo_charId)) {
            validationError('Please Enter the Member Two Character ID');
            return false;
        }
        if (!validationInputField(input.memberThree_name, "Please Enter the Member Three Name")) {
            return false;
        }
        if (isNaN(input.memberThree_charId)) {
            validationError('Please Enter the Member Three Character ID');
            return false;
        }
        if (!validationInputField(input.memberFour_name, "Please Enter the Member Four Name")) {
            return false;
        }
        if (isNaN(input.memberFour_charId)) {
            validationError('Please Enter the Member Four Character ID');
            return false;
        } else {
            return true;
        }
    }

    return {
        validInput: validateInput,
        validError: validationError
    };

})();
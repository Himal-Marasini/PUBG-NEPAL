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
            memberOne_charId: domVariables.memberOne_charId.value,
            memberTwo_name: domVariables.memberTwo_name.value,
            memberTwo_charId: domVariables.memberTwo_charId.value,
            memberThree_name: domVariables.memberThree_name.value,
            memberThree_charId: domVariables.memberThree_charId.value,
            memberFour_name: domVariables.memberFour_name.value,
            memberFour_charId: domVariables.memberFour_charId.value,
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

    function validateInput() {

        const input = inputValue();

        if (input.registratorName == ' ' || input.registratorName.length == 0) {
            validationError("Please Enter the Registrator Name !!!");
            return false;
        } else if (input.teamName == ' ' || input.teamName.length == 0) {
            validationError("Please Enter the Team Name !!!");
            return false;
        } else if (input.phoneNumber == ' ' || input.phoneNumber.length == 0) {
            validationError("Please Enter the Phone Number !!!");
            return false;
        } else if (input.emailId == ' ' || input.emailId.length == 0) {
            validationError("Please Enter the Email ID");
            return false;
        } else if (input.payReceiveId == ' ' || input.payReceiveId.length == 0) {
            validationError("Please Enter the Khalti ID");
            return false;
        } else if (input.memberOne_name == ' ' || input.memberOne_name.length == 0) {
            validationError("Please Enter the Member one Name");
            return false;
        } else if (input.memberOne_charId == ' ' || input.memberOne_charId.length == 0) {
            validationError("Please Enter the Member one Character ID");
            return false;
        } else if (input.memberTwo_name == ' ' || input.memberTwo_name.length == 0) {
            validationError("Please Enter the Member Two Name");
            return false;
        } else if (input.memberTwo_charId == ' ' || input.memberTwo_charId.length == 0) {
            validationError("Please Enter the Member Two Character ID");
            return false;
        } else if (input.memberThree_name == ' ' || input.memberThree_name.length == 0) {
            validationError("Please Enter the Member Three Name");
            return false;
        } else if (input.memberThree_charId == ' ' || input.memberThree_charId.length == 0) {
            validationError("Please Enter the Member Three Character ID");
            return false;
        } else if (input.memberFour_name == ' ' || input.memberFour_name.length == 0) {
            validationError("Please Enter the Member Four Name");
            return false;
        } else if (input.memberFour_charId == ' ' || input.memberFour_charId.length == 0) {
            validationError("Please Enter the Member Four Character ID");
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
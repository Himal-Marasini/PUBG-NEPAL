const uiVariables = (() => {
    return {
        domVariables: {
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
            registerForm: document.getElementById('registerForm'),
            btn_submit: document.querySelector('.registration__submitBtn'),
            state: false
        },

        domInputValue: function () {
            return {
                registratorName: uiVariables.domVariables.registratorName.value,
                teamName: uiVariables.domVariables.teamName.value,
                phoneNumber: uiVariables.domVariables.phoneNumber.value,
                emailId: uiVariables.domVariables.emailId.value,
                khaltiId: uiVariables.domVariables.payReceiveId.value,
                matchType: uiVariables.domVariables.matchType.value,
                memberOne_name: uiVariables.domVariables.memberOne_name.value,
                memberOne_charId: parseInt(uiVariables.domVariables.memberOne_charId.value),
                memberTwo_name: uiVariables.domVariables.memberTwo_name.value,
                memberTwo_charId: parseInt(uiVariables.domVariables.memberTwo_charId.value),
                memberThree_name: uiVariables.domVariables.memberThree_name.value,
                memberThree_charId: parseInt(uiVariables.domVariables.memberThree_charId.value),
                memberFour_name: uiVariables.domVariables.memberFour_name.value,
                memberFour_charId: parseInt(uiVariables.domVariables.memberFour_charId.value)
            };

        }
    };

})();

const validation = (() => {
    const elms = ['registrator_name', 'registrator_teamName', 'registrator_phoneNumber', 'registrator_emailId', 'registrator_khaltiId', 'registrator_matchType', 'memberOne_name', 'memberOne_charId', 'memberTwo_name', 'memberTwo_charId', 'memberThree_name', 'memberThree_charId', 'memberFour_name', 'memberFour_charId'];
    const userData = {};
    const domVariables = uiVariables.domVariables;

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

    return {
        validateInput: function (domVar) {

            const input = domVar;

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
            if (!validationInputField(input.khaltiId, "Please Enter the Khalti ID")) {
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
                elms.forEach(elm => {
                    userData[elm] = document.getElementById(elm).value;
                });
                uiVariables.domVariables.state = true;
            }
        },

        userData: userData
    };


})();

const controller = ((uiCtrl, validCtrl) => {
    const domVariable = uiCtrl.domVariables;

    function run() {

        const inputVal = uiCtrl.domInputValue();
        validCtrl.validateInput(inputVal);

        if (domVariable.state) {

            // This is the User Data
            const inputData = validCtrl.userData;

            // Call the Khalti Methods
            const config = {
                "publicKey": "test_public_key_9c38182de1354f35821f915a2456b8f4",
                "productIdentity": inputData.registrator_matchType,
                "productName": "PUBG NEPAL",
                "productUrl": "http://localhost:3000",
                "eventHandler": {
                    async onSuccess(payload) {
                        const data = {
                            ...payload,
                            ...inputData
                        };

                        const userData = {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data)

                        };
                        if (inputData.registrator_matchType === 'SQUAD(MOBILE)') {
                            fetch(`http://localhost:3000/register/moboplayer`, userData)
                                .then(res => {
                                    window.location = res.url;
                                }).catch(err => {
                                    console.log('error');
                                });
                        } else if (inputData.registrator_matchType === 'SQUAD(EMULATOR)') {
                            fetch(`http://localhost:3000/register/emuplayer`, userData)
                                .then(res => {
                                    window.location = res.url;
                                    console.log(window.url);
                                    console.log(res.url);
                                }).catch(err => {
                                    console.log('error');
                                });
                        }

                    },

                    onError(error) {
                        // if Error come in between payment
                        validate.validError("Some Problem has Occured. Please Try it Again");
                    },

                    onClose() {
                        // if Container is closed
                        console.log('widget is closing');
                    }
                }
            };

            const checkout = new KhaltiCheckout(config);
            checkout.show({
                amount: 20000
            });

            // Change back the State Variable
            domVariable.state = false;
        }
    }

    domVariable.btn_submit.addEventListener('click', run);

})(uiVariables, validation);
const uiVariables = (() => {
    return {
        domVariables: {
            errorContainer: document.getElementById('registration__error'),
            errorText: document.querySelector('.registrationError__text'),
            spinner: document.querySelector('.spinner'),
            overlay: document.getElementById('overlay'),
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
            id: document.getElementById('id'),
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
                memberFour_charId: parseInt(uiVariables.domVariables.memberFour_charId.value),
                id: uiVariables.domVariables.id.value
            };

        }
    };

})();

const validation = (() => {
    const elms = ['registrator_name', 'registrator_teamName', 'registrator_phoneNumber', 'registrator_emailId', 'registrator_khaltiId', 'registrator_matchType', 'memberOne_name', 'memberOne_charId', 'memberTwo_name', 'memberTwo_charId', 'memberThree_name', 'memberThree_charId', 'memberFour_name', 'memberFour_charId', 'id'];
    const userData = {};
    const domVariables = uiVariables.domVariables;

    function validationError(err) {
        domVariables.errorContainer.classList = "message__error";
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
    validation.validateInput
    function run() {

        const inputVal = uiCtrl.domInputValue();
        validCtrl.validateInput(inputVal);

        const inputData = validCtrl.userData;

        if (domVariable.state) {
            // Show
            domVariable.overlay.style.display = "block";
            domVariable.spinner.style.display = "block";
            fetch(`http://localhost:3000/register/auth`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputData)
            }).then(async res => {
                if (res.status !== 200) {
                    // Here I can show the Error Box
                    // const errorContainer = document.getElementById('registration__error');
                    // const errorText = document.querySelector('.registrationError__text');
                    const err = await res.json();
                    // Hide
                    domVariable.overlay.style.display = "none";
                    domVariable.spinner.style.display = "none";

                    domVariable.errorContainer.classList = "message__error";
                    domVariable.errorContainer.style.display = 'block';
                    domVariable.errorText.textContent = err.message;

                    setTimeout(function () {
                        domVariable.errorContainer.style.display = "none";
                    }, 5000);
                    throw new Error('Error Occurred !!')
                }
                res.json().then(data => {
                    // Hide
                    domVariable.overlay.style.display = "none";
                    domVariable.spinner.style.display = "none";
                    let amt = data.amount;
                    if (data.status) {
                        // This is the User Data
                        const inputData = validCtrl.userData;

                        // Call the Khalti Methods
                        const config = {
                            "publicKey": data.key,
                            "productIdentity": inputData.registrator_matchType,
                            "productName": "PUBG NEPAL",
                            "productUrl": "https://www.pubgmobonepal.com",
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
                                    // Show
                                    domVariable.overlay.style.display = "block";
                                    domVariable.spinner.style.display = "block";
                                    fetch(`/register`, userData)
                                        .then(async res => {
                                            if (res.status !== 200) {
                                                const err = await res.json();
                                                // Hide
                                                domVariable.overlay.style.display = "none";
                                                domVariable.spinner.style.display = "none";

                                                domVariable.errorContainer.classList = "message__error";
                                                domVariable.errorContainer.style.display = 'block';
                                                domVariable.errorText.textContent = err.message;
                                                setTimeout(function () {
                                                    domVariable.errorContainer.style.display = "none";
                                                }, 5000);
                                                throw new Error("Invalid Request")
                                            }
                                            res.json().then(data => {
                                                console.log(data);
                                                // Hide
                                                domVariable.overlay.style.display = "none";
                                                domVariable.spinner.style.display = "none";

                                                domVariable.errorContainer.classList = "message__success";
                                                domVariable.errorContainer.style.display = 'block';
                                                domVariable.errorText.textContent = data.message;
                                                setTimeout(function () {
                                                    domVariable.errorContainer.style.display = "none";
                                                }, 8000);
                                            });
                                            domVariable.registratorName.value = "";
                                            domVariable.teamName.value = "";
                                            domVariable.phoneNumber.value = "";
                                            domVariable.emailId.value = "";
                                            domVariable.payReceiveId.value = "";
                                            domVariable.memberOne_name.value = "";
                                            domVariable.memberOne_charId.value = "";
                                            domVariable.memberTwo_name.value = "";
                                            domVariable.memberTwo_charId.value = "";
                                            domVariable.memberThree_name.value = "";
                                            domVariable.memberThree_charId.value = "";
                                            domVariable.memberFour_name.value = "";
                                            domVariable.memberFour_charId.value = "";
                                        }).catch(err => {
                                            console.log(err)
                                        })
                                },
                                onError(error) {
                                    // if Error come in between payment
                                    domVariable.errorContainer.classList = "message__error";
                                    domVariable.errorContainer.style.display = 'block';
                                    domVariable.errorText.innerHTML = error.payload.detail;
                                    setTimeout(function () {
                                        domVariable.errorContainer.style.display = "none";
                                    }, 13000);
                                },
                                onClose() { }
                            }
                        };

                        const checkout = new KhaltiCheckout(config);
                        checkout.show({
                            amount: amt
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            });

            // Change back the State Variable
            domVariable.state = false;

        }
    }

    domVariable.btn_submit.addEventListener('click', run);

})(uiVariables, validation);
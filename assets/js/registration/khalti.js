const khalti = (() => {

    const validateInput = validate.validInput;
    const inputValue = validate.inputValue;

    const config = {
        // replace the publicKey with yours
        "publicKey": "test_public_key_9c38182de1354f35821f915a2456b8f4",
        "productIdentity": inputValue().matchType, // Here I can send the ID 
        "productName": "PUBG NEPAL", // This Should Be PUBG NEPAL
        "productUrl": "http://localhost:3000", // This Should Be none
        "eventHandler": {
            async onSuccess(payload) {
                // if Payment has been done Succesfully

                document.forms[0].submit();

                const userData = {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                };

                // console.log("This is the Payload", payload);
                await fetch(`http://localhost:3000/register/khalti`, userData);

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
    const btn = document.querySelector(".registration__submitBtn");

    btn.onclick = function () {
        if (validateInput()) {
            checkout.show({
                amount: 20000
            });
        }
    };
})(validate);
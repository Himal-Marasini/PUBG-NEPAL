(()=>{
    let domVariables, getInputFreeFire, getInputPubg, validationError, fetchToPubgServer, fetchToFreeFireServer,nepaliOneDollarPrice;
    let uc_value_with_amt, diamonds_value_with_amt;

    domVariables = {
        pubg_id:document.getElementById('pubg_id'),
        uc_value:document.getElementsByName('uc'),
        pubg_emailId:document.getElementById('pubg_emailId'),
        pubg_submit:document.getElementById('pubg_pay'),
        pubg_quantity_wrapper:document.getElementById('pubg-quantity--wrapper'), // PUBG QUANTITY WRAPPER
        pubg_amount_wrapper:document.getElementById('pubg-amount--wrapper'), // PUBG AMOUNT WRAPPER
        pubg_serviceCharge_wrapper: document.getElementById('pubg-serviceCharge--wrapper'), // PUBG SERVICE CHARGE WRAPPER
        pubg_total_wrapper:document.getElementById('pubg-total--wrapper'), // PUBG TOTAL WRAPPER
        pubg_error_wrapper:document.getElementById('pubg-error--wrapper'),
        pubg_error_text:document.getElementById('pubg-text--wrapper'),
        freeFire_id:document.getElementById('freeFire_id'),
        diamond_value:document.getElementsByName('diamonds'),
        freeFire_emailId:document.getElementById('freeFire_emailId'),
        freeFire_submit:document.getElementById('freeFire_pay'),
        freeFire_quantity_wrapper:document.getElementById('freeFire-quantity--wrapper'), // FreeFire QUANTITY WRAPPER
        freeFire_amount_wrapper:document.getElementById('freeFire-amount--wrapper'), // FreeFire AMOUNT WRAPPER
        freeFire_serviceCharge_wrapper: document.getElementById('freeFire-serviceCharge--wrapper'), // FreeFire SERVICE CHARGE WRAPPER
        freeFire_total_wrapper:document.getElementById('freeFire-total--wrapper'), // FreeFire TOTAL WRAPPER
        freeFire_error_wrapper:document.getElementById('freefire-error--wrapper'),
        freeFire_error_text:document.getElementById('freefire-text--wrapper'),
        main_error_wrapper:document.getElementById('main-error--wrapper'), // Main ERROR WRAPPER
        main_error_text:document.getElementById('main-text--wrapper'), // MAIN ERROR TEXT
        spinner:document.querySelector('.spinner'),
        overlay:document.getElementById('overlay'),
        state:false
    }

    window.addEventListener('load', async function(){
        try{
            const data = await fetch(`https://api.exchangeratesapi.io/latest?base=USD`,{
                method:'GET'
            });
            
            if(data.status !== 200){
                domVariables.main_error_wrapper.style.display = 'block';
                domVariables.main_error_text.innerHTML = `Sorry !! Recharge can't be done for now, Please try it again after some time. If this error keep
                occuring please contact our <a href="https://www.facebook.com/pubgmobilefornepal"
                    target="_blank">facebook</a> page.`
            }
        
            const res = await data.json();
            
            nepaliOneDollarPrice = res.rates.INR.toFixed(2) * 1.6;
            uc_value_with_amt = { 
                uc_1: {
                    quantity:"30 + 2 UC",
                    amount:(64).toFixed(2),
                    service_charge: Math.floor(64 * 0.05).toFixed(2),
                    _id:"uc_1"
                },
                uc_2: {
                    quantity:"60 + 3 UC",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 0.99).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 0.99).toFixed(2) * 0.05).toFixed(2),
                    _id:"uc_2"
                },
                uc_3:{
                    quantity:"300 + 40 UC",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 4.99).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 4.99).toFixed(2) * 0.05).toFixed(2),
                    _id:"uc_3"
                },
                uc_4:{ 
                    quantity:"600 + 90 UC",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 9.99).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 9.99).toFixed(2) * 0.05).toFixed(2),
                    _id:"uc_4"
                },
                uc_5:{
                    quantity:"1500 + 375 UC",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 24.99).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 24.99).toFixed(2) * 0.05).toFixed(2),
                    _id:"uc_5"
                },
                uc_6:{
                    quantity:"3000 + 1000 UC",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 49.99).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 49.99).toFixed(2) * 0.05).toFixed(2),
                    _id:"uc_6"
                },
                uc_7:{
                    quantity:"6000 + 2400 UC",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 99.99).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 99.99).toFixed(2) * 0.05).toFixed(2),
                    _id:"uc_7"
                },
                uc_8:{
                    quantity:"Royal Pass Upgrade Card (Season 14) + 70 UC",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 9.99).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 9.99).toFixed(2) * 0.05).toFixed(2),
                    _id:"uc_8"
                },
                uc_9: {
                    quantity:"Elite Pass Plus Upgrade Card (Season 14) + Classic Create Coupon",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 24.99).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 24.99).toFixed(2) * 0.05).toFixed(2),
                    _id:"uc_9"
                }
            };

            diamonds_value_with_amt = {
                diamonds_1: {
                    quantity:"50 Diamonds",
                    amount:64,
                    service_charge: Math.floor(64 * 0.05),
                    _id:"diamonds_1"
                },
                diamonds_2: {
                    quantity:"100 Diamonds",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 1.09).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 1.09).toFixed(2) * 0.05).toFixed(2),
                    _id:"diamonds_2"
                },
                diamonds_3:{
                    quantity:"310 Diamonds",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 3.29).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 3.29).toFixed(2) * 0.05).toFixed(2),
                    _id:"diamonds_3"
                },
                diamonds_4:{ 
                    quantity:"520 Diamonds",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 5.13).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 5.13).toFixed(2) * 0.05).toFixed(2),
                    _id:"diamonds_4"
                },
                diamonds_5:{
                    quantity:"1060 Diamonds",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 11.01).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 11.01).toFixed(2) * 0.05).toFixed(2),
                    _id:"diamonds_5"
                },
                diamonds_6:{
                    quantity:"2180 Diamonds",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 21.31).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 21.31).toFixed(2) * 0.05).toFixed(2),
                    _id:"diamonds_6"
                },
                diamonds_7:{
                    quantity:"5600 Diamonds",
                    amount:Math.floor(nepaliOneDollarPrice.toFixed(2) * 50.70).toFixed(2),
                    service_charge:Math.floor(Math.floor(nepaliOneDollarPrice.toFixed(2) * 50.70).toFixed(2) * 0.05).toFixed(2),
                    _id:"diamonds_7"
                }
            };
        }catch{
            domVariables.main_error_wrapper.style.display = 'block';
            domVariables.main_error_text.innerHTML = `Sorry !! Recharge can't be done for now, Please try it again after some time. If this error keep
            occuring please contact our <a href="https://www.facebook.com/pubgmobilefornepal"
                target="_blank">facebook</a> page`
        }
    });

    // Update the UI OF TOTAL AMOUNT (PUBG)
    domVariables.uc_value.forEach((el)=>{
        el.addEventListener('click', function(element){
            const data = uc_value_with_amt[element.target.value];
            domVariables.pubg_quantity_wrapper.textContent = data.quantity;
            domVariables.pubg_amount_wrapper.textContent = data.amount;
            domVariables.pubg_serviceCharge_wrapper.innerHTML = `${data.service_charge} <span class="table-inline--text">(Service Charge)</span>`;
            domVariables.pubg_total_wrapper.textContent = (Math.floor(data.amount) + Math.floor(data.service_charge)).toFixed(2);
        });
    });

    // Update the DIAMONDS OF TOTAL AMOUNT (DIAMONDs)
    domVariables.diamond_value.forEach((el)=>{
        el.addEventListener('click', function(element){
            const data = diamonds_value_with_amt[element.target.value];
            domVariables.freeFire_quantity_wrapper.textContent = data.quantity;
            domVariables.freeFire_amount_wrapper.textContent = data.amount;
            domVariables.freeFire_serviceCharge_wrapper.innerHTML = `${data.service_charge} <span class="table-inline--text">(Service Charge)</span>`;
            domVariables.freeFire_total_wrapper.textContent = (Math.floor(data.amount) + Math.floor(data.service_charge)).toFixed(2);
        });
    });

    getInputPubg = function () {
        let uc_value;
        let radio_array_uc = domVariables.uc_value;

        for (var i = 0; i < radio_array_uc.length; i++) {
            if (radio_array_uc[i].checked) {
             uc_value = radio_array_uc[i].value;
              break;
            }
        }

        return {
            id:domVariables.pubg_id.value,
            uc:uc_value_with_amt[uc_value],
            email:domVariables.pubg_emailId.value,
            dollarValue:nepaliOneDollarPrice
        }
    }

    getInputFreeFire = function(){
        let diamonds_value;
        let radio_array_diamonds = domVariables.diamond_value;

        for (var i = 0; i < radio_array_diamonds.length; i++) {
            if (radio_array_diamonds[i].checked) {
                diamonds_value = radio_array_diamonds[i].value;
                break;
            }
        }
       
        return {
            id:domVariables.freeFire_id.value,
            diamonds:diamonds_value_with_amt[diamonds_value],
            email:domVariables.freeFire_emailId.value,
            dollarValue:nepaliOneDollarPrice
        }
    };

    validationError = function (errorMessage, game) {

        if(game === "pubg"){
        domVariables.pubg_error_wrapper.style.display = "block";
        domVariables.pubg_error_text.textContent = errorMessage;
        setTimeout(function () {
            domVariables.pubg_error_wrapper.style.display = "none";
        }, 10000);
    }else if(game === "freefire"){
        domVariables.freeFire_error_wrapper.style.display = "block";
        domVariables.freeFire_error_text.textContent = errorMessage;
        setTimeout(function () {
            domVariables.freeFire_error_wrapper.style.display = "none";
        }, 10000);
        }
        
        
    };

    fetchToStore = function(inputData) {

    // Show Spinner
    domVariables.overlay.style.display = "block";
    domVariables.spinner.style.display = "block";
    // Do fetch request
    fetch(`/auth/store`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData)
    }).then(async res => {
        const data = await res.json();
        if(!data.status){
            // Hide the spinner
            domVariables.overlay.style.display = "none";
            domVariables.spinner.style.display = "none";

            // SHOW THE MAIN ERROR CONTAINER HERE
            domVariables.main_error_wrapper.style.display = 'block';
            domVariables.main_error_text.innerHTML = `Sorry !! Recharge can't be done for now, Please try it again after some time. If this error keep
            occuring please contact our <a href="https://www.facebook.com/pubgmobilefornepal"
                target="_blank">facebook</a> page.`;
            throw new Error('Please contact the website administrator');
        }

        let amt = data.data.amount;
        const productInfo = inputData.uc !== undefined ? inputData.uc : inputData.diamonds;
        const config = {
            "publicKey": data.data.key,
            "productIdentity": productInfo._id,
            "productName": productInfo.quantity,
            "productUrl": `https://www.pubgmobilenp.com/store`,
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
                    domVariables.overlay.style.display = "block";
                    domVariables.spinner.style.display = "block";
                    fetch(`/store`, userData)
                        .then(async res => {
                            if (res.status !== 200) {
                                // Hide the spinner
                                domVariables.overlay.style.display = "none";
                                domVariables.spinner.style.display = "none";
                                const err = await res.json();

                                // SHOW THE MAIN ERROR CONTAINER HERE
                                domVariables.main_error_wrapper.style.display = 'block';
                                domVariables.main_error_text.innerHTML = `Sorry !! Recharge can't be done for now, Please try it again after some time. If this error keep
                                occuring please contact our <a href="https://www.facebook.com/pubgmobilefornepal"
                                    target="_blank">facebook</a> page.`;
                                    throw new Error('Please contact the website administrator');
                            }
                            res.json().then(data => {
                                // Hide the spinner
                                domVariables.overlay.style.display = "none";
                                domVariables.spinner.style.display = "none";

                                // Here, I need to show the succesful message
                                if(inputData.uc !== undefined){
                                    // PUBG SUCCESSFUL
                                    domVariables.pubg_error_wrapper.classList = "success-wrapper",
                                    domVariables.pubg_error_wrapper.style.display = "block";
                                    domVariables.pubg_error_text.textContent = data.message;

                                    setTimeout(function () {
                                        domVariables.pubg_error_wrapper.classList = "error-wrapper";
                                        domVariable.pubg_error_wrapper.style.display = "none";
                                        domVariables.pubg_error_text.textContent = data.message;
                                    }, 20000);

                                    // Clear the input field value
                                    domVariables.pubg_id.value = '';
                                    domVariables.pubg_emailId.value = '';
                                    domVariables.pubg_quantity_wrapper.textContent = '';
                                    domVariables.pubg_amount_wrapper.textContent = '';
                                    domVariables.pubg_serviceCharge_wrapper.textContent = '';
                                    domVariables.pubg_total_wrapper.textContent = '';
                                }else if(inputData.diamonds !== undefined){
                                    // FreeFire SUCCESSFUL
                                    domVariables.freeFire_error_wrapper.classList = "success-wrapper",
                                    domVariables.freeFire_error_wrapper.style.display = "block";
                                    domVariables.freeFire_error_text.textContent = data.message;

                                    setTimeout(function () {
                                        domVariables.freeFire_error_wrapper.classList = "error-wrapper";
                                        domVariable.freeFire_error_wrapper.style.display = "none";
                                        domVariables.freeFire_error_text.textContent = data.message;
                                    }, 20000);

                                    // Clear the input field value
                                    domVariables.freeFire_id.value = '';
                                    domVariables.freeFire_emailId.value = '';
                                    domVariables.freeFire_quantity_wrapper.textContent = '';
                                    domVariables.freeFire_amount_wrapper.textContent = '';
                                    domVariables.freeFire_serviceCharge_wrapper.textContent = '';
                                    domVariables.freeFire_total_wrapper.textContent = '';
                                }
                            });

                        }).catch(err => {
                            // SHOW THE MAIN ERROR CONTAINER HERE
                            domVariables.main_error_wrapper.style.display = 'block';
                            domVariables.main_error_text.innerHTML = `Sorry !! Recharge can't be done for now, Please try it again after some time. If this error keep
                            occuring please contact our <a href="https://www.facebook.com/pubgmobilefornepal"
                            target="_blank">facebook</a> page.`;
                            throw new Error('Please contact the website administrator');
                        });
                },
                onError(error) {
                    // if Error come in between payment
                    if(inputData.uc !== undefined){
                    domVariables.pubg_error_wrapper.style.display = "block";
                    domVariables.pubg_error_text.textContent = error.payload.detail;
                    setTimeout(function () {
                        domVariable.pubg_error_wrapper.style.display = "none";
                    }, 20000);
                    } else if(inputData.diamonds !== undefined){
                        // FreeFire SUCCESSFUL
                        domVariables.freeFire_error_wrapper.style.display = "block";
                        domVariables.freeFire_error_text.textContent = error.payload.detail;
                        setTimeout(function () {
                            domVariable.pubg_error_wrapper.style.display = "none";
                        }, 20000);
                    }
                },
                onClose() {
                    // Hide the spinner
                    domVariables.overlay.style.display = "none";
                    domVariables.spinner.style.display = "none";
                 }
            }
        };

        const checkout = new KhaltiCheckout(config);
        checkout.show({
            amount: amt
        });
    }).catch(err => {
        // Hide the spinner
        domVariables.overlay.style.display = "none";
        domVariables.spinner.style.display = "none";
        
        // SHOW THE MAIN ERROR CONTAINER HERE
        domVariables.main_error_wrapper.style.display = 'block';
        domVariables.main_error_text.innerHTML = `Sorry !! Recharge can't be done for now, Please try it again after some time. If this error keep
        occuring please contact our <a href="https://www.facebook.com/pubgmobilefornepal"
        target="_blank">facebook</a> page.`;
        throw new Error('Please contact the website administrator');
    });
    };

    domVariables.pubg_submit.addEventListener('click', function(){
        const domInput = getInputPubg();
        
        if (domInput.id == " " || domInput.id.length == 0 || domInput.id.length < 6) {
            validationError('Please enter valid Player Id', "pubg");
            return;
        }

        if(domInput.uc === undefined){
            validationError('Please select your recharge', 'pubg');
            return;
        }

        if (domInput.email == " " || domInput.email.length == 0) {
            validationError('Please enter valid email address', "pubg");
            return;
        }

        domVariables.state = true;

        if(domVariables.state){
            fetchToStore(domInput);
            domVariables.state = false;
        }
    });

    domVariables.freeFire_submit.addEventListener('click', function(){
        const domInput = getInputFreeFire();

        if (domInput.id == " " || domInput.id.length == 0 || domInput.id.length < 6) {
            validationError('Please enter valid Player Id', 'freefire');
            return;
        }

        if(domInput.diamonds === undefined){
            validationError('Please select your recharge', 'freefire');
            return;
        }

        if (domInput.email == " " || domInput.email.length == 0) {
            validationError('Please enter valid email address', 'freefire');
            return;
        }

        domVariables.state = true;

        if(domVariables.state){
            fetchToStore(domInput)
            domVariables.state = false;
        }
    });

})();
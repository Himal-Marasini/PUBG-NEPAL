(()=>{
    let domVariables, getInputFreeFire, getInputPubg, validationError, fetchToPubgServer, fetchToFreeFireServer;
    const uc_amount = ['30 + 2', '60 + 3','300 + 40','600 + 90','1500 + 375','3000 + 1000','6000 + 2400','royal pass', 'royal pass elite']

    domVariables = {
        pubg_id:document.getElementById('pubg_id'),
        uc_value:document.getElementById(''),
        pubg_emailId:document.getElementById('pubg_emailId'),
        pubg_submit:document.getElementById('pubg_pay'),
        pubg_error_wrapper:document.getElementById('pubg-error--wrapper'),
        pubg_error_text:document.getElementById('pubg-text--wrapper'),
        freeFire_id:document.getElementById('freeFire_id'),
        diamond_value:document.getElementById(''),
        freeFire_emailId:document.getElementById('freeFire_emailId'),
        freeFire_submit:document.getElementById('freeFire_pay'),
        freeFire_error_wrapper:document.getElementById('freefire-error--wrapper'),
        freeFire_error_text:document.getElementById('freefire-text--wrapper'),
        state:false
    }

    getInputPubg = function () {
        return {
            id:domVariables.pubg_id.value,
            email:domVariables.pubg_emailId.value
        }
    }

    getInputFreeFire = function(){
        return {
            id:domVariables.freeFire_id.value,
            email:domVariables.freeFire_emailId.value
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

    fetchToPubgServer = function(data) {
    // Do fetch request
    console.log(data);
    };

    fetchToFreeFireServer = function(data) {
    // Do fetch request
    console.log(data);
    };

    domVariables.pubg_submit.addEventListener('click', function(){
        const domInput = getInputPubg();
        
        if (domInput.id == " " || domInput.id.length == 0 || domInput.id.length < 6) {
            validationError('Please enter valid Player Id', "pubg");
            return;
        }

        if (domInput.email == " " || domInput.email.length == 0) {
            validationError('Please enter valid email address', "pubg");
            return;
        }

        domVariables.state = true;

        if(domVariables.state){
            fetchToPubgServer(domInput);
            domVariables.state = false;
        }
    });

    domVariables.freeFire_submit.addEventListener('click', function(){
        const domInput = getInputFreeFire();

        if (domInput.id == " " || domInput.id.length == 0 || domInput.id.length < 6) {
            validationError('Please enter valid Player Id', 'freefire');
            return;
        }

        if (domInput.email == " " || domInput.email.length == 0) {
            validationError('Please enter valid email address', 'freefire');
            return;
        }

        domVariables.state = true;

        if(domVariables.state){
            fetchToFreeFireServer(domInput)
            domVariables.state = false;
        }
    });

})();
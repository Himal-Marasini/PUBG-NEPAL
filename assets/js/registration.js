const registratorName = document.querySelector('.registrator_namefield');
const teamName = document.querySelector('.registrator_teamNamefield');
const memberOne_name = document.getElementById('memberOne_name');
const memberOne_charId = document.getElementById('memberOne_charId');
const memberTwo_name = document.getElementById('memberTwo_name');
const memberTwo_charId = document.getElementById('memberTwo_charId');
const memberThree_name = document.getElementById('memberThree_name');
const memberThree_charId = document.getElementById('memberThree_charId');
const memberFour_name = document.getElementById('memberFour_name');
const memberFour_charId = document.getElementById('memberFour_charId');
const submit = document.querySelector('.registration__submitBtn');

submit.addEventListener('click', (e) => {
    const paymentGateway = document.querySelector('input[name="paymentGateways"]:checked');
    const inputData = {
        registratorName: registratorName.value,
        teamName: teamName.value,
        members: [{
            name: memberOne_name.value,
            characterID: parseInt(memberOne_charId.value)
        }, {
            name: memberTwo_name.value,
            characterID: parseInt(memberTwo_charId.value)
        }, {
            name: memberThree_name.value,
            characterID: parseInt(memberThree_charId.value)
        }, {
            name: memberFour_name.value,
            characterID: parseInt(memberFour_charId.value)
        }],
        paymentGateway: paymentGateway.value
    };
    console.log(inputData);
});

// const validate = (function(){

// })();
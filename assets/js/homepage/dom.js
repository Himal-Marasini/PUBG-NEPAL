const signupContainer = document.querySelector('.signup');
const loginContainer = document.querySelector('.login');
const loginClose = document.querySelector('.login__closeContainer');
const signupClose = document.querySelector('.signup__closeContainer');
const createAccount = document.querySelector('.login__createAccountContainer');
const btn = document.querySelector('.main__signUp');

btn.addEventListener('click', (e) => {
    loginContainer.style.visibility = "visible";
    loginContainer.style.transform = "translateY(145px)";
});

loginClose.addEventListener('click', (e) => {
    loginContainer.style.transform = "translateY(-480px)";
});

createAccount.addEventListener('click', () => {
    loginContainer.style.transform = "translateY(-480px)";
    // signupContainer.style.visibility = "visible";
    signupContainer.style.transform = "translateY(94px)";

});
signupClose.addEventListener('click', (e) => {
    signupContainer.style.transform = "translateY(-410px)";
});
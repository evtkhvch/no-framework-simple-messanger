const { login, pass } = document.querySelector('.sign__box.login__box');
const button = document.querySelector('.sign__submit.default-button');
button.onclick = () => {
    console.log(login.value, pass.value);
};

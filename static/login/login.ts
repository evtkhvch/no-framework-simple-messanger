const { login, pass } = <HTMLFormElement>document.querySelector('.sign__box.login__box');
const button: HTMLElement = document.querySelector('.sign__submit.default-button');

button.onclick = () => {
    console.log(login.value, pass.value);
};

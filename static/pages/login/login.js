import { template } from './login.template.js';
// @ts-ignore
const handlebars = window.Handlebars;
const templateScript = handlebars.compile(template);
const html = templateScript({});
document.body.innerHTML = html;
const { login, pass } = document.querySelector('.sign__box.login__box');
const button = document.querySelector('.sign__submit.default-button');
if (button) {
    button.onclick = () => {
        console.log(login.value, pass.value);
    };
}
//# sourceMappingURL=login.js.map
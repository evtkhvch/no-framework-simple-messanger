import { Component, Props } from '../../core/component.js';
import { template } from './login.template.js';
import { render } from '../../core/render.js';

class Login extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    render() {
        return template;
    }
}

const loginComponent = new Login({});

render('.app', loginComponent);

const { login, pass } = <HTMLFormElement>document.querySelector('.sign__box.login__box');
const button: HTMLElement | null = document.querySelector('.sign__submit.default-button');

if (button) {
    button.onclick = () => {
        console.log(login.value, pass.value);
    };
}

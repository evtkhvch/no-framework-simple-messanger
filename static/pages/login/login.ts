import { Component, Props } from '../../core/component.js';
import { render } from '../../core/render.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';

class Login extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public render(): string {
        return `<div class="sign">{{{ loginForm }}}</div>`;
    }
}

const loginComponent = new Login({
    loginForm: new LoginForm({
        button: new Button({
            name: 'Авторизоваться',
            class: 'sign__submit default-button'
        }).elementToString
    }).elementToString
});

render('.app', loginComponent);

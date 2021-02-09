import { Component, Props } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';

class LoginComponent extends Component {
    constructor(public props: Props) {
        super('div', props, 'sign');
    }

    public render(): string {
        return `{{{ loginForm }}}`;
    }
}

export const loginComponent = new LoginComponent({
    loginForm: new LoginForm({
        button: new Button({
            type: 'submit',
            name: 'Авторизоваться',
            class: 'sign__submit default-button',
        }).elementToString
    }).elementToString
});

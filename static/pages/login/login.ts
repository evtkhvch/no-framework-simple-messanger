import { Component, Props } from '../../core/component.js';
import { loginTemplate } from './login.template.js';
import { render } from '../../core/render.js';
import { Button } from '../../components/button/button.js';

class Login extends Component {
    constructor(public props: Props) {
        super('div', props, 'sign');
    }

    public componentDidMount(): void {
        Login.initForm();
    }

    private static initForm(): void {
        const { login, pass } = document.querySelector('.sign__box.login__box') as HTMLFormElement;
        const button: HTMLElement | null = document.querySelector('.sign__submit.default-button');

        if (button) {
            button.onclick = () => {
                console.log(login.value, pass.value);
            };
        }
    }

    public render(): string {
        return loginTemplate;
    }
}

const loginComponent = new Login({
    button: new Button({
        name: 'Авторизоваться',
        class: 'sign__submit default-button'
    }).render()
});

render('.app', loginComponent);

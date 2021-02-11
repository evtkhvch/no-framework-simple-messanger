import { Component, Props } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';
import { EmptyValidator, FormControl, MinLengthValidator, ValidatorComposer } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';

class LoginComponent extends Component {
    private validator: FormValidator | undefined;
    private router: Router | undefined;

    constructor(public props: Props) {
        super('div', props, 'sign');
        this.router = new Router('.app');
    }

    public componentDidMount(): void {
        const formElement: HTMLFormElement | null = document.querySelector('.sign__box.login__box');
        const formState = {
            login: new FormControl('', false, new EmptyValidator()),
            pass: new FormControl('', false, new ValidatorComposer([ new EmptyValidator(), new MinLengthValidator(8) ]))
        };

        this.validator = new FormValidator(formElement, formState);
        this.validator.initialize();

        const registrationLink: HTMLFormElement | null = document.querySelector('.login__box .sign__account');

        if (registrationLink) {
            registrationLink.onclick = () => {
                this.router?.go('/registration');
            }
        }

        if (formElement) {
            formElement.onsubmit = (event: Event) => {
                event.preventDefault();

                this.router?.go('/chat');
            }
        }
    }

    public destroy(): void {
        this.validator?.removeListeners();
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

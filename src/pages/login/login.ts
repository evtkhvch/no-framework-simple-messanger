import { Component, Props } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';
import { EmptyValidator, FormControl, MinLengthValidator, ValidatorComposer } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';

class LoginComponent extends Component {
    private validator: FormValidator | undefined;
    private registrationLink: HTMLFormElement | undefined | null;
    private formElement: HTMLFormElement | undefined | null;
    private router: Router | undefined;

    constructor(public props: Props) {
        super('div', props, 'sign');
        this.router = new Router('.app');
    }

    public componentDidMount(): void {
        this.formElement = document.querySelector('.sign__box.login__box') as HTMLFormElement;
        const formState = {
            login: new FormControl('', false, new EmptyValidator()),
            pass: new FormControl('', false, new ValidatorComposer([ new EmptyValidator(), new MinLengthValidator(8) ]))
        };

        this.validator = new FormValidator(this.formElement, formState);
        this.validator.initialize();

        this.registrationLink = document.querySelector('.login__box .sign__account') as HTMLFormElement | null;
        this.registrationLink?.addEventListener('click', this.linkCallback.bind(this));
        this.formElement?.addEventListener('submit', this.submitCallback.bind(this));
    }

    private submitCallback(event: Event): void {
        event.preventDefault();

        this.router?.go('/chat');
    }

    private linkCallback(): void {
        this.router?.go('/registration');
    }

    public destroy(): void {
        this.validator?.removeListeners();
        this.registrationLink?.removeEventListener('click', this.linkCallback.bind(this))
        this.formElement?.removeEventListener('submit', this.submitCallback.bind(this));
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

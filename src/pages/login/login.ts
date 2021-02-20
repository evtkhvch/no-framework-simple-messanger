import { Component, Props } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';
import { EmptyValidator, FormControl, FormState, ValidatorComposer } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { Router } from '../../core/router.js';
import { AuthApi } from '../../api/auth-api.js';

export class LoginComponent extends Component {
    private validator: FormGroupControl<LoginFormGroup> | undefined;
    private router: Router = new Router('.app');
    private authApi = new AuthApi();

    constructor(public props: Props) {
        super('div', props, 'sign');
    }

    public componentDidMount(): void {
        const formElement: HTMLFormElement | null = document.querySelector('.sign__box.login__box');
        const formState: LoginFormGroup = {
            login: new FormControl('', false, new EmptyValidator()),
            pass: new FormControl('', false, new ValidatorComposer([ new EmptyValidator() ]))
        };

        this.validator = new FormGroupControl(formElement, formState);
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
                const { login, pass } = this.validator?.state as LoginFormGroup;

                this.authApi.signIn(login.value, pass.value).then((res) => {
                    if (res.status === 200 || res.status === 400) {
                        this.router?.go('/chat');
                    }
                });
            }
        }
    }

    public render(): string {
        return `{{{ loginForm }}}`;
    }
}

export const loginProps = {
    loginForm: new LoginForm({
        button: new Button({
            type: 'submit',
            name: 'Авторизоваться',
            class: 'sign__submit default-button',
        }).elementToString
    }).elementToString
};

interface LoginFormGroup extends FormState {
    login: FormControl;
    pass: FormControl;
}

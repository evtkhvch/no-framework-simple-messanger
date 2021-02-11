import { Component, Props } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { RegistrationForm } from './components/registration-form/registration-form.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';

class Registration extends Component {
    private validator: FormValidator | undefined;
    private router: Router | undefined;

    constructor(public props: Props) {
        super('div', props, 'sign');
        this.router = new Router('.app');
    }

    public componentDidMount(): void {
        const formElement = document.querySelector('.sign__box.registration__box') as HTMLFormElement;
        const formState = {
            mail: new FormControl('', false, new EmptyValidator()),
            login: new FormControl('', false, new EmptyValidator()),
            userName: new FormControl('', false, new EmptyValidator()),
            surname: new FormControl('', false, new EmptyValidator()),
            phone: new FormControl('', false, new EmptyValidator()),
            pass: new FormControl('', false, new EmptyValidator()),
            passOneMoreTime: new FormControl('', false, new EmptyValidator())
        };
        this.validator = new FormValidator(formElement, formState);
        this.validator.initialize();

        const registrationLink: HTMLFormElement | null = document.querySelector('.registration__box .sign__account');

        if (registrationLink) {
            registrationLink.onclick = () => {
                this.router?.go('/login');
            };
        }

        if (formElement) {
            formElement.onsubmit = (event: Event) => {
                event.preventDefault();

                this.router?.go('/chat');
            };
        }
    }

    public destroy(): void {
        this.validator?.removeListeners();
    }

    public render(): string {
        return `{{{ registrationForm }}}`;
    }
}

export const registrationComponent = new Registration({
    registrationForm: new RegistrationForm({
        button: new Button({
            type: 'submit',
            name: 'Зарегистрироваться',
            class: 'sign__submit default-button'
        }).elementToString
    }).elementToString
});

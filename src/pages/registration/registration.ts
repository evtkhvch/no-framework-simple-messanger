import { Component, Props } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { RegistrationForm } from './components/registration-form/registration-form.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';

class Registration extends Component {
    private validator: FormValidator | undefined;
    private registrationLink: HTMLFormElement | undefined | null;

    constructor(public props: Props) {
        super('div', props, 'sign');
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

        this.registrationLink = document.querySelector('.registration__box .sign__account') as HTMLFormElement | null;
        this.registrationLink?.addEventListener('click', Registration.linkCallback.bind(this));
    }

    private static linkCallback(): void {
        const router = new Router('.app');

        router.go('/login');
    }

    public destroy(): void {
        this.validator?.removeListeners();
        this.registrationLink?.removeEventListener('click', Registration.linkCallback.bind(this))
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

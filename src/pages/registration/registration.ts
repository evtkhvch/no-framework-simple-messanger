import { Component, Props } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { RegistrationForm } from './components/registration-form/registration-form.js';
import {
    EmailValidator,
    EmptyValidator,
    FormControl,
    FormState,
    PhoneNumberValidator,
    ValidatorComposer
} from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';
import { AuthApi } from '../../api/auth-api.js';

export class RegistrationComponent extends Component {
    private validator: FormValidator<RegistrationFormGroup> | undefined;
    private router: Router | undefined;
    private authApi = new AuthApi();

    constructor(public props: Props) {
        super('div', props, 'sign');
        this.router = new Router('.app');
    }

    public componentDidMount(): void {
        const formElement = document.querySelector('.sign__box.registration__box') as HTMLFormElement;
        const formState: RegistrationFormGroup = {
            mail: new FormControl('', false, new ValidatorComposer([ new EmptyValidator(), new EmailValidator() ])),
            login: new FormControl('', false, new EmptyValidator()),
            userName: new FormControl('', false, new EmptyValidator()),
            surname: new FormControl('', false, new EmptyValidator()),
            phone: new FormControl('', false, new ValidatorComposer([ new EmptyValidator(), new PhoneNumberValidator() ])),
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
                this.signUp();
            };
        }
    }

    private async signUp(): Promise<void> {
        const data = this.validator?.state as RegistrationFormGroup;
        const res = await this.authApi.signUp({
            first_name: data.userName.value,
            second_name: data.surname.value,
            login: data.login.value,
            email: data.mail.value,
            password: data.passOneMoreTime.value,
            phone: data.phone.value
        });

        if (res.status === 200) {
            this.router?.go('/chat');
        }
    }

    public render(): string {
        return `{{{ registrationForm }}}`;
    }
}

export const registrationProps = {
    registrationForm: new RegistrationForm({
        button: new Button({
            type: 'submit',
            name: 'Зарегистрироваться',
            class: 'sign__submit default-button'
        }).elementToString
    }).elementToString
};

interface RegistrationFormGroup extends FormState {
    mail: FormControl;
    login: FormControl;
    userName: FormControl;
    surname: FormControl;
    phone: FormControl;
    pass: FormControl;
    passOneMoreTime: FormControl;
}

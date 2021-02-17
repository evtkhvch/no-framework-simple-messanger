import { Component } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { RegistrationForm } from './components/registration-form/registration-form.js';
import { EmailValidator, EmptyValidator, FormControl, PhoneNumberValidator, ValidatorComposer } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { Router } from '../../core/router.js';
import { AuthApi } from '../../api/auth-api.js';
export class RegistrationComponent extends Component {
    constructor(props) {
        super('div', props, 'sign');
        this.props = props;
        this.authApi = new AuthApi();
        this.router = new Router('.app');
    }
    componentDidMount() {
        const formElement = document.querySelector('.sign__box.registration__box');
        const formState = {
            mail: new FormControl('', false, new ValidatorComposer([new EmptyValidator(), new EmailValidator()])),
            login: new FormControl('', false, new EmptyValidator()),
            userName: new FormControl('', false, new EmptyValidator()),
            surname: new FormControl('', false, new EmptyValidator()),
            phone: new FormControl('', false, new ValidatorComposer([new EmptyValidator(), new PhoneNumberValidator()])),
            pass: new FormControl('', false, new EmptyValidator()),
            passOneMoreTime: new FormControl('', false, new EmptyValidator())
        };
        this.validator = new FormGroupControl(formElement, formState);
        this.validator.initialize();
        const registrationLink = document.querySelector('.registration__box .sign__account');
        if (registrationLink) {
            registrationLink.onclick = () => {
                var _a;
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/login');
            };
        }
        if (formElement) {
            formElement.onsubmit = (event) => {
                var _a;
                event.preventDefault();
                const data = (_a = this.validator) === null || _a === void 0 ? void 0 : _a.state;
                this.authApi.signUp({
                    first_name: data.userName.value,
                    second_name: data.surname.value,
                    login: data.login.value,
                    email: data.mail.value,
                    password: data.passOneMoreTime.value,
                    phone: data.phone.value
                }).then(() => { var _a; (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/chat'); });
            };
        }
    }
    render() {
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
//# sourceMappingURL=registration.js.map
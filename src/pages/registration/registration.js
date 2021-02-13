var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Component } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { RegistrationForm } from './components/registration-form/registration-form.js';
import { EmailValidator, EmptyValidator, FormControl, PhoneNumberValidator, ValidatorComposer } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';
import { AuthApi } from '../../api/auth-api.js';
class Registration extends Component {
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
        this.validator = new FormValidator(formElement, formState);
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
                event.preventDefault();
                this.signUp();
            };
        }
    }
    signUp() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const data = (_a = this.validator) === null || _a === void 0 ? void 0 : _a.state;
            const res = yield this.authApi.signUp({
                first_name: data.userName.value,
                second_name: data.surname.value,
                login: data.login.value,
                email: data.mail.value,
                password: data.passOneMoreTime.value,
                phone: data.phone.value
            });
            if (res.status === 200) {
                (_b = this.router) === null || _b === void 0 ? void 0 : _b.go('/chat');
            }
        });
    }
    destroy() {
        var _a;
        (_a = this.validator) === null || _a === void 0 ? void 0 : _a.removeListeners();
    }
    render() {
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
//# sourceMappingURL=registration.js.map
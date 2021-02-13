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
import { LoginForm } from './components/login-form/login-form.js';
import { EmptyValidator, FormControl, ValidatorComposer } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';
import { AuthApi } from '../../api/auth-api.js';
class LoginComponent extends Component {
    constructor(props) {
        super('div', props, 'sign');
        this.props = props;
        this.router = new Router('.app');
        this.authApi = new AuthApi();
    }
    componentDidMount() {
        const formElement = document.querySelector('.sign__box.login__box');
        const formState = {
            login: new FormControl('', false, new EmptyValidator()),
            pass: new FormControl('', false, new ValidatorComposer([new EmptyValidator()]))
        };
        this.validator = new FormValidator(formElement, formState);
        this.validator.initialize();
        const registrationLink = document.querySelector('.login__box .sign__account');
        if (registrationLink) {
            registrationLink.onclick = () => {
                var _a;
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/registration');
            };
        }
        if (formElement) {
            formElement.onsubmit = (event) => {
                event.preventDefault();
                this.signIn();
            };
        }
    }
    signIn() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { login, pass } = (_a = this.validator) === null || _a === void 0 ? void 0 : _a.state;
            const res = yield this.authApi.signIn(login.value, pass.value);
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
//# sourceMappingURL=login.js.map
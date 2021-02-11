import { Component } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';
import { EmptyValidator, FormControl, MinLengthValidator, ValidatorComposer } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';
class LoginComponent extends Component {
    constructor(props) {
        super('div', props, 'sign');
        this.props = props;
        this.router = new Router('.app');
    }
    componentDidMount() {
        var _a, _b;
        this.formElement = document.querySelector('.sign__box.login__box');
        const formState = {
            login: new FormControl('', false, new EmptyValidator()),
            pass: new FormControl('', false, new ValidatorComposer([new EmptyValidator(), new MinLengthValidator(8)]))
        };
        this.validator = new FormValidator(this.formElement, formState);
        this.validator.initialize();
        this.registrationLink = document.querySelector('.login__box .sign__account');
        (_a = this.registrationLink) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.linkCallback.bind(this));
        (_b = this.formElement) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', this.submitCallback.bind(this));
    }
    submitCallback(event) {
        var _a;
        event.preventDefault();
        (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/chat');
    }
    linkCallback() {
        var _a;
        (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/registration');
    }
    destroy() {
        var _a, _b, _c;
        (_a = this.validator) === null || _a === void 0 ? void 0 : _a.removeListeners();
        (_b = this.registrationLink) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', this.linkCallback.bind(this));
        (_c = this.formElement) === null || _c === void 0 ? void 0 : _c.removeEventListener('submit', this.submitCallback.bind(this));
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
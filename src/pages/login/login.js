import { Component } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';
import { EmptyValidator, FormControl, ValidatorComposer } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { Router } from '../../core/router.js';
import { AuthApi } from '../../api/auth-api.js';
export class LoginComponent extends Component {
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
        this.validator = new FormGroupControl(formElement, formState);
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
                var _a;
                event.preventDefault();
                const { login, pass } = (_a = this.validator) === null || _a === void 0 ? void 0 : _a.state;
                this.authApi.signIn(login.value, pass.value).then(() => { var _a; return (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/chat'); });
            };
        }
    }
    render() {
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
//# sourceMappingURL=login.js.map
import { Component } from '../../../../core/component.js';
import { EmptyValidator, FormControl, MinLengthValidator, ValidatorComposer } from '../../../../core/validator.js';
import { FormValidator } from '../../../../core/form-validator.js';
import { Router } from '../../../../core/router.js';
export class LoginForm extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    componentDidMount() {
        const formElement = document.querySelector('.sign__box.login__box');
        const formState = {
            login: new FormControl('', false, new EmptyValidator()),
            pass: new FormControl('', false, new ValidatorComposer([new EmptyValidator(), new MinLengthValidator(8)]))
        };
        this.validator = new FormValidator(formElement, formState);
        this.validator.initialize();
        this.registrationLink = document.querySelector('.sign__account');
        this.registrationLink.addEventListener('click', LoginForm.linkCallback.bind(this));
    }
    static linkCallback() {
        const router = new Router('.app');
        router.go('/registration');
    }
    destroy() {
        var _a, _b;
        (_a = this.validator) === null || _a === void 0 ? void 0 : _a.removeListeners();
        (_b = this.registrationLink) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', LoginForm.linkCallback.bind(this));
    }
    render() {
        return `
            <form class="sign__box login__box">
                <div class="sign__content">
                    <div class="sign__title">Вход</div>
                    <div class="form-item login__field">
                        <input name="login" type="text" id="login" placeholder="&nbsp;">
                        <label for="login" data-label="Логин"></label>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-item">
                        <input type="password" name="pass" id="pass" placeholder="&nbsp;">
                        <label for="pass" data-label="Пароль"></label>
                        <span class="error-message"></span>
                    </div>
                </div>
                <div class="sign__footer">
                    {{{ button }}}
                    <a class="sign__account">Нет аккаунта?</a>
                </div>
            </form>
        `;
    }
}
//# sourceMappingURL=login-form.js.map
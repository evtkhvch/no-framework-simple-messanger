import { Component } from '../../../../core/component.js';
import { EmptyValidator, FormControl, MinLengthValidator, ValidatorComposer } from '../../../../core/validator.js';
import { FormValidator } from '../../../../core/form-validator.js';
export class LoginForm extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    componentDidMount() {
        LoginForm.initForm();
    }
    static initForm() {
        const formElement = document.querySelector('.sign__box.login__box');
        const formState = {
            login: new FormControl('', new EmptyValidator()),
            pass: new FormControl('', new ValidatorComposer([new EmptyValidator(), new MinLengthValidator(8)]))
        };
        const validator = new FormValidator(formElement, formState);
        validator.initialize();
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
                    <a class="sign__account" href="../registration/registration.html">Нет аккаунта?</a>
                </div>
            </form>
        `;
    }
}
//# sourceMappingURL=login-form.js.map
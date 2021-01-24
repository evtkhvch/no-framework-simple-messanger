import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';
import { EmptyValidator, FormControl, MinLengthValidator, ValidatorComposer } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { isDisabled } from '../../core/utils.js';
class Login extends Component {
    constructor(props) {
        super('div', props, 'sign');
        this.props = props;
        this.validator = null;
        this.formState = {
            login: new FormControl('', false, new EmptyValidator()),
            pass: new FormControl('', false, new ValidatorComposer([new EmptyValidator(), new MinLengthValidator(8)]))
        };
    }
    componentDidMount() {
        const formElement = document.querySelector('.sign__box.login__box');
        this.validator = new FormValidator(formElement, this.formState);
        this.validator.initialize();
        this.initListeners();
    }
    componentDidUpdate(oldProps, newProps) {
        var _a;
        (_a = this.validator) === null || _a === void 0 ? void 0 : _a.unsubscribe(this.listen.bind(this));
        return true;
    }
    initListeners() {
        var _a;
        (_a = this.validator) === null || _a === void 0 ? void 0 : _a.listenFormState(this.listen.bind(this));
    }
    listen(state, isFormValid) {
        this.formState = state;
        this.setProps({
            loginForm: new LoginForm({
                button: new Button({
                    isDisabled: isDisabled(isFormValid),
                    type: 'submit',
                    name: 'Авторизоваться',
                    class: 'sign__submit default-button',
                }).elementToString
            }).elementToString
        });
    }
    render() {
        return `{{{ loginForm }}}`;
    }
}
const loginComponent = new Login({
    loginForm: new LoginForm({
        button: new Button({
            isDisabled: isDisabled(false),
            type: 'submit',
            name: 'Авторизоваться',
            class: 'sign__submit default-button',
        }).elementToString
    }).elementToString
});
render('.app', loginComponent);
//# sourceMappingURL=login.js.map
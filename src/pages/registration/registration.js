import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
import { Button } from '../../components/button/button.js';
import { RegistrationForm } from './components/registration-form/registration-form.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { isDisabled } from '../../core/utils.js';
class Registration extends Component {
    constructor(props) {
        super('div', props, 'sign');
        this.props = props;
        this.validator = null;
        this.formState = {
            mail: new FormControl('', false, new EmptyValidator()),
            login: new FormControl('', false, new EmptyValidator()),
            userName: new FormControl('', false, new EmptyValidator()),
            surname: new FormControl('', false, new EmptyValidator()),
            phone: new FormControl('', false, new EmptyValidator()),
            pass: new FormControl('', false, new EmptyValidator()),
            passOneMoreTime: new FormControl('', false, new EmptyValidator())
        };
    }
    componentDidMount() {
        const formElement = document.querySelector('.sign__box.registration__box');
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
            registrationForm: new RegistrationForm({
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
        return `{{{ registrationForm }}}`;
    }
}
const registrationComponent = new Registration({
    registrationForm: new RegistrationForm({
        button: new Button({
            isDisabled: isDisabled(false),
            type: 'submit',
            name: 'Зарегистрироваться',
            class: 'sign__submit default-button'
        }).elementToString
    }).elementToString
});
render('.app', registrationComponent);
//# sourceMappingURL=registration.js.map
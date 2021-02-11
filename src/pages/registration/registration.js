import { Component } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { RegistrationForm } from './components/registration-form/registration-form.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';
class Registration extends Component {
    constructor(props) {
        super('div', props, 'sign');
        this.props = props;
        this.router = new Router('.app');
    }
    componentDidMount() {
        const formElement = document.querySelector('.sign__box.registration__box');
        const formState = {
            mail: new FormControl('', false, new EmptyValidator()),
            login: new FormControl('', false, new EmptyValidator()),
            userName: new FormControl('', false, new EmptyValidator()),
            surname: new FormControl('', false, new EmptyValidator()),
            phone: new FormControl('', false, new EmptyValidator()),
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
                var _a;
                event.preventDefault();
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/chat');
            };
        }
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
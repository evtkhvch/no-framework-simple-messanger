import { Component } from '../../core/component.js';
import template from './change-pass.template.js';
import { Button } from '../../components/button/button.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';
export class ChangeProfilePassComponent extends Component {
    constructor(props) {
        super('div', props, 'profile');
        this.props = props;
        this.router = new Router('.app');
    }
    componentDidMount() {
        this.initForm();
    }
    initForm() {
        const formElement = document.querySelector('.profile__form.profile__container');
        const formState = {
            pass: new FormControl('pochta@yandex.ru', false, new EmptyValidator()),
            newPass: new FormControl('ivanivanov', false, new EmptyValidator()),
            newPassMore: new FormControl('Иван', false, new EmptyValidator()),
        };
        this.validator = new FormValidator(formElement, formState);
        this.validator.initialize();
        if (formElement) {
            formElement.onsubmit = (event) => {
                var _a;
                event.preventDefault();
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/profile');
            };
        }
        const navButton = document.querySelector('.profile__nav-button');
        if (navButton) {
            navButton.onclick = () => { var _a; (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/profile'); };
        }
    }
    render() {
        return template;
    }
}
export const changeProfilePassProps = {
    name: 'Иван',
    button: new Button({
        type: 'submit',
        class: 'profile__form-submit default-button',
        name: 'Сохранить'
    }).elementToString
};
//# sourceMappingURL=change-profile-pass.js.map
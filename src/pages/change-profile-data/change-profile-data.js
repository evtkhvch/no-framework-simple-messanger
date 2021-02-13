import { Component } from '../../core/component.js';
import template from './change-data-template.js';
import { EmailValidator, EmptyValidator, FormControl, ValidatorComposer } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { Button } from '../../components/button/button.js';
import { Router } from '../../core/router.js';
export class ChangeProfileDataComponent extends Component {
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
            mail: new FormControl('pochta@yandex.ru', false, new ValidatorComposer([new EmailValidator(), new EmptyValidator()])),
            login: new FormControl('ivanivanov', false, new EmptyValidator()),
            userName: new FormControl('Иван', false, new EmptyValidator()),
            surname: new FormControl('Иванов', false, new EmptyValidator()),
            nameInChat: new FormControl('Иван', false, new EmptyValidator()),
            phone: new FormControl('+7 (909) 967 30 30', false, new EmptyValidator()),
        };
        this.validator = new FormGroupControl(formElement, formState);
        this.validator.initialize();
        const navButton = document.querySelector('.profile__nav-button');
        if (navButton) {
            navButton.onclick = () => {
                var _a;
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/profile');
            };
        }
        if (formElement) {
            formElement.onsubmit = (event) => {
                var _a;
                event.preventDefault();
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/profile');
            };
        }
    }
    render() {
        return template;
    }
}
export const changeProfileDataProps = {
    name: 'Иван',
    button: new Button({
        type: 'submit',
        class: 'profile__form-submit default-button',
        name: 'Сохранить'
    }).elementToString
};
//# sourceMappingURL=change-profile-data.js.map
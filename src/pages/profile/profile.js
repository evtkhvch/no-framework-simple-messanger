import { Component } from '../../core/component.js';
import template from './profile.template.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';
class Profile extends Component {
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
            mail: new FormControl('pochta@yandex.ru', true, new EmptyValidator()),
            login: new FormControl('ivanivanov', true, new EmptyValidator()),
            userName: new FormControl('Иван', true, new EmptyValidator()),
            surname: new FormControl('Иванов', true, new EmptyValidator()),
            nameInChat: new FormControl('Иван', true, new EmptyValidator()),
            phone: new FormControl('+7 (909) 967 30 30', true, new EmptyValidator()),
        };
        this.validator = new FormValidator(formElement, formState);
        this.validator.initialize();
        const profileNav = document.querySelector('.profile__nav-button');
        const exit = document.querySelector('.profile__option-exit');
        const changePass = document.querySelector('.profile__option-change-pass');
        const changeData = document.querySelector('.profile__option-change-data');
        if (profileNav) {
            profileNav.onclick = () => {
                var _a;
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/chat');
            };
        }
        if (exit) {
            exit.onclick = () => {
                var _a;
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/login');
            };
        }
        if (changePass) {
            changePass.onclick = () => {
                var _a;
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/change-profile-pass');
            };
        }
        if (changeData) {
            changeData.onclick = () => {
                var _a;
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/change-profile-data');
            };
        }
    }
    destroy() {
        var _a;
        (_a = this.validator) === null || _a === void 0 ? void 0 : _a.removeListeners();
    }
    render() {
        return template;
    }
}
export const profileComponent = new Profile({ name: 'Иван' });
//# sourceMappingURL=profile.js.map
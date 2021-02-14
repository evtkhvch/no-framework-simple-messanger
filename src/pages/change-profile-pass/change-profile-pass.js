import { Component } from '../../core/component.js';
import template from './change-pass.template.js';
import { Button } from '../../components/button/button.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { Router } from '../../core/router.js';
import { UserApi } from '../../api/user-api.js';
export class ChangeProfilePassComponent extends Component {
    constructor(props) {
        super('div', props, 'profile');
        this.props = props;
        this.formElement = null;
        this.userApi = new UserApi();
        this.router = new Router('.app');
    }
    componentDidMount() {
        this.formElement = document.querySelector('.profile__form.profile__container');
        this.initListeners();
        this.initForm();
        const navButton = document.querySelector('.profile__nav-button');
        if (navButton) {
            navButton.onclick = () => { var _a; (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/profile'); };
        }
    }
    initListeners() {
        var _a;
        (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (event) => {
            var _a, _b;
            event.preventDefault();
            const old = ((_a = this.formGroup) === null || _a === void 0 ? void 0 : _a.state.pass.value) || '';
            const newPass = ((_b = this.formGroup) === null || _b === void 0 ? void 0 : _b.state.newPassMore.value) || '';
            this.userApi.changeProfilePassword(old, newPass).then(() => {
                var _a;
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/profile');
            });
        });
    }
    initForm() {
        const formState = {
            pass: new FormControl('', false, new EmptyValidator()),
            newPass: new FormControl('', false, new EmptyValidator()),
            newPassMore: new FormControl('', false, new EmptyValidator()),
        };
        this.formGroup = new FormGroupControl(this.formElement, formState);
        this.formGroup.initialize();
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
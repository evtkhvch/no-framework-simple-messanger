import { Component } from '../../core/component.js';
import template from './change-data-template.js';
import { EmailValidator, EmptyValidator, FormControl, ValidatorComposer } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { Button } from '../../components/button/button.js';
import { Router } from '../../core/router.js';
import { ACTION, store } from '../../core/store.js';
import { AuthApi } from '../../api/auth-api.js';
import { UserApi } from '../../api/user-api.js';
export class ChangeProfileDataComponent extends Component {
    constructor(props) {
        super('div', props, 'profile');
        this.props = props;
        this.router = new Router('.app');
        this.authApi = new AuthApi();
        this.userApi = new UserApi();
        this.formElement = null;
    }
    componentDidMount() {
        this.formElement = document.querySelector('.profile__form.profile__container');
        this.initListeners();
        const navButton = document.querySelector('.profile__nav-button');
        navButton === null || navButton === void 0 ? void 0 : navButton.addEventListener('click', () => { var _a; return (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/profile'); });
    }
    initListeners() {
        var _a;
        this.authApi.user().then(value => {
            store.dispatch({ type: ACTION.GET_USER, props: value });
        });
        this.subscription = store.subscribe(() => {
            const { user } = store.getState();
            this.setProps({ name: user === null || user === void 0 ? void 0 : user.display_name });
            this.setForm(user);
        });
        (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (event) => {
            var _a;
            event.preventDefault();
            const profile = getProfile((_a = this.formGroup) === null || _a === void 0 ? void 0 : _a.state);
            this.userApi.changeProfile(profile).then((res) => {
                var _a;
                store.dispatch({ type: ACTION.CHANGE_USER, props: res });
                return (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/profile');
            });
        });
    }
    setForm(userData) {
        const formState = {
            mail: new FormControl((userData === null || userData === void 0 ? void 0 : userData.email) || '', false, new ValidatorComposer([new EmailValidator(), new EmptyValidator()])),
            login: new FormControl((userData === null || userData === void 0 ? void 0 : userData.login) || '', false, new EmptyValidator()),
            userName: new FormControl((userData === null || userData === void 0 ? void 0 : userData.first_name) || '', false, new EmptyValidator()),
            surname: new FormControl((userData === null || userData === void 0 ? void 0 : userData.second_name) || '', false, new EmptyValidator()),
            nameInChat: new FormControl((userData === null || userData === void 0 ? void 0 : userData.display_name) || '', false, new EmptyValidator()),
            phone: new FormControl((userData === null || userData === void 0 ? void 0 : userData.phone) || '', false, new EmptyValidator()),
        };
        this.formGroup = new FormGroupControl(this.formElement, formState);
        this.formGroup.initialize();
    }
    destroy() {
        if (this.subscription) {
            this.subscription();
        }
    }
    render() {
        return template;
    }
}
const getProfile = (data) => {
    return {
        first_name: (data === null || data === void 0 ? void 0 : data.userName.value) || '',
        second_name: (data === null || data === void 0 ? void 0 : data.surname.value) || '',
        display_name: (data === null || data === void 0 ? void 0 : data.nameInChat.value) || '',
        login: (data === null || data === void 0 ? void 0 : data.login.value) || '',
        email: (data === null || data === void 0 ? void 0 : data.mail.value) || '',
        phone: (data === null || data === void 0 ? void 0 : data.phone.value) || ''
    };
};
export const changeProfileDataProps = {
    name: '',
    button: new Button({
        type: 'submit',
        class: 'profile__form-submit default-button',
        name: 'Сохранить'
    }).elementToString
};
//# sourceMappingURL=change-profile-data.js.map
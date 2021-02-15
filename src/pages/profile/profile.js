import { Component } from '../../core/component.js';
import template from './profile.template.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { Router } from '../../core/router.js';
import { AuthApi } from '../../api/auth-api.js';
import { ACTION, store } from '../../core/store.js';
export class ProfileComponent extends Component {
    constructor(props) {
        super('div', props, 'profile');
        this.props = props;
        this.router = new Router('.app');
        this.authApi = new AuthApi();
    }
    componentDidMount() {
        this.initListeners();
        const profileNav = document.querySelector('.profile__nav-button');
        const exit = document.querySelector('.profile__option-exit');
        const changePass = document.querySelector('.profile__option-change-pass');
        const changeData = document.querySelector('.profile__option-change-data');
        profileNav === null || profileNav === void 0 ? void 0 : profileNav.addEventListener('click', () => { var _a; return (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/chat'); });
        changePass === null || changePass === void 0 ? void 0 : changePass.addEventListener('click', () => { var _a; return (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/change-profile-pass'); });
        changeData === null || changeData === void 0 ? void 0 : changeData.addEventListener('click', () => { var _a; return (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/change-profile-data'); });
        exit === null || exit === void 0 ? void 0 : exit.addEventListener('click', () => this.authApi.logout().then(() => { var _a; (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/login'); }));
    }
    setForm(userData) {
        const formElement = document.querySelector('.profile__form.profile__container');
        const formState = {
            mail: new FormControl(userData.email || '', true, new EmptyValidator()),
            login: new FormControl(userData.login || '', true, new EmptyValidator()),
            userName: new FormControl(userData.first_name || '', true, new EmptyValidator()),
            surname: new FormControl(userData.second_name || '', true, new EmptyValidator()),
            nameInChat: new FormControl(userData.display_name || '', true, new EmptyValidator()),
            phone: new FormControl(userData.phone || '', true, new EmptyValidator()),
        };
        this.formGroup = new FormGroupControl(formElement, formState);
        this.formGroup.initialize();
    }
    initListeners() {
        this.authApi.user().then(value => { store.dispatch({ type: ACTION.SET_USER, props: value }); });
        this.subscription = store.subscribe(() => {
            const { user } = store.getState();
            if (user) {
                this.setProps({ name: user === null || user === void 0 ? void 0 : user.display_name, avatar: `https://ya-praktikum.tech${user === null || user === void 0 ? void 0 : user.avatar}` });
                this.setForm(user);
            }
        });
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
export const profileProps = { name: '', avatar: '' };
//# sourceMappingURL=profile.js.map
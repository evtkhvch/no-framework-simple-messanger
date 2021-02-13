var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Component } from '../../core/component.js';
import template from './profile.template.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';
import { AuthApi } from '../../api/auth-api.js';
export class ProfileComponent extends Component {
    constructor(props) {
        super('div', props, 'profile');
        this.props = props;
        this.authApi = new AuthApi();
        this.router = new Router('.app');
    }
    componentDidMount() {
        this.initForm();
    }
    initForm() {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this.authApi.user();
            const formElement = document.querySelector('.profile__form.profile__container');
            const formState = {
                mail: new FormControl(userData.email, true, new EmptyValidator()),
                login: new FormControl(userData.login, true, new EmptyValidator()),
                userName: new FormControl(userData.first_name, true, new EmptyValidator()),
                surname: new FormControl(userData.second_name, true, new EmptyValidator()),
                nameInChat: new FormControl(userData.display_name, true, new EmptyValidator()),
                phone: new FormControl(userData.phone, true, new EmptyValidator()),
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
                    this.logout();
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
        });
    }
    logout() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.authApi.logout();
            if (res.status === 200) {
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/login');
            }
        });
    }
    render() {
        return template;
    }
}
export const profileProps = { name: 'Иван' };
//# sourceMappingURL=profile.js.map
import { Component, Props } from '../../core/component.js';
import template from './profile.template.js';
import { EmptyValidator, FormControl, FormState } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';
import { AuthApi } from '../../api/auth-api.js';

export class ProfileComponent extends Component {
    private validator: FormValidator<ProfileGroup> | undefined;
    private router: Router | undefined;
    private authApi = new AuthApi();

    constructor(public props: Props) {
        super('div', props, 'profile');
        this.router = new Router('.app');
    }

    public componentDidMount(): void {
        this.initForm();
    }

    private async initForm(): Promise<void> {
        const userData = await this.authApi.user();

        const formElement: HTMLFormElement | null = document.querySelector('.profile__form.profile__container');
        const formState: ProfileGroup = {
            mail: new FormControl(userData.email, true, new EmptyValidator()),
            login: new FormControl(userData.login, true, new EmptyValidator()),
            userName: new FormControl(userData.first_name, true, new EmptyValidator()),
            surname: new FormControl(userData.second_name, true, new EmptyValidator()),
            nameInChat: new FormControl(userData.display_name, true, new EmptyValidator()),
            phone: new FormControl(userData.phone, true, new EmptyValidator()),
        };
        this.validator = new FormValidator(formElement, formState);

        this.validator.initialize();

        const profileNav: HTMLFormElement | null = document.querySelector('.profile__nav-button');
        const exit: HTMLFormElement | null = document.querySelector('.profile__option-exit');
        const changePass: HTMLFormElement | null = document.querySelector('.profile__option-change-pass');
        const changeData: HTMLFormElement | null = document.querySelector('.profile__option-change-data');

        if (profileNav) {
            profileNav.onclick = () => {
                this.router?.go('/chat');
            };
        }

        if (exit) {
            exit.onclick = () => {
                this.logout();
            };
        }

        if (changePass) {
            changePass.onclick = () => {
                this.router?.go('/change-profile-pass');
            };
        }

        if (changeData) {
            changeData.onclick = () => {
                this.router?.go('/change-profile-data');
            };
        }
    }

    private async logout(): Promise<void> {
        const res = await this.authApi.logout();

        if (res.status === 200) {
            this.router?.go('/login');
        }
    }

    public render(): string {
        return template;
    }
}

export const profileProps = { name: 'Иван' };

interface ProfileGroup extends FormState {
    mail: FormControl;
    login: FormControl;
    userName: FormControl;
    surname: FormControl;
    nameInChat: FormControl;
    phone: FormControl;
}

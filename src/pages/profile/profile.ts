import { Component, Props } from '../../core/component.js';
import template from './profile.template.js';
import { EmptyValidator, FormControl, FormState } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';
import { AuthApi } from '../../api/auth-api.js';

class Profile extends Component {
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

    private initForm(): void {
        const formElement: HTMLFormElement | null = document.querySelector('.profile__form.profile__container');
        const formState: ProfileGroup = {
            mail: new FormControl('pochta@yandex.ru', true, new EmptyValidator()),
            login: new FormControl('ivanivanov', true, new EmptyValidator()),
            userName: new FormControl('Иван', true, new EmptyValidator()),
            surname: new FormControl('Иванов', true, new EmptyValidator()),
            nameInChat: new FormControl('Иван', true, new EmptyValidator()),
            phone: new FormControl('+7 (909) 967 30 30', true, new EmptyValidator()),
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

export const profileComponent = new Profile({ name: 'Иван' });

interface ProfileGroup extends FormState {
    mail: FormControl;
    login: FormControl;
    userName: FormControl;
    surname: FormControl;
    nameInChat: FormControl;
    phone: FormControl;
}

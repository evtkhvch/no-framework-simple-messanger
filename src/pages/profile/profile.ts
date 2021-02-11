import { Component, Props } from '../../core/component.js';
import template from './profile.template.js';
import { EmptyValidator, FormControl, FormState } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';

class Profile extends Component {
    private validator: FormValidator | undefined;
    private router: Router | undefined;

    constructor(public props: Props) {
        super('div', props, 'profile');
        this.router = new Router('.app');
    }

    public componentDidMount(): void {
        this.initForm();
    }

    private initForm(): void {
        const formElement: HTMLFormElement | null = document.querySelector('.profile__form.profile__container');
        const formState: FormState = {
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
                this.router?.go('/login');
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

    public destroy(): void {
        this.validator?.removeListeners();
    }

    public render(): string {
        return template;
    }
}

export const profileComponent = new Profile({ name: 'Иван' });

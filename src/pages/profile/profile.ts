import { Component, Props } from '../../core/component.js';
import template from './profile.template.js';
import { EmptyValidator, FormControl, FormState } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { AuthApi } from '../../api/auth-api.js';
import { store } from '../../store/store.js';
import { ACTION } from '../../store/reducer.js';
import { router } from '../../index.js';
import { User } from '../../interfaces/user.js';

class ProfileComponent extends Component {
    private formGroup: FormGroupControl<ProfileGroup> | undefined;
    private authApi = new AuthApi();
    private subscription: (() => void) | undefined;

    constructor(public props: Props) {
        super('div', props, 'profile');
    }

    public componentDidMount(): void {
        this.initListeners();

        const profileNav: HTMLFormElement | null = document.querySelector('.profile__nav-button');
        const exit: HTMLFormElement | null = document.querySelector('.profile__option-exit');
        const changePass: HTMLFormElement | null = document.querySelector('.profile__option-change-pass');
        const changeData: HTMLFormElement | null = document.querySelector('.profile__option-change-data');

        profileNav?.addEventListener('click', () => router.go('/chat'));
        changePass?.addEventListener('click', () => router.go('/change-profile-pass'));
        changeData?.addEventListener('click', () => router.go('/change-profile-data'));
        exit?.addEventListener('click', () => this.authApi.logout()
            .then((res) => {
                if (res.status === 200) {
                    router.go('/login');
                } else {
                    throw new Error(res.response);
                }
            })
            .catch((err) => console.error(err))
        );
    }

    private setForm(userData: User): void {
        const formElement: HTMLFormElement | null = document.querySelector('.profile__form.profile__container');
        const formState: ProfileGroup = {
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

    private initListeners(): void {
        this.authApi.user().then(res => {
            if (res.status === 200) {
                store.dispatch({ type: ACTION.SET_USER, props: JSON.parse(res.response) });
            } else {
                throw new Error(res.response);
            }
        }).catch((err) => console.error(err));

        this.subscription = store.subscribe(() => {
            const { user } = store.getState();

            if (user) {
                this.setProps({ name: user?.display_name, avatar: `https://ya-praktikum.tech${user?.avatar}` });
                this.setForm(user);
            }
        });
    }

    public destroy() {
        if (this.subscription) {
            this.subscription();
        }
    }

    public render(): string {
        return template;
    }
}

export const profileComponent = new ProfileComponent({ name: '', avatar: '' });

interface ProfileGroup extends FormState {
    mail: FormControl;
    login: FormControl;
    userName: FormControl;
    surname: FormControl;
    nameInChat: FormControl;
    phone: FormControl;
}

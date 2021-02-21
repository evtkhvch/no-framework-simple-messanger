import { Component, Props } from '../../core/component.js';
import template from './change-data-template.js';
import { EmailValidator, EmptyValidator, FormControl, ValidatorComposer } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { Button } from '../../components/button/button.js';
import { AuthApi, User } from '../../api/auth-api.js';
import { UserApi } from '../../api/user-api.js';
import { ACTION } from '../../store/reducer.js';
import { store } from '../../store/store.js';
import { getProfile } from './core/utils.js';
import { ChangeProfileGroup } from './core/interfaces.js';
import { router } from '../../index.js';

class ChangeProfileDataComponent extends Component {
    private formGroup: FormGroupControl<ChangeProfileGroup> | undefined;
    private authApi = new AuthApi();
    private userApi = new UserApi();
    private formElement: HTMLElement | null = null;
    private subscription: (() => void) | undefined;

    constructor(public props: Props) {
        super('div', props, 'profile');
    }

    public componentDidMount(): void {
        this.formElement = document.querySelector('.profile__form.profile__container');
        this.initListeners();

        const navButton: HTMLElement | null = document.querySelector('.profile__nav-button');
        const input: HTMLInputElement | null = document.querySelector('.profile__change-img');

        input?.addEventListener('change', () => {
            const selectedFile = input.files ? input?.files[0] : null;

            if (selectedFile) {
                let formData = new FormData();
                formData.set('avatar', selectedFile);

                this.userApi.changeProfileAvatar(formData).then(res => {
                    store.dispatch({ type: ACTION.SET_USER, props: res });
                }).catch((err) => console.error(err));
            }
        });

        navButton?.addEventListener('click', () => router?.go('/profile'));
    }

    private initListeners(): void {
        this.authApi.user().then(value => {
            store.dispatch({ type: ACTION.SET_USER, props: value });
        });

        this.subscription = store.subscribe(() => {
            const { user } = store.getState();
            this.setProps({ name: user?.display_name, avatar: `https://ya-praktikum.tech${user?.avatar}` });
            this.setForm(user);
        });

        this.formElement?.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            const profile = getProfile(this.formGroup?.state);

            this.userApi.changeProfile(profile).then((res) => {
                store.dispatch({ type: ACTION.SET_USER, props: res });

                router.go('/profile');
            });
        });
    }

    private setForm(userData: User | null): void {
        const formState = {
            mail: new FormControl(userData?.email || '', false, new ValidatorComposer([ new EmailValidator(), new EmptyValidator() ])),
            login: new FormControl(userData?.login || '', false, new EmptyValidator()),
            userName: new FormControl(userData?.first_name || '', false, new EmptyValidator()),
            surname: new FormControl(userData?.second_name || '', false, new EmptyValidator()),
            nameInChat: new FormControl(userData?.display_name || '', false, new EmptyValidator()),
            phone: new FormControl(userData?.phone || '', false, new EmptyValidator()),
        };
        this.formGroup = new FormGroupControl(this.formElement, formState);

        this.formGroup.initialize();
    }

    public destroy(): void {
        if (this.subscription) {
            this.subscription();
        }
    }

    public render(): string {
        return template;
    }
}

export const changeProfileDataComponent = new ChangeProfileDataComponent({
    avatar: '',
    name: '',
    button: new Button({
        type: 'submit',
        class: 'profile__form-submit default-button',
        name: 'Сохранить'
    })
});

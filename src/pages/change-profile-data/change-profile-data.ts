import { Component, Props } from '../../core/component.js';
import template from './change-data-template.js';
import { EmailValidator, EmptyValidator, FormControl, FormState, ValidatorComposer } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { Button } from '../../components/button/button.js';
import { Router } from '../../core/router.js';
import { ACTION, store } from '../../core/store.js';
import { AuthApi, User } from '../../api/auth-api.js';
import { UserApi } from '../../api/user-api.js';

export class ChangeProfileDataComponent extends Component {
    private formGroup: FormGroupControl<ChangeProfileGroup> | undefined;
    private router: Router = new Router('.app');
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
        navButton?.addEventListener('click', () => this.router?.go('/profile'));
    }

    private initListeners(): void {
        this.authApi.user().then(value => {
            store.dispatch({ type: ACTION.GET_USER, props: value });
        });

        this.subscription = store.subscribe(() => {
            const { user } = store.getState();
            this.setProps({ name: user?.display_name });
            this.setForm(user);
        });

        this.formElement?.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            const profile = getProfile(this.formGroup?.state);

            this.userApi.changeProfile(profile).then((res) => {
                store.dispatch({ type: ACTION.CHANGE_USER, props: res });

                return this.router?.go('/profile');
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

const getProfile = (data: ChangeProfileGroup | undefined) => {
    return {
        first_name: data?.userName.value || '',
        second_name: data?.surname.value || '',
        display_name: data?.nameInChat.value || '',
        login: data?.login.value || '',
        email: data?.mail.value || '',
        phone: data?.phone.value || ''
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

interface ChangeProfileGroup extends FormState {
    mail: FormControl;
    login: FormControl;
    userName: FormControl;
    surname: FormControl;
    nameInChat: FormControl;
    phone: FormControl;
}

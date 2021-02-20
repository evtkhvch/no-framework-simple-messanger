import { Component, Props } from '../../core/component.js';
import template from './change-pass.template.js';
import { Button } from '../../components/button/button.js';
import { EmptyValidator, FormControl, FormState } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { Router } from '../../core/router.js';
import { UserApi } from '../../api/user-api.js';
import { ACTION, store } from '../../core/store.js';
import { AuthApi } from '../../api/auth-api.js';

class ChangeProfilePassComponent extends Component {
    private formGroup: FormGroupControl<ChangeProfileGroup> | undefined;
    private router: Router | undefined;
    private formElement: HTMLElement | null = null;
    private userApi = new UserApi();
    private authApi = new AuthApi();
    private subscription: (() => void) | undefined;

    constructor(public props: Props) {
        super('div', props, 'profile');
        this.router = new Router('.app');
    }

    public componentDidMount(): void {
        this.authApi.user().then(value => {
            store.dispatch({ type: ACTION.SET_USER, props: value });
        });

        this.subscription = store.subscribe(() => {
            const { user } = store.getState();

            this.setProps({ name: user?.display_name, avatar: `https://ya-praktikum.tech${user?.avatar}` });
        });

        this.formElement = document.querySelector('.profile__form.profile__container');
        this.initListeners();
        this.initForm();

        const navButton: HTMLElement | null = document.querySelector('.profile__nav-button');

        if (navButton) {
            navButton.onclick = () => { this.router?.go('/profile'); }
        }
    }

    private initListeners(): void {
        this.formElement?.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            const old = this.formGroup?.state.pass.value || '';
            const newPass = this.formGroup?.state.newPassMore.value || '';

            this.userApi.changeProfilePassword(old, newPass).then(() => {
                this.router?.go('/profile');
            });
        });
    }

    private initForm(): void {
        const formState: ChangeProfileGroup = {
            pass: new FormControl('', false, new EmptyValidator()),
            newPass: new FormControl('', false, new EmptyValidator()),
            newPassMore: new FormControl('', false, new EmptyValidator()),
        };
        this.formGroup = new FormGroupControl(this.formElement, formState);

        this.formGroup.initialize();
    }

    public render(): string {
        return template;
    }
}

export const changeProfilePassComponent = new ChangeProfilePassComponent({
    name: 'Иван',
    button: new Button({
        type: 'submit',
        class: 'profile__form-submit default-button',
        name: 'Сохранить'
    })
});

interface ChangeProfileGroup extends FormState {
    pass: FormControl;
    newPass: FormControl;
    newPassMore: FormControl;
}

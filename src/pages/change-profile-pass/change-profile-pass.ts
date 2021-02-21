import { Component, Props } from '../../core/component.js';
import template from './change-pass.template.js';
import { Button } from '../../components/button/button.js';
import { EmptyValidator, FormControl, FormState } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { store } from '../../store/store.js';
import { ACTION } from '../../store/reducer.js';
import { router } from '../../index.js';
import { authApi } from '../../api/auth-api.js';
import { userApi } from '../../api/user-api.js';

class ChangeProfilePassComponent extends Component {
    private formGroup: FormGroupControl<ChangeProfileGroup> | undefined;
    private formElement: HTMLElement | null = null;
    private subscription: (() => void) | undefined;

    constructor(public props: Props) {
        super('div', props, 'profile');
    }

    public componentDidMount(): void {
        authApi.user().then(res => {
            if (res.status === 200) {
                store.dispatch({ type: ACTION.SET_USER, props: JSON.parse(res.response) });
            } else {
                throw new Error(res.response)
            }
        }).catch((err) => console.error(err));

        this.subscription = store.subscribe(() => {
            const { user } = store.getState();

            this.setProps({ name: user?.display_name, avatar: `https://ya-praktikum.tech${user?.avatar}` });
        });

        this.formElement = document.querySelector('.profile__form.profile__container');
        this.initListeners();
        this.initForm();

        const navButton: HTMLElement | null = document.querySelector('.profile__nav-button');

        if (navButton) {
            navButton.onclick = () => { router?.go('/profile'); }
        }
    }

    private initListeners(): void {
        this.formElement?.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            const old = this.formGroup?.state.pass.value || '';
            const newPass = this.formGroup?.state.newPassMore.value || '';

            userApi.changeProfilePassword(old, newPass).then((res) => {
                if (res.status === 200) {
                    router.go('/profile');
                } else {
                    throw new Error(res.response)
                }
            }).catch((err) => console.error(err));
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

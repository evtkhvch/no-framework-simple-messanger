import { Component, Props } from '../../core/component.js';
import template from './change-pass.template.js';
import { Button } from '../../components/button/button.js';
import { EmptyValidator, FormControl, FormState } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';

class ChangeProfilePass extends Component {
    private validator: FormValidator<ChangeProfileGroup> | undefined;
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
        const formState: ChangeProfileGroup = {
            pass: new FormControl('pochta@yandex.ru', false, new EmptyValidator()),
            newPass: new FormControl('ivanivanov', false, new EmptyValidator()),
            newPassMore: new FormControl('Иван', false, new EmptyValidator()),
        };
        this.validator = new FormValidator(formElement, formState);

        this.validator.initialize();

        if (formElement) {
            formElement.onsubmit = (event: Event) => {
                event.preventDefault();
                this.router?.go('/profile');
            }
        }

        const navButton: HTMLElement | null = document.querySelector('.profile__nav-button');

        if (navButton) {
            navButton.onclick = () => { this.router?.go('/profile'); }
        }
    }

    public render(): string {
        return template;
    }
}

export const changeProfilePassComponent = new ChangeProfilePass({
    name: 'Иван',
    button: new Button({
        type: 'submit',
        class: 'profile__form-submit default-button',
        name: 'Сохранить'
    }).elementToString
});

interface ChangeProfileGroup extends FormState {
    pass: FormControl;
    newPass: FormControl;
    newPassMore: FormControl;
}

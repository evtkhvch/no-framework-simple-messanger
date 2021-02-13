import { Component, Props } from '../../core/component.js';
import template from './change-data-template.js';
import { EmailValidator, EmptyValidator, FormControl, FormState, ValidatorComposer } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Button } from '../../components/button/button.js';
import { Router } from '../../core/router.js';

class ChangeProfileData extends Component {
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
        const formElement: HTMLElement | null = document.querySelector('.profile__form.profile__container');
        const formState: ChangeProfileGroup = {
            mail: new FormControl('pochta@yandex.ru', false, new ValidatorComposer([ new EmailValidator(), new EmptyValidator() ])),
            login: new FormControl('ivanivanov', false, new EmptyValidator()),
            userName: new FormControl('Иван', false, new EmptyValidator()),
            surname: new FormControl('Иванов', false, new EmptyValidator()),
            nameInChat: new FormControl('Иван', false, new EmptyValidator()),
            phone: new FormControl('+7 (909) 967 30 30', false, new EmptyValidator()),
        };
        this.validator = new FormValidator(formElement, formState);

        this.validator.initialize();

        const navButton: HTMLElement | null = document.querySelector('.profile__nav-button');

        if (navButton) {
            navButton.onclick = () => {
                this.router?.go('/profile');
            }
        }

        if (formElement) {
            formElement.onsubmit = (event: Event) => {
              event.preventDefault();
              this.router?.go('/profile');
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

export const changeProfileDataComponent = new ChangeProfileData({
    name: 'Иван',
    button: new Button({
        type: 'submit',
        class: 'profile__form-submit default-button',
        name: 'Сохранить'
    }).elementToString
});

interface ChangeProfileGroup extends FormState {
    mail: FormControl;
    login: FormControl;
    userName: FormControl;
    surname: FormControl;
    nameInChat: FormControl;
    phone: FormControl;
}

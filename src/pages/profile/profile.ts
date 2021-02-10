import { Component, Props } from '../../core/component.js';
import template from './profile.template.js';
import { EmptyValidator, FormControl, FormState } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';

class Profile extends Component {
    constructor(public props: Props) {
        super('div', props, 'profile');
    }

    public componentDidMount(): void {
        Profile.initForm();
    }

    private static initForm(): void {
        const formElement = document.querySelector('.profile__form.profile__container') as HTMLFormElement;
        const formState: FormState = {
            mail: new FormControl('pochta@yandex.ru', true, new EmptyValidator()),
            login: new FormControl('ivanivanov', true, new EmptyValidator()),
            userName: new FormControl('Иван', true, new EmptyValidator()),
            surname: new FormControl('Иванов', true, new EmptyValidator()),
            nameInChat: new FormControl('Иван', true, new EmptyValidator()),
            phone: new FormControl('+7 (909) 967 30 30', true, new EmptyValidator()),
        };
        const validator = new FormValidator(formElement, formState);

        validator.initialize();
    }

    public render(): string {
        return template;
    }
}

export const profileComponent = new Profile({ name: 'Иван' });

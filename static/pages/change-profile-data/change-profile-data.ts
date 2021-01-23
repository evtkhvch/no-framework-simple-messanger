import { Component, Props } from '../../core/component.js';
import { render } from '../../core/render.js';
import template from './change-data-template.js';
import { EmptyValidator, FormControl, FormState } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Button } from '../../components/button/button.js';

class ChangeProfileData extends Component {
    constructor(public props: Props) {
        super('div', props, 'profile');
    }

    public componentDidMount(): void {
        ChangeProfileData.initForm();
    }

    private static initForm(): void {
        const formElement = document.querySelector('.profile__form.profile__container') as HTMLFormElement;
        const formState: FormState = {
            mail: new FormControl('pochta@yandex.ru', false, new EmptyValidator()),
            login: new FormControl('ivanivanov', false, new EmptyValidator()),
            userName: new FormControl('Иван', false, new EmptyValidator()),
            surname: new FormControl('Иванов', false, new EmptyValidator()),
            nameInChat: new FormControl('Иван', false, new EmptyValidator()),
            phone: new FormControl('+7 (909) 967 30 30', false, new EmptyValidator()),
        };
        const validator = new FormValidator(formElement, formState);

        validator.initialize();
    }

    public render(): string {
        return template;
    }
}

const changeProfileDataComponent = new ChangeProfileData({
    name: 'Иван',
    button: new Button({
        type: 'submit',
        class: 'profile__form-submit default-button',
        name: 'Сохранить'
    }).elementToString
});

render('.app', changeProfileDataComponent);

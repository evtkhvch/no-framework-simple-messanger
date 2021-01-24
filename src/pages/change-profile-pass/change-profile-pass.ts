import { Component, Props } from '../../core/component.js';
import { render } from '../../core/render.js';
import template from './change-pass.template.js';
import { Button } from '../../components/button/button.js';
import { EmptyValidator, FormControl, FormState } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';

class ChangeProfilePass extends Component {
    constructor(public props: Props) {
        super('div', props, 'profile');
    }

    public componentDidMount(): void {
        ChangeProfilePass.initForm();
    }

    private static initForm(): void {
        const formElement = document.querySelector('.profile__form.profile__container') as HTMLFormElement;
        const formState: FormState = {
            pass: new FormControl('pochta@yandex.ru', false, new EmptyValidator()),
            newPass: new FormControl('ivanivanov', false, new EmptyValidator()),
            newPassMore: new FormControl('Иван', false, new EmptyValidator()),
        };
        const validator = new FormValidator(formElement, formState);

        validator.initialize();
    }

    public render(): string {
        return template;
    }
}

const changeProfilePassComponent = new ChangeProfilePass({
    name: 'Иван',
    button: new Button({
        type: 'submit',
        class: 'profile__form-submit default-button',
        name: 'Сохранить'
    }).elementToString
});

render('.app', changeProfilePassComponent);

import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
import template from './change-data-template.js';
import { EmailValidator, EmptyValidator, FormControl, ValidatorComposer } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Button } from '../../components/button/button.js';
class ChangeProfileData extends Component {
    constructor(props) {
        super('div', props, 'profile');
        this.props = props;
    }
    componentDidMount() {
        ChangeProfileData.initForm();
    }
    static initForm() {
        const formElement = document.querySelector('.profile__form.profile__container');
        const formState = {
            mail: new FormControl('pochta@yandex.ru', false, new ValidatorComposer([new EmailValidator(), new EmptyValidator()])),
            login: new FormControl('ivanivanov', false, new EmptyValidator()),
            userName: new FormControl('Иван', false, new EmptyValidator()),
            surname: new FormControl('Иванов', false, new EmptyValidator()),
            nameInChat: new FormControl('Иван', false, new EmptyValidator()),
            phone: new FormControl('+7 (909) 967 30 30', false, new EmptyValidator()),
        };
        const validator = new FormValidator(formElement, formState);
        validator.initialize();
    }
    render() {
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
//# sourceMappingURL=change-profile-data.js.map
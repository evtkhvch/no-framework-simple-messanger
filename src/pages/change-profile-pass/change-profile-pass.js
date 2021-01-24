import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
import template from './change-pass.template.js';
import { Button } from '../../components/button/button.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
class ChangeProfilePass extends Component {
    constructor(props) {
        super('div', props, 'profile');
        this.props = props;
    }
    componentDidMount() {
        ChangeProfilePass.initForm();
    }
    static initForm() {
        const formElement = document.querySelector('.profile__form.profile__container');
        const formState = {
            pass: new FormControl('pochta@yandex.ru', false, new EmptyValidator()),
            newPass: new FormControl('ivanivanov', false, new EmptyValidator()),
            newPassMore: new FormControl('Иван', false, new EmptyValidator()),
        };
        const validator = new FormValidator(formElement, formState);
        validator.initialize();
    }
    render() {
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
//# sourceMappingURL=change-profile-pass.js.map
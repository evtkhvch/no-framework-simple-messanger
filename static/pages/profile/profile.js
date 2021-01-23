import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
import template from './profile.template.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
class Profile extends Component {
    constructor(props) {
        super('div', props, 'profile');
        this.props = props;
    }
    componentDidMount() {
        Profile.initForm();
    }
    static initForm() {
        const formElement = document.querySelector('.profile__form.profile__container');
        const formState = {
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
    render() {
        return template;
    }
}
const profileComponent = new Profile({ name: 'Иван' });
render('.app', profileComponent);
//# sourceMappingURL=profile.js.map
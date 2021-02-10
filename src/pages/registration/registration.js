import { Component } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { RegistrationForm } from './components/registration-form/registration-form.js';
class Registration extends Component {
    constructor(props) {
        super('div', props, 'sign');
        this.props = props;
    }
    render() {
        return `{{{ registrationForm }}}`;
    }
}
export const registrationComponent = new Registration({
    registrationForm: new RegistrationForm({
        button: new Button({
            type: 'submit',
            name: 'Зарегистрироваться',
            class: 'sign__submit default-button'
        }).elementToString
    }).elementToString
});
//# sourceMappingURL=registration.js.map
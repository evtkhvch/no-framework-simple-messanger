import { Component, Props } from '../../core/component.js';
import { render } from '../../core/render.js';
import { Button } from '../../components/button/button.js';
import { RegistrationForm } from './components/registration-form/registration-form.js';

class Registration extends Component {
    constructor(public props: Props) {
        super('div', props, 'sign');
    }

    public render(): string {
        return `{{{ registrationForm }}}`;
    }
}

const registrationComponent = new Registration({
    registrationForm: new RegistrationForm({
        button: new Button({
            name: 'Зарегистрироваться',
            class: 'sign__submit default-button'
        }).elementToString
    }).elementToString
});

render('.app', registrationComponent);

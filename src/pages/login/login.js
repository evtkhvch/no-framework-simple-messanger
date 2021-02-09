import { Component } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';
class LoginComponent extends Component {
    constructor(props) {
        super('div', props, 'sign');
        this.props = props;
    }
    render() {
        return `{{{ loginForm }}}`;
    }
}
export const loginComponent = new LoginComponent({
    loginForm: new LoginForm({
        button: new Button({
            type: 'submit',
            name: 'Авторизоваться',
            class: 'sign__submit default-button',
        }).elementToString
    }).elementToString
});
//# sourceMappingURL=login.js.map
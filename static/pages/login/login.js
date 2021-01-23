import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';
class Login extends Component {
    constructor(props) {
        super('div', props, 'sign');
        this.props = props;
    }
    render() {
        return `{{{ loginForm }}}`;
    }
}
const loginComponent = new Login({
    loginForm: new LoginForm({
        button: new Button({
            type: 'submit',
            name: 'Авторизоваться',
            class: 'sign__submit default-button',
        }).elementToString
    }).elementToString
});
render('.app', loginComponent);
//# sourceMappingURL=login.js.map
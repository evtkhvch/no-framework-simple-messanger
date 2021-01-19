import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';
class Login extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    render() {
        return `<div class="sign">{{{ loginForm }}}</div>`;
    }
}
const loginComponent = new Login({
    loginForm: new LoginForm({
        button: new Button({
            name: 'Авторизоваться',
            class: 'sign__submit default-button'
        }).elementToString
    }).elementToString
});
render('.app', loginComponent);
//# sourceMappingURL=login.js.map
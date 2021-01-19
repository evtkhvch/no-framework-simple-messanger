import { Component } from '../../core/component.js';
import { loginTemplate } from './login.template.js';
import { render } from '../../core/render.js';
class Login extends Component {
    constructor(props) {
        super('div', props, 'sign');
        this.props = props;
    }
    componentDidMount() {
        Login.initForm();
    }
    static initForm() {
        const { login, pass } = document.querySelector('.sign__box.login__box');
        const button = document.querySelector('.sign__submit.default-button');
        if (button) {
            button.onclick = () => {
                console.log(login.value, pass.value);
            };
        }
    }
    render() {
        return loginTemplate;
    }
}
const loginComponent = new Login({ button: 'asasdas' });
render('.app', loginComponent);
//# sourceMappingURL=login.js.map
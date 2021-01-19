import { Component } from "../../core/component.js";
import { template } from './login.template.js';
import { render } from "../../core/render.js";
class Login extends Component {
    constructor(props) {
        super("div", props);
        this.props = props;
    }
    render() {
        return template;
    }
}
const loginComponent = new Login({
    text: 'Click me',
});
render('.app', loginComponent);
const { login, pass } = document.querySelector('.sign__box.login__box');
const button = document.querySelector('.sign__submit.default-button');
if (button) {
    button.onclick = () => {
        console.log(login.value, pass.value);
    };
}
//# sourceMappingURL=login.js.map
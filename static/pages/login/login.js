import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
import { Button } from '../../components/button/button.js';
class Login extends Component {
    constructor(props) {
        super('div', props, 'sign');
        this.props = props;
    }
    componentDidMount() {
        setTimeout(() => Login.initForm());
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
        return `
            <form class="sign__box login__box">
                <div class="sign__content">
                    <div class="sign__title">Вход</div>
                    <div class="form-item login__field">
                        <input name="login" type="text" id="login" placeholder="&nbsp;">
                        <label for="login" data-label="Логин"></label>
                    </div>
                    <div class="form-item">
                        <input name="pass" type="text" id="pass" placeholder="&nbsp;">
                        <label for="pass" data-label="Пароль"></label>
                    </div>
                </div>
                <div class="sign__footer">
                    {{{ button }}}
                    <a class="sign__account" href="../registration/registration.html">Нет аккаунта?</a>
                </div>
            </form>
        `;
    }
}
const loginComponent = new Login({
    button: new Button({
        name: 'Авторизоваться',
        class: 'sign__submit default-button'
    }).elementToString
});
render('.app', loginComponent);
//# sourceMappingURL=login.js.map
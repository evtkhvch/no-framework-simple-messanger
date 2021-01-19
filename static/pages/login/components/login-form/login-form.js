import { Component } from '../../../../core/component.js';
export class LoginForm extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    componentDidMount() {
        LoginForm.initForm();
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
                    <a class="sign__account" href="../../../registration/registration.html">Нет аккаунта?</a>
                </div>
            </form>
        `;
    }
}
//# sourceMappingURL=login-form.js.map
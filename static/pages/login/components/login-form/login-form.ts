import { Component, Props } from '../../../../core/component.js';


export class LoginForm extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public componentDidMount(): void {
        LoginForm.initForm();
    }

    private static initForm(): void {
        const { login, pass } = document.querySelector('.sign__box.login__box') as HTMLFormElement;
        const button: HTMLElement | null = document.querySelector('.sign__submit.default-button');

        if (button) {
            button.onclick = () => {
                console.log(login.value, pass.value);
            };
        }
    }

    public render(): string {
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

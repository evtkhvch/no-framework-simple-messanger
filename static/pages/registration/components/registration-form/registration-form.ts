import { Component, Props } from '../../../../core/component.js';

export class RegistrationForm extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public componentDidMount(): void {
        RegistrationForm.initForm();
    }

    private static initForm(): void {
        const {
            mail,
            login,
            userName,
            surname,
            phone,
            pass,
            passOneMoreTime
        } = document.querySelector('.sign__box.registration__box') as HTMLFormElement;
        const button: HTMLElement | null = document.querySelector('.sign__submit.default-button');

        if (button) {
            button.onclick = () => {
                console.log(mail.value, login.value, userName.value, surname.value, phone.value, pass.value, passOneMoreTime.value);
            };
        }
    }

    public render(): string {
        return `
            <form class="sign__box registration__box">
                <div class="sign__content">
                    <div class="sign__title">Регистрация</div>
                    <div class="form-item registration__field">
                        <input name="mail" type="text" id="mail" placeholder="&nbsp;">
                        <label for="mail" data-label="Почта"></label>
                    </div>
                    <div class="form-item registration__field">
                        <input name="login" type="text" id="login" placeholder="&nbsp;">
                        <label for="login" data-label="Логин"></label>
                    </div>
                    <div class="form-item registration__field">
                        <input name="name" type="text" id="userName" placeholder="&nbsp;">
                        <label for="userName" data-label="Имя"></label>
                    </div>
                    <div class="form-item registration__field">
                        <input name="surname" type="text" id="surname" placeholder="&nbsp;">
                        <label for="surname" data-label="Фамилия"></label>
                    </div>
                    <div class="form-item registration__field">
                        <input name="phone" type="text" id="phone" placeholder="&nbsp;">
                        <label for="phone" data-label="Телефон"></label>
                    </div>
                    <div class="form-item registration__field">
                        <input name="pass" type="text" id="pass" placeholder="&nbsp;">
                        <label for="pass" data-label="Пароль"></label>
                    </div>
                    <div class="form-item registration__field">
                        <input name="passOneMoreTime" type="text" id="passOneMoreTime" placeholder="&nbsp;">
                        <label for="passOneMoreTime" data-label="Пароль (еще раз)"></label>
                    </div>
                </div>
                <div class="sign__footer">
                    {{{ button }}}
                    <a class="sign__account" href="../login/login.html">Войти</a>
                </div>
            </form>
        `;
    }
}

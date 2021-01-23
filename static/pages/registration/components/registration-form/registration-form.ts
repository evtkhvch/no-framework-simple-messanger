import { Component, Props } from '../../../../core/component.js';
import { EmptyValidator, FormControl, FormState } from '../../../../core/validator.js';
import { FormValidator } from '../../../../core/form-validator.js';

export class RegistrationForm extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public componentDidMount(): void {
        RegistrationForm.initForm();
    }

    private static initForm(): void {
        const formElement = document.querySelector('.sign__box.login__box') as HTMLFormElement;
        const formState: FormState = {
            mail: new FormControl('', new EmptyValidator()),
            login: new FormControl('', new EmptyValidator()),
            userName: new FormControl('', new EmptyValidator()),
            surname: new FormControl('', new EmptyValidator()),
            phone: new FormControl('', new EmptyValidator()),
            pass: new FormControl('', new EmptyValidator()),
            passOneMoreTime: new FormControl('', new EmptyValidator())
        }
        const validator = new FormValidator(formElement, formState);

        validator.initialize();
    }

    public render(): string {
        return `
            <form class="sign__box registration__box">
                <div class="sign__content">
                    <div class="sign__title">Регистрация</div>
                    <div class="form-item registration__field">
                        <input name="mail" type="text" id="mail" placeholder="&nbsp;">
                        <label for="mail" data-label="Почта"></label>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-item registration__field">
                        <input name="login" type="text" id="login" placeholder="&nbsp;">
                        <label for="login" data-label="Логин"></label>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-item registration__field">
                        <input name="name" type="text" id="userName" placeholder="&nbsp;">
                        <label for="userName" data-label="Имя"></label>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-item registration__field">
                        <input name="surname" type="text" id="surname" placeholder="&nbsp;">
                        <label for="surname" data-label="Фамилия"></label>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-item registration__field">
                        <input name="phone" type="text" id="phone" placeholder="&nbsp;">
                        <label for="phone" data-label="Телефон"></label>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-item registration__field">
                        <input name="pass" type="text" id="pass" placeholder="&nbsp;">
                        <label for="pass" data-label="Пароль"></label>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-item registration__field">
                        <input name="passOneMoreTime" type="text" id="passOneMoreTime" placeholder="&nbsp;">
                        <label for="passOneMoreTime" data-label="Пароль (еще раз)"></label>
                        <span class="error-message"></span>
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

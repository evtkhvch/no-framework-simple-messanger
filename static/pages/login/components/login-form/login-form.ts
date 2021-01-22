import { Component, Props } from '../../../../core/component.js';
import { FormValidator } from '../../../../core/form-validator.js';
import { EmptyValidator, FormField, MaxLengthValidator, ValidatorComposer } from '../../../../core/validator.js';


export class LoginForm extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public componentDidMount(): void {
        LoginForm.initForm();
    }

    private static initForm(): void {
        const form = document.querySelector('.sign__box.login__box') as HTMLFormElement;
        const composer = new ValidatorComposer<string>([ new EmptyValidator(), new MaxLengthValidator(8) ]);

        const fields: FormField[] = [ new FormField('login', composer), new FormField('pass') ];

        const validator = new FormValidator(form, fields);
        validator.initialize();
    }

    public render(): string {
        return `
            <form class="sign__box login__box">
                <div class="sign__content">
                    <div class="sign__title">Вход</div>
                    <div class="form-item login__field">
                        <input name="login" type="text" id="login" placeholder="&nbsp;">
                        <label for="login" data-label="Логин"></label>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-item">
                        <input type="password" name="pass" id="pass" placeholder="&nbsp;">
                        <label for="pass" data-label="Пароль"></label>
                        <span class="error-message"></span>
                    </div>
                </div>
                <div class="sign__footer">
                    <input type="submit" class="button" value="Create account">
                   
                    <a class="sign__account" href="../registration/registration.html">Нет аккаунта?</a>
                </div>
            </form>
        `;
    }
}

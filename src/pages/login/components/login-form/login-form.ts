import { Component, Props } from '../../../../core/component.js';
import { EmptyValidator, FormControl, MinLengthValidator, ValidatorComposer } from '../../../../core/validator.js';
import { FormValidator } from '../../../../core/form-validator.js';
import { Router } from '../../../../core/router.js';

export class LoginForm extends Component {
    private validator: FormValidator | undefined;
    private registrationLink: HTMLFormElement | undefined;

    constructor(public props: Props) {
        super('div', props);
    }

    public componentDidMount(): void {
        const formElement = document.querySelector('.sign__box.login__box') as HTMLFormElement;
        const formState = {
            login: new FormControl('', false, new EmptyValidator()),
            pass: new FormControl('', false, new ValidatorComposer([ new EmptyValidator(), new MinLengthValidator(8) ]))
        };

        this.validator = new FormValidator(formElement, formState);
        this.validator.initialize();

        this.registrationLink = document.querySelector('.sign__account') as HTMLFormElement;
        this.registrationLink.addEventListener('click', LoginForm.linkCallback.bind(this));
    }

    private static linkCallback(): void {
        const router = new Router('.app');

        router.go('/registration');
    }

    public destroy(): void {
        this.validator?.removeListeners();
        this.registrationLink?.removeEventListener('click', LoginForm.linkCallback.bind(this))
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
                    {{{ button }}}
                    <a class="sign__account">Нет аккаунта?</a>
                </div>
            </form>
        `;
    }
}

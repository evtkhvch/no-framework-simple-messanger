import { Component, Props } from '../../core/component.js';
import { render } from '../../core/render.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';
import { EmptyValidator, FormControl, FormState, MinLengthValidator, ValidatorComposer } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { isDisabled } from '../../core/utils.js';

class Login extends Component {
    public validator: FormValidator | null = null;
    public formState: FormState = {
        login: new FormControl('', false, new EmptyValidator()),
        pass: new FormControl('', false, new ValidatorComposer([ new EmptyValidator(), new MinLengthValidator(8) ]))
    };

    constructor(public props: Props) {
        super('div', props, 'sign');
    }

    public componentDidMount(): void {
        const formElement = document.querySelector('.sign__box.login__box') as HTMLFormElement;
        this.validator = new FormValidator(formElement, this.formState);

        this.validator.initialize();
        this.initListeners();
    }

    public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        this.validator?.unsubscribe(this.listen.bind(this));
        return true;
    }

    private initListeners(): void {
        this.validator?.listenFormState(this.listen.bind(this));
    }

    private listen(state: FormState, isFormValid: boolean): void {
        this.formState = state;

        this.setProps({
            loginForm: new LoginForm({
                button: new Button({
                    isDisabled: isDisabled(isFormValid),
                    type: 'submit',
                    name: 'Авторизоваться',
                    class: 'sign__submit default-button',
                }).elementToString
            }).elementToString
        });
    }

    public render(): string {
        return `{{{ loginForm }}}`;
    }
}

const loginComponent = new Login({
    loginForm: new LoginForm({
        button: new Button({
            isDisabled: isDisabled(false),
            type: 'submit',
            name: 'Авторизоваться',
            class: 'sign__submit default-button',
        }).elementToString
    }).elementToString
});

render('.app', loginComponent);

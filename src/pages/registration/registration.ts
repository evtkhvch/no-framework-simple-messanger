import { Component, Props } from '../../core/component.js';
import { render } from '../../core/render.js';
import { Button } from '../../components/button/button.js';
import { RegistrationForm } from './components/registration-form/registration-form.js';
import { EmptyValidator, FormControl, FormState } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { isDisabled } from '../../core/utils.js';

class Registration extends Component {
    public validator: FormValidator | null = null;
    public formState: FormState = {
        mail: new FormControl('', false, new EmptyValidator()),
        login: new FormControl('', false, new EmptyValidator()),
        userName: new FormControl('', false, new EmptyValidator()),
        surname: new FormControl('', false, new EmptyValidator()),
        phone: new FormControl('', false, new EmptyValidator()),
        pass: new FormControl('', false, new EmptyValidator()),
        passOneMoreTime: new FormControl('', false, new EmptyValidator())
    };

    constructor(public props: Props) {
        super('div', props, 'sign');
    }

    public componentDidMount(): void {
        const formElement = document.querySelector('.sign__box.registration__box') as HTMLFormElement;
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
            registrationForm: new RegistrationForm({
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
        return `{{{ registrationForm }}}`;
    }
}

const registrationComponent = new Registration({
    registrationForm: new RegistrationForm({
        button: new Button({
            isDisabled: isDisabled(false),
            type: 'submit',
            name: 'Зарегистрироваться',
            class: 'sign__submit default-button'
        }).elementToString
    }).elementToString
});

render('.app', registrationComponent);

import { Component, Props } from '../../core/component';
import { Button } from '../../components/button/button';
import { RegistrationForm } from './components/registration-form/registration-form';
import { EmailValidator, EmptyValidator, FormControl, FormState, PhoneNumberValidator, ValidatorComposer } from '../../core/validator';
import { FormGroupControl } from '../../core/form-group-control';
import { Router } from '../../core/router';
import { AuthApi } from '../../api/auth-api';

class RegistrationComponent extends Component {
  private router = new Router('.app');

  private validator: FormGroupControl<RegistrationFormGroup> | undefined;

  private authApi = new AuthApi();

  constructor(public props: Props) {
    super('div', props, 'sign');
  }

  public componentDidMount(): void {
    const formElement = document.querySelector('.sign__box.registration__box') as HTMLFormElement;
    const formState: RegistrationFormGroup = {
      mail: new FormControl('', false, new ValidatorComposer([new EmptyValidator(), new EmailValidator()])),
      login: new FormControl('', false, new EmptyValidator()),
      userName: new FormControl('', false, new EmptyValidator()),
      surname: new FormControl('', false, new EmptyValidator()),
      phone: new FormControl('', false, new ValidatorComposer([new EmptyValidator(), new PhoneNumberValidator()])),
      pass: new FormControl('', false, new EmptyValidator()),
      passOneMoreTime: new FormControl('', false, new EmptyValidator())
    };
    this.validator = new FormGroupControl(formElement, formState);
    this.validator.initialize();

    const registrationLink: HTMLFormElement | null = document.querySelector('.registration__box .sign__account');

    if (registrationLink) {
      registrationLink.onclick = () => {
        this.router.go('/login');
      };
    }

    if (formElement) {
      formElement.onsubmit = (event: Event) => {
        event.preventDefault();

        const data = this.validator?.state as RegistrationFormGroup;

        this.authApi
          .signUp({
            first_name: data.userName.value,
            second_name: data.surname.value,
            login: data.login.value,
            email: data.mail.value,
            password: data.passOneMoreTime.value,
            phone: data.phone.value
          })
          .then((res) => {
            if (res.status === 200) {
              this.router.go('/chat');
            } else {
              throw new Error(res.response);
            }
          })
          // eslint-disable-next-line no-console
          .catch((err) => console.error(err));
      };
    }
  }

  public render(): string {
    return `{{{ registrationForm }}}`;
  }
}

export const registrationComponent = new RegistrationComponent({
  registrationForm: new RegistrationForm({
    button: new Button({
      type: 'submit',
      name: 'Зарегистрироваться',
      class: 'sign__submit default-button'
    })
  })
});

interface RegistrationFormGroup extends FormState {
  mail: FormControl;
  login: FormControl;
  userName: FormControl;
  surname: FormControl;
  phone: FormControl;
  pass: FormControl;
  passOneMoreTime: FormControl;
}

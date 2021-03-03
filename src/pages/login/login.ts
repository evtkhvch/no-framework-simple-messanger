import { Component, Props } from '../../core/component';
import { Button } from '../../components/button/button';
import { EmptyValidator, FormControl, FormState, ValidatorComposer } from '../../core/validator';
import { FormGroupControl } from '../../core/form-group-control';
import template from './login.template';
import { Router } from '../../core/router';
import { AuthApi } from '../../api/auth-api';

class LoginComponent extends Component {
  private router = new Router('.app');

  private validator: FormGroupControl<LoginFormGroup> | undefined;

  private authApi = new AuthApi();

  constructor(public props: Props) {
    super('div', props, 'sign');
  }

  public afterViewInit(): void {
    const formElement: HTMLFormElement | null = document.querySelector('.sign__box.login__box');
    const formState: LoginFormGroup = {
      login: new FormControl('', false, new EmptyValidator()),
      pass: new FormControl('', false, new ValidatorComposer([new EmptyValidator()]))
    };

    this.validator = new FormGroupControl(formElement, formState);
    this.validator.initialize();

    const registrationLink: HTMLFormElement | null = document.querySelector('.login__box .sign__account');

    if (registrationLink) {
      registrationLink.onclick = () => {
        this.router.go('/registration');
      };
    }

    if (formElement) {
      formElement.onsubmit = (event: Event) => {
        event.preventDefault();
        const { login, pass } = this.validator?.state as LoginFormGroup;

        this.authApi
          .signIn(login.value, pass.value)
          .then((res) => {
            if (res.status === 200 || res.status === 400) {
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
    return template;
  }
}

export const loginComponent = new LoginComponent({
  button: new Button({
    type: 'submit',
    name: 'Авторизоваться',
    class: 'sign__submit default-button'
  })
});

interface LoginFormGroup extends FormState {
  login: FormControl;
  pass: FormControl;
}

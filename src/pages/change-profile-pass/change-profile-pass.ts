import { Component, Props } from '../../core/component';
import template from './change-pass.template';
import { Button } from '../../components/button/button';
import { EmptyValidator, FormControl, FormState } from '../../core/validator';
import { FormGroupControl } from '../../core/form-group-control';
import { store } from '../../store/store';
import { ACTION } from '../../store/reducer';
import { Router } from '../../core/router';
import { AuthApi } from '../../api/auth-api';
import { UserApi } from '../../api/user-api';

class ChangeProfilePassComponent extends Component {
  private formGroup: FormGroupControl<ChangeProfileGroup> | undefined;

  private formElement: HTMLElement | null = null;

  private subscription: (() => void) | undefined;

  private authApi = new AuthApi();

  private userApi = new UserApi();

  private router = new Router('.app');

  constructor(public props: Props) {
    super('div', props, 'profile');
  }

  public afterViewInit(): void {
    this.formElement = document.querySelector('.profile__form.profile__container');

    const navButton: HTMLElement | null = document.querySelector('.profile__nav-button');

    if (navButton) {
      navButton.onclick = () => {
        this.router.go('/profile');
      };
    }
  }

  public componentDidMount(): void {
    this.authApi
      .user()
      .then((res) => {
        if (res.status === 200) {
          store.dispatch({ type: ACTION.SET_USER, props: JSON.parse(res.response) });
        } else {
          throw new Error(res.response);
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));

    this.subscription = store.subscribe(() => {
      const { user } = store.getState();

      this.setProps({ name: user?.display_name, avatar: `https://ya-praktikum.tech${user?.avatar}` });
    });

    this.initListeners();
    this.initForm();
  }

  private initListeners(): void {
    this.formElement?.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const old = this.formGroup?.state.pass.value || '';
      const newPass = this.formGroup?.state.newPassMore.value || '';

      this.userApi
        .changeProfilePassword(old, newPass)
        .then((res) => {
          if (res.status === 200) {
            this.router.go('/profile');
          } else {
            throw new Error(res.response);
          }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err));
    });
  }

  private initForm(): void {
    const formState: ChangeProfileGroup = {
      pass: new FormControl('', false, new EmptyValidator()),
      newPass: new FormControl('', false, new EmptyValidator()),
      newPassMore: new FormControl('', false, new EmptyValidator())
    };
    this.formGroup = new FormGroupControl(this.formElement, formState);

    this.formGroup.initialize();
  }

  public render(): string {
    return template;
  }
}

export const changeProfilePassComponent = new ChangeProfilePassComponent({
  name: 'Иван',
  button: new Button({
    type: 'submit',
    class: 'profile__form-submit default-button',
    name: 'Сохранить'
  })
});

interface ChangeProfileGroup extends FormState {
  pass: FormControl;
  newPass: FormControl;
  newPassMore: FormControl;
}

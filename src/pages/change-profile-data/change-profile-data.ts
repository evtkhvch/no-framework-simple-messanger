import { Component, Props } from '../../core/component';
import template from './change-data-template';
import { EmailValidator, EmptyValidator, FormControl, ValidatorComposer } from '../../core/validator';
import { FormGroupControl } from '../../core/form-group-control';
import { Button } from '../../components/button/button';
import { ACTION } from '../../store/reducer';
import { store } from '../../store/store';
import { getProfile } from './core/utils';
import { ChangeProfileGroup } from './core/interfaces';
import { User } from '../../interfaces/user';
import { Router } from '../../core/router';
import { AuthApi } from '../../api/auth-api';
import { UserApi } from '../../api/user-api';

class ChangeProfileDataComponent extends Component {
  private formGroup: FormGroupControl<ChangeProfileGroup> | undefined;

  private formElement: HTMLElement | null = null;

  private subscription: (() => void) | undefined;

  private router = new Router('.app');

  private authApi = new AuthApi();

  private userApi = new UserApi();

  constructor(public props: Props) {
    super('div', props, 'profile');
  }

  public componentDidMount(): void {
    this.formElement = document.querySelector('.profile__form.profile__container');
    this.initListeners();

    const navButton: HTMLElement | null = document.querySelector('.profile__nav-button');
    const input: HTMLInputElement | null = document.querySelector('.profile__change-img');

    if (input) {
      input.addEventListener('change', () => {
        const selectedFile = input.files ? input?.files[0] : null;

        if (selectedFile) {
          const formData = new FormData();
          formData.set('avatar', selectedFile);

          this.userApi
            .changeProfileAvatar(formData)
            .then((res) => {
              if (res.status === 200) {
                store.dispatch({ type: ACTION.SET_USER, props: JSON.parse(res.response) });
              } else {
                throw new Error(res.response);
              }
            })
            // eslint-disable-next-line no-console
            .catch((err) => console.error(err));
        }
      });
    }

    if (navButton) {
      navButton.addEventListener('click', () => this.router.go('/profile'));
    }
  }

  private initListeners(): void {
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
      this.setForm(user);
    });

    this.formElement?.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const profile = getProfile(this.formGroup?.state);

      this.userApi
        .changeProfile(profile)
        .then((res) => {
          if (res.status === 200) {
            store.dispatch({ type: ACTION.SET_USER, props: JSON.parse(res.response) });

            this.router.go('/profile');
          } else {
            throw new Error(res.response);
          }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err));
    });
  }

  private setForm(userData: User | null): void {
    const formState = {
      mail: new FormControl(userData?.email || '', false, new ValidatorComposer([new EmailValidator(), new EmptyValidator()])),
      login: new FormControl(userData?.login || '', false, new EmptyValidator()),
      userName: new FormControl(userData?.first_name || '', false, new EmptyValidator()),
      surname: new FormControl(userData?.second_name || '', false, new EmptyValidator()),
      nameInChat: new FormControl(userData?.display_name || '', false, new EmptyValidator()),
      phone: new FormControl(userData?.phone || '', false, new EmptyValidator())
    };
    this.formGroup = new FormGroupControl(this.formElement, formState);

    this.formGroup.initialize();
  }

  public destroy(): void {
    if (this.subscription) {
      this.subscription();
    }
  }

  public render(): string {
    return template;
  }
}

export const changeProfileDataComponent = new ChangeProfileDataComponent({
  avatar: '',
  name: '',
  button: new Button({
    type: 'submit',
    class: 'profile__form-submit default-button',
    name: 'Сохранить'
  })
});

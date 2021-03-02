import { Component, Props } from '../../core/component';
import template from './profile.template';
import { EmptyValidator, FormControl, FormState } from '../../core/validator';
import { FormGroupControl } from '../../core/form-group-control';
import { store } from '../../store/store';
import { ACTION } from '../../store/reducer';
import { User } from '../../interfaces/user';
import { Router } from '../../core/router';
import { AuthApi } from '../../api/auth-api';

class ProfileComponent extends Component {
  private formGroup: FormGroupControl<ProfileGroup> | undefined;

  private subscription: (() => void) | undefined;

  private router = new Router('.app');

  private authApi = new AuthApi();

  constructor(public props: Props) {
    super('div', props, 'profile');
  }

  public componentDidMount(): void {
    this.initListeners();

    const profileNav: HTMLFormElement | null = document.querySelector('.profile__nav-button');
    const exit: HTMLFormElement | null = document.querySelector('.profile__option-exit');
    const changePass: HTMLFormElement | null = document.querySelector('.profile__option-change-pass');
    const changeData: HTMLFormElement | null = document.querySelector('.profile__option-change-data');

    profileNav?.addEventListener('click', () => this.router.go('/chat'));
    changePass?.addEventListener('click', () => this.router.go('/change-profile-pass'));
    changeData?.addEventListener('click', () => this.router.go('/change-profile-data'));
    exit?.addEventListener('click', () =>
      this.authApi
        .logout()
        .then((res) => {
          if (res.status === 200) {
            this.router.go('/login');
          } else {
            throw new Error(res.response);
          }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err))
    );
  }

  private setForm(userData: User): void {
    const formElement: HTMLFormElement | null = document.querySelector('.profile__form.profile__container');
    const formState: ProfileGroup = {
      mail: new FormControl(userData.email || '', true, new EmptyValidator()),
      login: new FormControl(userData.login || '', true, new EmptyValidator()),
      userName: new FormControl(userData.first_name || '', true, new EmptyValidator()),
      surname: new FormControl(userData.second_name || '', true, new EmptyValidator()),
      nameInChat: new FormControl(userData.display_name || '', true, new EmptyValidator()),
      phone: new FormControl(userData.phone || '', true, new EmptyValidator())
    };
    this.formGroup = new FormGroupControl(formElement, formState);

    this.formGroup.initialize();
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

      if (user) {
        this.setProps({ name: user?.display_name, avatar: `https://ya-praktikum.tech${user?.avatar}` });
        this.setForm(user);
      }
    });
  }

  public destroy() {
    if (this.subscription) {
      this.subscription();
    }
  }

  public render(): string {
    return template;
  }
}

export const profileComponent = new ProfileComponent({ name: '', avatar: '' });

interface ProfileGroup extends FormState {
  mail: FormControl;
  login: FormControl;
  userName: FormControl;
  surname: FormControl;
  nameInChat: FormControl;
  phone: FormControl;
}

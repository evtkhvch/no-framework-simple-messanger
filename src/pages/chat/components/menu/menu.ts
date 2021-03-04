import { Component, Props } from '../../../../core/component';

export class Menu extends Component {
  constructor(public props: Props) {
    super('div', props);
  }

  public afterViewInit(): void {
    const navMenu = document.querySelector('.chat__options.nav-menu');

    navMenu?.addEventListener(
      'click',
      () => {
        const target = navMenu.querySelector('.drop-down');
        target?.classList.toggle('closed');
      },
      false
    );

    this.initAddUserDialog();
    this.initRemoveUserDialog();
  }

  private initAddUserDialog(): void {
    const addUser = document.querySelector('.add-user');
    const dialog: HTMLDialogElement | null = document.querySelector('.add-user-dialog');

    if (addUser) {
      addUser.addEventListener('click', () => {
        dialog?.showModal();
      });
    }
  }

  private initRemoveUserDialog(): void {
    const removeUser = document.querySelector('.remove-user');
    const dialog: HTMLDialogElement | null = document.querySelector('.remove-user-dialog');

    if (removeUser) {
      removeUser.addEventListener('click', () => {
        dialog?.showModal();
      });
    }
  }

  public render(): string {
    return `
            <nav class="chat__options nav-menu">
              <div class="drop-down closed">
                <div class="icon"></div>
                <ul class="list">
                    <li class="add-user">Добавить пользователя</li>
                    <li class="remove-user">Удалить пользователя</li>                 
                </ul>
              </div>
            </nav>
        `;
  }
}

import { Component, Props } from '../../../../core/component';
import template from './chats-bar.template';
import { Router } from '../../../../core/router';

export class ChatsBar extends Component {
  private router = new Router('.app');

  constructor(public props: Props) {
    super('div', props);
  }

  public afterViewInit(): void {
    const profileTitle: HTMLElement | null = document.querySelector('.chats-bar__header-title');

    if (profileTitle) {
      profileTitle.onclick = () => {
        this.router.go('/profile');
      };
    }

    this.initAddChatDialog();
  }

  private initAddChatDialog(): void {
    const addChat = document.querySelector('.add-chat');
    const dialog: HTMLDialogElement | null = document.querySelector('.add-chat-dialog');

    if (addChat) {
      addChat.addEventListener('click', () => {
        dialog?.showModal();
      });
    }
  }

  public render(): string {
    return template;
  }
}

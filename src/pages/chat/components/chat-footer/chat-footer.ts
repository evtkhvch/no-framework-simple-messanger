import { Component, Props } from '../../../../core/component';
import { MessageService } from '../../core/socket';

export class ChatFooter extends Component {
  private messageService = new MessageService();

  constructor(public props: Props) {
    super('div', props);
  }

  public afterViewInit(): void {
    const message: HTMLInputElement | null = document.querySelector('.chat__footer-message');
    const form: HTMLElement | null = document.querySelector('.chat__footer');

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (message) {
          const value = message.value.trim();
          this.messageService.sendMessage(value);
        }
      });
    }
  }

  public render(): string {
    return `
            <form class="chat__footer">
                <button class="chat__footer-icon"></button>
                <input class="chat__footer-message" type="text" placeholder="Сообщение">
                <button type="submit" class="chat__footer-submit"></button>
            </form>
        `;
  }
}

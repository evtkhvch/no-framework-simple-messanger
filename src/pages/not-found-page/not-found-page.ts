import { Component, Props } from '../../core/component';
import { Router } from '../../core/router';

class NotFoundComponent extends Component {
  private router = new Router('.app');

  constructor(public props: Props) {
    super('div', props, 'not-found');
  }

  public componentDidMount(): void {
    const back: HTMLFormElement | null = document.querySelector('.not-found__back');

    if (back) {
      back.onclick = () => {
        this.router.go('/chat');
      };
    }
  }

  public render(): string {
    return `
            <div class="not-found__title">404</div>
            <div class="not-found__message">Не туда попали</div>
            <a class="not-found__back">Назад к чатам</a>
        `;
  }
}

export const notFoundComponent = new NotFoundComponent({});

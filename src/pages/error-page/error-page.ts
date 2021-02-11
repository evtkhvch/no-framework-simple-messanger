import { Component, Props } from '../../core/component.js';
import { Router } from '../../core/router.js';

class ErrorPage extends Component {
    public router: Router | null = null;

    constructor(public props: Props) {
        super('div', props, 'not-found');
        this.router = new Router('.app');
    }

    public componentDidMount(): void {
        const back: HTMLFormElement | null = document.querySelector('.not-found__back');

        if (back) {
            back.onclick = () => { this.router?.go('/chat'); };
        }
    }

    public render(): string {
        return `
            <div class="not-found__title">505</div>
            <div class="not-found__message">Мы уже фиксим</div>
            <a class="not-found__back">Назад к чатам</a>
        `;
    }
}

export const errorPage = new ErrorPage({});

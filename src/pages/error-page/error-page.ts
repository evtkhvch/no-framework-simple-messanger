import { Component, Props } from '../../core/component.js';
import { router } from '../../index.js';

class ErrorComponent extends Component {
    constructor(public props: Props) {
        super('div', props, 'not-found');
    }

    public componentDidMount(): void {
        const back: HTMLFormElement | null = document.querySelector('.not-found__back');

        if (back) {
            back.onclick = () => { router.go('/chat'); };
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

export const errorComponent = new ErrorComponent({});

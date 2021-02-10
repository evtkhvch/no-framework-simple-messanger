import { Component, Props } from '../../core/component.js';

class ErrorPage extends Component {
    constructor(public props: Props) {
        super('div', props, 'not-found');
    }

    public render(): string {
        return `
            <div class="not-found__title">505</div>
            <div class="not-found__message">Мы уже фиксим</div>
            <a class="not-found__back" href="../chat/chat.html">Назад к чатам</a>
        `;
    }
}

export const errorPage = new ErrorPage({});

import { Component, Props } from '../../../../core/component.js';

export class ChatFooter extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public render(): string {
        return `
            <footer class="chat__footer">
                <button class="chat__footer-icon"></button>
                <input class="chat__footer-message" type="text" placeholder="Сообщение">
                <button type="button" class="chat__footer-submit"></button>
            </footer>
        `;
    }
}

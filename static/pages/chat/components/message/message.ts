import { Component, Props } from '../../../../core/component.js';

export class Message extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public render(): string {
        return `
            <div class="message {{ class }}">
                <div class="message__content">
                    <div class="message__text">
                        {{ text }}
                        <div class="message__date">{{ text }}</div>
                    </div>
                </div>
            </div>
        `;
    }
}

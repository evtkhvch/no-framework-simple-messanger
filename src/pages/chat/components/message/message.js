import { Component } from '../../../../core/component.js';
export class Message extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    render() {
        return `
            <div class="message {{ className }}">
                <div class="message__content">
                    <div class="message__text">
                        {{ text }}
                        <div class="message__date">{{ date }}</div>
                    </div>
                </div>
            </div>
        `;
    }
}
//# sourceMappingURL=message.js.map
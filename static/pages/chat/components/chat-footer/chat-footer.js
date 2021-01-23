import { Component } from '../../../../core/component.js';
export class ChatFooter extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    render() {
        return `
            <footer class="chat__footer">
                <button class="chat__footer-icon"></button>
                <input class="chat__footer-message" type="text" placeholder="Сообщение">
                <button type="button" class="chat__footer-submit"></button>
            </footer>
        `;
    }
}
//# sourceMappingURL=chat-footer.js.map
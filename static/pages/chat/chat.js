import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
import { chat } from './chat.template.js';
import { ChatsBar } from './components/chats-bar/chats-bar.js';
import { UserCard } from './components/user-card/user-card.js';
import { CHAT_LIST } from '../../core/chat-list.js';
import { ChatFooter } from './components/chat-footer/chat-footer.js';
class ChatComponent extends Component {
    constructor(props) {
        super('div', props, 'chat-list');
        this.props = props;
    }
    componentDidMount() {
        this.initForm();
    }
    initForm() {
        const message = document.querySelector('.chat__footer-message');
        const button = document.querySelector('.chat__footer-submit');
        if (button) {
            button.onclick = () => {
                console.log(message === null || message === void 0 ? void 0 : message.value);
            };
        }
    }
    render() {
        return chat;
    }
}
const cardList = CHAT_LIST.map(item => new UserCard(Object.assign({}, item)).elementToString).join('');
const chatComponent = new ChatComponent({
    chatsBar: new ChatsBar({
        cardList: cardList
    }).elementToString,
    footer: new ChatFooter({}).elementToString
});
render('.app', chatComponent);
//# sourceMappingURL=chat.js.map
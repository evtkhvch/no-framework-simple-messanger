import { Component } from '../../core/component.js';
import { ChatsBar } from './components/chats-bar/chats-bar.js';
import { UserCard } from './components/user-card/user-card.js';
import { DIALOG_LIST, CHAT } from '../../core/mock.js';
import { ChatFooter } from './components/chat-footer/chat-footer.js';
import { Message } from './components/message/message.js';
import { Router } from '../../core/router.js';
export class ChatComponent extends Component {
    constructor(props) {
        super('div', props, 'chat-list');
        this.props = props;
        this.router = new Router('.app');
    }
    componentDidMount() {
        this.initForm();
        this.initListener();
    }
    initForm() {
        const message = document.querySelector('.chat__footer-message');
        const button = document.querySelector('.chat__footer-submit');
        const profileTitle = document.querySelector('.chats-bar__header-title');
        if (profileTitle) {
            profileTitle.onclick = () => {
                var _a;
                (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/profile');
            };
        }
        if (button) {
            button.onclick = () => {
                console.log(message === null || message === void 0 ? void 0 : message.value);
            };
        }
    }
    initListener() {
        const userCardList = document.querySelector('.user-card__list');
        userCardList === null || userCardList === void 0 ? void 0 : userCardList.addEventListener('click', () => { this.setProps(Object.assign(Object.assign({}, this.props), { isChat: true })); });
    }
    render() {
        return `
            {{{ chatsBar }}}
            {{#if isChat}}
                <div class="chat">
                    <div class="chat__content">
                        <header class="chat__header">
                            <div class="chat__header-icon">
                                <div class="chat__header-avatar"></div>
                                <span>{{ name }}</span>
                            </div>
                            <button type="button" class="chat__options"></button>
                        </header>
                        <div class="chat__dialog">
                        {{{ messageList }}}
                    </div>
                    {{{ footer }}}
                </div>
            {{else}}
                <div class="dialog">
                    <span class="dialog__title">Выберите чат чтобы отправить сообщение</span>
                </div>
            {{/if}}
        `;
    }
}
const cardList = DIALOG_LIST.map(item => new UserCard(Object.assign({}, item)).elementToString).join('');
const messageList = CHAT.messageList.map(item => new Message(Object.assign({}, item)).elementToString).join('');
export const chatProps = {
    name: CHAT.name,
    isChat: false,
    messageList,
    chatsBar: new ChatsBar({
        cardList: cardList
    }).elementToString,
    footer: new ChatFooter({}).elementToString
};
//# sourceMappingURL=chat.js.map
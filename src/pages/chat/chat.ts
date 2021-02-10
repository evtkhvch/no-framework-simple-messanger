import { Component, Props } from '../../core/component.js';
import { ChatsBar } from './components/chats-bar/chats-bar.js';
import { UserCard } from './components/user-card/user-card.js';
import { DIALOG_LIST, CHAT } from '../../core/mock.js';
import { ChatFooter } from './components/chat-footer/chat-footer.js';
import { Message } from './components/message/message.js';

class ChatComponent extends Component {
    constructor(public props: Props) {
        super('div', props, 'chat-list');
    }

    public componentDidMount() {
        this.initForm();
        this.initListener();
    }

    private initForm(): void {
        const message: HTMLInputElement | null = document.querySelector('.chat__footer-message');
        const button: HTMLElement | null = document.querySelector('.chat__footer-submit');

        if (button) {
            button.onclick = () => {
                console.log(message?.value);
            };
        }
    }

    private initListener(): void {
        const userCardList: HTMLElement | null = document.querySelector('.user-card__list');

        userCardList?.addEventListener('click', () => { this.setProps({ ...this.props, isChat: true }) });
    }

    public render(): string {
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

const cardList = DIALOG_LIST.map(item => new UserCard({...item}).elementToString).join('');
const messageList = CHAT.messageList.map(item => new Message({...item}).elementToString).join('');

export const chatComponent = new ChatComponent({
    name: CHAT.name,
    isChat: false,
    messageList,
    chatsBar: new ChatsBar({
        cardList: cardList
    }).elementToString,
    footer: new ChatFooter({}).elementToString
});

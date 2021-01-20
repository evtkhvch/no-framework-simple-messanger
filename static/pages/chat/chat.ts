import { Component, Props } from '../../core/component.js';
import { render } from '../../core/render.js';
import { chat } from './chat.template.js';
import { ChatsBar } from './components/chats-bar/chats-bar.js';
import { UserCard } from './components/user-card/user-card.js';
import { CHAT_LIST } from '../../core/chat-list.js';
import { ChatFooter } from './components/chat-footer/chat-footer.js';

class ChatComponent extends Component {
    constructor(public props: Props) {
        super('div', props, 'chat-list');
    }

    public componentDidMount() {
        this.initForm();
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

    public render(): string {
        return chat;
    }
}

const cardList = CHAT_LIST.map(item => new UserCard({...item}).elementToString).join('');

const chatComponent = new ChatComponent({
    chatsBar: new ChatsBar({
        cardList: cardList
    }).elementToString,
    footer: new ChatFooter({}).elementToString
});

render('.app', chatComponent);

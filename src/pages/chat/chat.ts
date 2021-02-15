import { Component, Props } from '../../core/component.js';
import { ChatsBar } from './components/chats-bar/chats-bar.js';
import { UserCard } from './components/user-card/user-card.js';
import { MESSAGE_LIST } from '../../core/mock.js';
import { ChatFooter } from './components/chat-footer/chat-footer.js';
import { Message } from './components/message/message.js';
import { Router } from '../../core/router.js';
import { ACTION, store } from '../../core/store.js';
import { Chat, ChatApi } from '../../api/chat-api.js';

export class ChatComponent extends Component {
    private router: Router = new Router('.app');
    private chatApi = new ChatApi();
    private subscription: (() => void) | undefined;
    private chatList: Chat[] = [];

    constructor(public props: Props) {
        super('div', props, 'chat-list');
    }

    public componentDidMount() {
        this.initForm();
        this.initListener();
    }

    private getChat(id: number): Chat | undefined {
        return this.chatList.find(val => val.id === id);
    }

    private initForm(): void {
        this.chatApi.chats().then(value => {
            this.chatList = value;
            store.dispatch({ type: ACTION.SET_CHAT_LIST, props: value });
        });

        this.subscription = store.subscribe(() => {
            const { chatList } = store.getState();
            const cardList = chatList.map(item => new UserCard({
                ...item,
                avatar: item.avatar ? `https://ya-praktikum.tech${item.avatar}` : null
            }).elementToString).join('');

            this.setProps({
                chatsBar: new ChatsBar({
                    cardList: cardList
                }).elementToString
            });
        });

        const message: HTMLInputElement | null = document.querySelector('.chat__footer-message');
        const button: HTMLElement | null = document.querySelector('.chat__footer-submit');
        const profileTitle: HTMLElement | null = document.querySelector('.chats-bar__header-title');

        if (profileTitle) {
            profileTitle.onclick = () => {
                this.router?.go('/profile');
            };
        }

        if (button) {
            button.onclick = () => {
                console.log(message?.value);
            };
        }
    }

    private initListener(): void {
        const userCardList: HTMLElement | null = document.querySelector('.user-card__list');

        userCardList?.addEventListener('click', (event: Event) => {
            // @ts-ignore
            const target = event?.target?.closest('li');
            const chat = this.getChat(Number(target.dataset.id));
            const messageList = MESSAGE_LIST.map(item => new Message({ ...item }).elementToString).join('');

            this.setProps({ ...this.props, isChat: true, messageList, name: chat?.title });
        }, true);
    }

    public destroy(): void {
        if (this.subscription) {
            this.subscription();
        }
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

export const chatProps = {
    name: '',
    isChat: false,
    messageList: [],
    chatsBar: new ChatsBar({
        cardList: []
    }).elementToString,
    footer: new ChatFooter({}).elementToString
};

import { Component, Props } from '../../core/component.js';
import { ChatsBar } from './components/chats-bar/chats-bar.js';
import { UserCard } from './components/user-card/user-card.js';
import { MESSAGE_LIST } from '../../mock/mock.js';
import { ChatFooter } from './components/chat-footer/chat-footer.js';
import { Message } from './components/message/message.js';
import { Menu } from './components/menu/menu.js';
import { AddChatDialog } from './components/add-chat-dialog/add-chat-dialog.js';
import template from './chat.template.js';
import { RemoveUserDialog } from './components/remove-user-dialog/remove-user-dialog.js';
import { AddUserDialog } from './components/add-user-dialog/add-user-dialog.js';
import { store } from '../../store/store.js';
import { ACTION } from '../../store/reducer.js';
import { Chat } from '../../interfaces/chat.js';
import { ChatApi } from '../../api/chat-api.js';

class ChatComponent extends Component {
    private subscription: (() => void) | undefined;
    private chatList: Chat[] = [];
    private chatApi = new ChatApi();

    constructor(public props: Props) {
        super('div', props, 'chat-list');
    }

    public componentDidMount() {
        const userCardList: HTMLElement | null = document.querySelector('.user-card__list');

        userCardList?.addEventListener('click', (event: Event) => {
            const target = (event.target as Element).closest('li');
            const chat = this.getChat(Number(target?.dataset.id));
            store.dispatch({ type: ACTION.SET_CHAT, props: chat });
        }, true);

        this.chatApi.chats().then(res => {
            if (res.status === 200) {
                store.dispatch({ type: ACTION.SET_CHAT_LIST, props: JSON.parse(res.response) });
            } else {
                throw new Error(res.response);
            }
        }).catch((err) => console.error(err));

        this.initListener();
    }

    private getChat(id: number): Chat | undefined {
        return this.chatList.find(val => val.id === id);
    }

    private initListener(): void {
        this.subscription = store.subscribe(() => {
            const { chatList, chat } = store.getState();
            const messageList = MESSAGE_LIST.map(item => new Message({ ...item }));
            const cardList = chatList.map(item => new UserCard({
                ...item,
                avatar: item.avatar ? `https://ya-praktikum.tech${item.avatar}` : null
            }));

            this.chatList = chatList;

            this.setProps({
                isChat: Boolean(chat),
                messageList,
                name: chat?.title,
                chatsBar: new ChatsBar({
                    cardList: cardList
                })
            });
        });
    }

    public destroy(): void {
        if (this.subscription) {
            this.subscription();
        }
    }

    public render(): string {
        return template;
    }
}

export const chatComponent = new ChatComponent({
    name: '',
    isChat: false,
    messageList: [],
    chatsBar: new ChatsBar({
        cardList: []
    }),
    menu: new Menu({}),
    addChatDialog: new AddChatDialog({}),
    removeUserDialog: new RemoveUserDialog({}),
    addUserDialog: new AddUserDialog({}),
    footer: new ChatFooter({})
});

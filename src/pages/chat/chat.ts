import { Component, Props } from '../../core/component.js';
import { ChatsBar } from './components/chats-bar/chats-bar.js';
import { UserCard } from './components/user-card/user-card.js';
import { MESSAGE_LIST } from '../../mock/mock.js';
import { ChatFooter } from './components/chat-footer/chat-footer.js';
import { Message } from './components/message/message.js';
import { Chat, ChatApi, ChatUserReq } from '../../api/chat-api.js';
import { Menu } from './components/menu/menu.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { AddChatDialog } from './components/add-chat-dialog/add-chat-dialog.js';
import template from './chat.template.js';
import { RemoveUserDialog } from './components/remove-user-dialog/remove-user-dialog.js';
import { AddUserDialog } from './components/add-user-dialog/add-user-dialog.js';
import { store } from '../../store/store.js';
import { ACTION } from '../../store/reducer.js';
import { Router } from '../../core/router.js';

class ChatComponent extends Component {
    private chatApi = new ChatApi();
    private subscription: (() => void) | undefined;
    private chatList: Chat[] = [];
    private chat: Chat | undefined;
    private router = new Router('.app');

    constructor(public props: Props) {
        super('div', props, 'chat-list');
    }

    public componentDidMount() {
        this.initForm();
        this.initListener();
        this.initAddChatDialog();
        this.initAddUserDialog();
        this.initRemoveUserDialog();
        this.getChats();
    }

    private initAddChatDialog(): void {
        const dialog: HTMLDialogElement | null = document.querySelector('.add-chat-dialog');
        const form: HTMLFontElement | null = document.querySelector('.add-chat-dialog .modal-dialog__form');
        const formState = { addChatTitle: new FormControl('', false, new EmptyValidator()) };
        const formGroup = new FormGroupControl(form, formState);

        formGroup.initialize();
        form?.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.chatApi.createChat(formGroup.state.addChatTitle.value).then(() => {
                dialog?.close();
                this.getChats();
            });
        });
    }

    private initAddUserDialog(): void {
        const dialog: HTMLDialogElement | null = document.querySelector('.add-user-dialog');
        const form: HTMLFontElement | null = document.querySelector('.add-user-dialog .modal-dialog__form');
        const formState = { addUserTitle: new FormControl('', false, new EmptyValidator()) };
        const formGroup = new FormGroupControl(form, formState);

        formGroup.initialize();
        form?.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            const value = Number(formGroup.state.addUserTitle.value);
            const data: ChatUserReq = { users: [value], chatId: this.chat?.id! };
            this.chatApi.addUsersToChat(data).then(() => dialog?.close());
        });
    }

    private initRemoveUserDialog(): void {
        const dialog: HTMLDialogElement | null = document.querySelector('.remove-user-dialog');
        const form: HTMLFontElement | null = document.querySelector('.remove-user-dialog .modal-dialog__form');
        const formState = { removeUserTitle: new FormControl('', false, new EmptyValidator()) };
        const formGroup = new FormGroupControl(form, formState);

        formGroup.initialize();
        form?.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            const value = Number(formGroup.state.removeUserTitle.value);
            const data: ChatUserReq = { users: [value], chatId: this.chat?.id! };
            this.chatApi.removeUsersFromChat(data).then(() => dialog?.close());
        });
    }

    private getChat(id: number): Chat | undefined {
        return this.chatList.find(val => val.id === id);
    }

    private getChats(): void {
        this.chatApi.chats().then(value => {
            this.chatList = value;
            store.dispatch({ type: ACTION.GET_CHAT_LIST, props: value });
        });
    }

    private initForm(): void {
        this.subscription = store.subscribe(() => {
            const { chatList } = store.getState();
            const cardList = chatList.map(item => new UserCard({
                ...item,
                avatar: item.avatar ? `https://ya-praktikum.tech${item.avatar}` : null
            }));

            this.setProps({
                chatsBar: new ChatsBar({
                    cardList: cardList
                })
            });
        });
    }

    private initListener(): void {
        const userCardList: HTMLElement | null = document.querySelector('.user-card__list');

        userCardList?.addEventListener('click', (event: Event) => {
            const target = (event.target as Element).closest('li');
            const chat = this.getChat(Number(target?.dataset.id));
            this.chat = chat;
            const messageList = MESSAGE_LIST.map(item => new Message({ ...item }));

            this.setProps({ ...this.props, isChat: true, messageList, name: chat?.title });
        }, true);

        const profileTitle: HTMLElement | null = document.querySelector('.chats-bar__header-title');

        if (profileTitle) {
            profileTitle.onclick = () => {
                this.router?.go('/profile');
            };
        }
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

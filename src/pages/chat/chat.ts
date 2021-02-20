import { Component, Props } from '../../core/component.js';
import { ChatsBar } from './components/chats-bar/chats-bar.js';
import { UserCard } from './components/user-card/user-card.js';
import { MESSAGE_LIST } from '../../mock/mock.js';
import { ChatFooter } from './components/chat-footer/chat-footer.js';
import { Message } from './components/message/message.js';
import { Router } from '../../core/router.js';
import { ACTION, store } from '../../core/store.js';
import { Chat, ChatApi, ChatUserReq } from '../../api/chat-api.js';
import { Menu } from './components/menu/menu.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { Dialog } from './components/add-chat-dialog/dialog.js';

export class ChatComponent extends Component {
    private router: Router = new Router('.app');
    private chatApi = new ChatApi();
    private subscription: (() => void) | undefined;
    private chatList: Chat[] = [];
    private chat: Chat | undefined;

    constructor(public props: Props) {
        super('div', props, 'chat-list');
    }

    public componentDidMount() {
        this.initForm();
        this.initListener();
        this.initMenu();
        this.initAddChatDialog();
        this.initAddUserDialog();
        this.initRemoveUserDialog();
        this.getChats();
    }

    private initMenu(): void {
        const navMenu = document.querySelector('.chat__options.nav-menu');

        navMenu?.addEventListener('click', () => {
            const target = document.querySelector('.chat__options.nav-menu .drop-down');
            target?.classList.toggle('closed');
        }, false)
    }

    private initAddChatDialog(): void {
        const addChat = document.querySelector('.add-chat');
        const dialog: HTMLDialogElement | null = document.querySelector('.add-chat-dialog.modal-dialog');
        const form: HTMLFontElement | null = document.querySelector('.add-chat-dialog .modal-dialog__form');
        const formState = { addChatTitle: new FormControl('', false, new EmptyValidator()) };
        const formGroup = new FormGroupControl(form, formState);

        formGroup.initialize();
        addChat?.addEventListener('click', () => { dialog?.showModal() });
        form?.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.chatApi.createChat(formGroup.state.addChatTitle.value).then(() => {
                dialog?.close();
                this.getChats();
            });
        });
    }

    private initAddUserDialog(): void {
        const addUser = document.querySelector('.add-user');
        const dialog: HTMLDialogElement | null = document.querySelector('.add-user-dialog.modal-dialog');
        const form: HTMLFontElement | null = document.querySelector('.add-user-dialog .modal-dialog__form');
        const formState = { addUserTitle: new FormControl('', false, new EmptyValidator()) };
        const formGroup = new FormGroupControl(form, formState);

        formGroup.initialize();
        addUser?.addEventListener('click', () => { dialog?.showModal() });
        form?.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            const value = Number(formGroup.state.addUserTitle.value);
            const data: ChatUserReq = { users: [value], chatId: this.chat?.id! };
            this.chatApi.addUsersToChat(data).then(() => dialog?.close());
        });
    }

    private initRemoveUserDialog(): void {
        const removeUser = document.querySelector('.remove-user');
        const dialog: HTMLDialogElement | null = document.querySelector('.remove-user-dialog.modal-dialog');
        const form: HTMLFontElement | null = document.querySelector('.remove-user-dialog .modal-dialog__form');
        const formState = { removeUserTitle: new FormControl('', false, new EmptyValidator()) };
        const formGroup = new FormGroupControl(form, formState);

        formGroup.initialize();
        removeUser?.addEventListener('click', () => { dialog?.showModal() });
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
            store.dispatch({ type: ACTION.SET_CHAT_LIST, props: value });
        });
    }

    private initForm(): void {
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
            this.chat = this.getChat(Number(target.dataset.id));
            const messageList = MESSAGE_LIST.map(item => new Message({ ...item }).elementToString).join('');

            this.setProps({ ...this.props, isChat: true, messageList, name: this.chat?.title });
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
                            {{{ menu }}}
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
            {{{ addChatDialog }}}
            {{{ addUserDialog }}}
            {{{ removeUserDialog }}}
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
    menu: new Menu({}).elementToString,
    addChatDialog: new Dialog({
        inputId: 'addChatTitle',
        id: 'add-chat-dialog',
        class: 'add-chat-dialog',
        title: 'Добавить чат',
        type: 'text',
        input: 'Название',
        submit: 'Добавить'
    }).elementToString,
    addUserDialog: new Dialog({
        inputId: 'addUserTitle',
        id: 'add-user-dialog',
        class: 'add-user-dialog',
        title: 'Добавить пользователя в чат',
        type: 'number',
        input: 'Логин',
        submit: 'Добавить'
    }).elementToString,
    removeUserDialog: new Dialog({
        inputId: 'removeUserTitle',
        id: 'remove-user-dialog',
        class: 'remove-user-dialog',
        title: 'Удалить пользователя из чата',
        type: 'number',
        input: 'Логин',
        submit: 'Удалить'
    }).elementToString,
    footer: new ChatFooter({}).elementToString
};

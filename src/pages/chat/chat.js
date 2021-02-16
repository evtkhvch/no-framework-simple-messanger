import { Component } from '../../core/component.js';
import { ChatsBar } from './components/chats-bar/chats-bar.js';
import { UserCard } from './components/user-card/user-card.js';
import { MESSAGE_LIST } from '../../core/mock.js';
import { ChatFooter } from './components/chat-footer/chat-footer.js';
import { Message } from './components/message/message.js';
import { Router } from '../../core/router.js';
import { ACTION, store } from '../../core/store.js';
import { ChatApi } from '../../api/chat-api.js';
import { Menu } from './components/menu/menu.js';
import { Dialog } from './components/dialog/dialog.js';
import { EmptyValidator, FormControl } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
export class ChatComponent extends Component {
    constructor(props) {
        super('div', props, 'chat-list');
        this.props = props;
        this.router = new Router('.app');
        this.chatApi = new ChatApi();
        this.chatList = [];
    }
    componentDidMount() {
        this.initForm();
        this.initListener();
        this.initMenu();
        this.initDialog();
        this.getChats();
    }
    initMenu() {
        const navMenu = document.querySelector('.chat__options.nav-menu');
        navMenu === null || navMenu === void 0 ? void 0 : navMenu.addEventListener('click', () => {
            const target = document.querySelector('.chat__options.nav-menu .drop-down');
            target === null || target === void 0 ? void 0 : target.classList.toggle('closed');
        }, false);
    }
    initDialog() {
        const addChat = document.querySelector('.add-chat');
        const form = document.querySelector('.modal-dialog__form');
        const formState = { dialogTitle: new FormControl('', false, new EmptyValidator()) };
        const formGroup = new FormGroupControl(form, formState);
        formGroup.initialize();
        addChat === null || addChat === void 0 ? void 0 : addChat.addEventListener('click', () => {
            // @ts-ignore
            dialog === null || dialog === void 0 ? void 0 : dialog.showModal();
        });
        form === null || form === void 0 ? void 0 : form.addEventListener('submit', () => {
            this.chatApi.createChat(formGroup.state.dialogTitle.value).then(() => this.getChats());
        });
    }
    getChat(id) {
        return this.chatList.find(val => val.id === id);
    }
    getChats() {
        this.chatApi.chats().then(value => {
            this.chatList = value;
            store.dispatch({ type: ACTION.SET_CHAT_LIST, props: value });
        });
    }
    initForm() {
        this.subscription = store.subscribe(() => {
            const { chatList } = store.getState();
            const cardList = chatList.map(item => new UserCard(Object.assign(Object.assign({}, item), { avatar: item.avatar ? `https://ya-praktikum.tech${item.avatar}` : null })).elementToString).join('');
            this.setProps({
                chatsBar: new ChatsBar({
                    cardList: cardList
                }).elementToString
            });
        });
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
        userCardList === null || userCardList === void 0 ? void 0 : userCardList.addEventListener('click', (event) => {
            var _a;
            // @ts-ignore
            const target = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.closest('li');
            const chat = this.getChat(Number(target.dataset.id));
            const messageList = MESSAGE_LIST.map(item => new Message(Object.assign({}, item)).elementToString).join('');
            this.setProps(Object.assign(Object.assign({}, this.props), { isChat: true, messageList, name: chat === null || chat === void 0 ? void 0 : chat.title }));
        }, true);
    }
    destroy() {
        if (this.subscription) {
            this.subscription();
        }
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
            {{{ dialog }}}
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
    dialog: new Dialog({}).elementToString,
    footer: new ChatFooter({}).elementToString
};
//# sourceMappingURL=chat.js.map
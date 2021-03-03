import { Component, Props } from '../../core/component';
import { ChatsBar } from './components/chats-bar/chats-bar';
import { UserCard } from './components/user-card/user-card';
import { MESSAGE_LIST } from '../../mock/mock';
import { ChatFooter } from './components/chat-footer/chat-footer';
import { Message } from './components/message/message';
import { Menu } from './components/menu/menu';
import { AddChatDialog } from './components/add-chat-dialog/add-chat-dialog';
import template from './chat.template';
import { RemoveUserDialog } from './components/remove-user-dialog/remove-user-dialog';
import { AddUserDialog } from './components/add-user-dialog/add-user-dialog';
import { store } from '../../store/store';
import { ACTION } from '../../store/reducer';
import { Chat } from '../../interfaces/chat';
import { ChatApi } from '../../api/chat-api';
import { AuthApi } from '../../api/auth-api';
import { MessageService } from './core/socket';

class ChatComponent extends Component {
  private subscription: (() => void) | undefined;
  private chatList: Chat[] = [];
  private chatApi = new ChatApi();
  private authApi = new AuthApi();
  private messageService = new MessageService();

  constructor(public props: Props) {
    super('div', props, 'chat-list');
  }

  public afterViewInit(): void {
    const userCardList: HTMLElement | null = document.querySelector('.user-card__list');

    userCardList?.addEventListener(
      'click',
      (event: Event) => {
        const target = (event.target as Element).closest('li');
        const chat = this.getChat(Number(target?.dataset.id));
        store.dispatch({ type: ACTION.SET_CHAT, props: chat });
        if (chat) {
          this.chatApi.getChatToken(chat.id).then((res) => {
            if (res.status === 200) {
              const response = JSON.parse(res.response);
              store.dispatch({ type: ACTION.SET_CHAT_TOKEN, props: response.token });
            } else {
              throw new Error(res.response);
            }
          });
        }
      },
      true
    );
  }

  public componentDidMount() {
    this.authApi.user().then((res) => {
      if (res.status === 200) {
        store.dispatch({ type: ACTION.SET_USER, props: JSON.parse(res.response) });
      } else {
        throw new Error(res.response);
      }
    });

    this.chatApi
      .chats()
      .then((res) => {
        if (res.status === 200) {
          store.dispatch({ type: ACTION.SET_CHAT_LIST, props: JSON.parse(res.response) });
        } else {
          throw new Error(res.response);
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));

    this.initListener();
  }

  private getChat(id: number): Chat | undefined {
    return this.chatList.find((val) => val.id === id);
  }

  private initListener(): void {
    this.subscription = store.subscribe(() => {
      const { chatList, chat, user, token } = store.getState();
      const messageList = MESSAGE_LIST.map((item) => new Message({ ...item }));
      const cardList = chatList.map(
        (item) =>
          new UserCard({
            ...item,
            avatar: item.avatar ? `https://ya-praktikum.tech${item.avatar}` : null
          })
      );

      if (user && chat && token) {
        this.messageService.openSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chat.id}/${token}`);
      }

      this.chatList = chatList;

      this.setProps({
        isChat: Boolean(chat),
        messageList,
        name: chat?.title,
        chatsBar: new ChatsBar({
          cardList
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

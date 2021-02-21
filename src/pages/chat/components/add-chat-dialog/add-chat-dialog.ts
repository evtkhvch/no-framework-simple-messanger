import { Component, Props } from '../../../../core/component.js';
import { EmptyValidator, FormControl } from '../../../../core/validator.js';
import { FormGroupControl } from '../../../../core/form-group-control.js';
import { store } from '../../../../store/store.js';
import { ACTION } from '../../../../store/reducer.js';
import { Chat } from '../../../../interfaces/chat.js';
import { ChatApi } from '../../../../api/chat-api.js';

export class AddChatDialog extends Component {
    private chat: Chat | undefined | null;
    private subscription: (() => void) | undefined;
    private chatApi = new ChatApi();

    constructor(public props: Props) {
        super('div', props);
    }

    public componentDidMount(): void {
        const dialog: HTMLDialogElement | null = document.querySelector('.add-chat-dialog');
        const form: HTMLFontElement | null = document.querySelector('.add-chat-dialog .modal-dialog__form');
        const formState = { addChatTitle: new FormControl('', false, new EmptyValidator()) };
        const formGroup = new FormGroupControl(form, formState);

        formGroup.initialize();
        form?.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.chatApi.createChat(formGroup.state.addChatTitle.value).then((res) => {
                if (res.status === 200) {
                    dialog?.close();
                    this.getChats();
                } else {
                    throw new Error(res.response)
                }
            }).catch(err => console.error(err))
        });

        this.initListener();
    }

    private initListener(): void {
        this.subscription = store.subscribe(() => {
            const { chat } = store.getState();
            this.chat = chat;
        });
    }

    public destroy(): void {
        if (this.subscription) {
            this.subscription();
        }
    }

    private getChats(): void {
        this.chatApi.chats().then(res => {
            if (res.status === 200) {
                store.dispatch({ type: ACTION.SET_CHAT_LIST, props: JSON.parse(res.response) });
            } else {
                throw new Error(res.response);
            }
        }).catch((err) => console.error(err));
    }

    public render(): string {
        return `
            <dialog id="dialog" class="add-chat-dialog modal-dialog">
              <form class="modal-dialog__form" method="dialog">
                <div class="modal-dialog__content">
                     <div class="modal-dialog__title">Добавить чат</div>
                     <div class="modal-dialog__input-wrap">
                          <div class="modal-dialog__input form-item login__field">
                            <input name="dialogTitle" type="text" id="addChatTitle" placeholder="&nbsp;">
                            <label for="dialogTitle" data-label="Название"></label>
                            <span class="error-message"></span>
                         </div>
                     </div>
                </div>
                <div class="modal-dialog__footer">
                    <button type="submit" class="modal-dialog__submit default-button">Добавить</button>
                </div>
              </form>
            </dialog>
        `;
    }
}

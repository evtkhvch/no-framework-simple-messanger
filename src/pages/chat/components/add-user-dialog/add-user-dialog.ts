import { Component, Props } from '../../../../core/component.js';
import { EmptyValidator, FormControl } from '../../../../core/validator.js';
import { FormGroupControl } from '../../../../core/form-group-control.js';
import { Chat, ChatApi, ChatUserReq } from '../../../../api/chat-api.js';
import { store } from '../../../../store/store.js';

export class AddUserDialog extends Component {
    private chat: Chat | undefined | null;
    private chatApi = new ChatApi();
    private subscription: (() => void) | undefined;

    constructor(public props: Props) {
        super('div', props);
    }

    public componentDidMount(): void {
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

    public render(): string {
        return `
            <dialog id="add-user-dialog" class="add-user-dialog modal-dialog">
              <form class="modal-dialog__form" method="add-user-dialog">
                <div class="modal-dialog__content">
                     <div class="modal-dialog__title">Добавить пользователя в чат</div>
                     <div class="modal-dialog__input-wrap">
                          <div class="modal-dialog__input form-item login__field">
                            <input name="dialogTitle" type="number" id="addUserTitle" placeholder="&nbsp;">
                            <label for="dialogTitle" data-label="Логин"></label>
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

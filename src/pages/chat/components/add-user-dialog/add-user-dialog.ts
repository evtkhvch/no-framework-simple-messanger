import { Component, Props } from '../../../../core/component.js';

export class AddUserDialog extends Component {
    constructor(public props: Props) {
        super('div', props);
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

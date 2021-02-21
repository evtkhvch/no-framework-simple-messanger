import { Component, Props } from '../../../../core/component.js';

export class RemoveUserDialog extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public render(): string {
        return `
            <dialog id="remove-user-dialog" class="remove-user-dialog modal-dialog">
              <form class="modal-dialog__form" method="remove-user-dialog">
                <div class="modal-dialog__content">
                     <div class="modal-dialog__title">Удалить пользователя из чата</div>
                     <div class="modal-dialog__input-wrap">
                          <div class="modal-dialog__input form-item login__field">
                            <input name="dialogTitle" type="number" id="removeUserTitle" placeholder="&nbsp;">
                            <label for="dialogTitle" data-label="Логин"></label>
                            <span class="error-message"></span>
                         </div>
                     </div>
                </div>
                <div class="modal-dialog__footer">
                    <button type="submit" class="modal-dialog__submit default-button">Удалить</button>
                </div>
              </form>
            </dialog>
        `;
    }
}

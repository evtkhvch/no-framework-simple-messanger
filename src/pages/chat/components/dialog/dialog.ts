import { Component, Props } from '../../../../core/component.js';

export class Dialog extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public render(): string {
        return `
            <dialog id="dialog" class="modal-dialog">
              <form class="modal-dialog__form" method="dialog">
                <div class="modal-dialog__content">
                     <div class="modal-dialog__title">Добавить чат</div>
                     <div class="modal-dialog__input-wrap">
                          <div class="modal-dialog__input form-item login__field">
                            <input name="login" type="text" id="login" placeholder="&nbsp;">
                            <label for="login" data-label="Название"></label>
                            <span class="error-message"></span>
                         </div>
                     </div>
                </div>
                <div class="modal-dialog__footer">
                    <button class="modal-dialog__submit default-button" value="cancel">Добавить</button>
                </div>
              </form>
            </dialog>
        `;
    }
}

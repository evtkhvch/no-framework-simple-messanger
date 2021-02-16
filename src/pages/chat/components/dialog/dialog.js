import { Component } from '../../../../core/component.js';
export class Dialog extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    render() {
        return `
            <dialog id="dialog" class="modal-dialog">
              <form class="modal-dialog__form" method="dialog">
                <div class="modal-dialog__content">
                     <div class="modal-dialog__title">Добавить чат</div>
                     <div class="modal-dialog__input-wrap">
                          <div class="modal-dialog__input form-item login__field">
                            <input name="dialogTitle" type="text" id="dialogTitle" placeholder="&nbsp;">
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
//# sourceMappingURL=dialog.js.map
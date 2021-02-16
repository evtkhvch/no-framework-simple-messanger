import { Component, Props } from '../../../../core/component.js';

export class Dialog extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public render(): string {
        return `
            <dialog id="{{ id }}" class="{{ class }} modal-dialog">
              <form class="modal-dialog__form" method="{{ id }}">
                <div class="modal-dialog__content">
                     <div class="modal-dialog__title">{{ title }}</div>
                     <div class="modal-dialog__input-wrap">
                          <div class="modal-dialog__input form-item login__field">
                            <input name="dialogTitle" type="{{ type }}" id="{{ inputId }}" placeholder="&nbsp;">
                            <label for="dialogTitle" data-label="{{ input }}"></label>
                            <span class="error-message"></span>
                         </div>
                     </div>
                </div>
                <div class="modal-dialog__footer">
                    <button type="submit" class="modal-dialog__submit default-button">{{ submit }}</button>
                </div>
              </form>
            </dialog>
        `;
    }
}

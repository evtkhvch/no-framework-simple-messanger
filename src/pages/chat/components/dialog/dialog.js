import { Component } from '../../../../core/component.js';
export class Dialog extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    render() {
        return `
            <dialog id="dialog" class="modal-dialog">
              <form method="dialog">
                <p><label>Favorite animal:
                  <select>
                    <option></option>
                    <option>Brine shrimp</option>
                    <option>Red panda</option>
                    <option>Spider monkey</option>
                  </select>
                </label></p>
                <menu>
                  <button value="cancel">Cancel</button>
                </menu>
              </form>
            </dialog>
        `;
    }
}
//# sourceMappingURL=dialog.js.map
import { Component } from '../../../../core/component.js';
export class Menu extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    render() {
        return `
            <nav class="chat__options nav-menu">
              <div class="drop-down closed">
                <div class="icon"></div>
                <ul class="list">
                    <li class="add-chat">Добавить чат</li>
                    <li>Добавить пользователя</li>
                    <li>Удалить пользователя</li>                 
                </ul>
              </div>
            </nav>
        `;
    }
}
//# sourceMappingURL=menu.js.map
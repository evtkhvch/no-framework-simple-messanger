import { Component, Props } from '../../../../core/component.js';

export class Menu extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public render(): string {
        return `
            <nav class="chat__options nav-menu">
              <div class="drop-down closed">
                <div class="icon"></div>
                <ul class="list">
                    <li class="add-chat">Добавить чат</li>
                    <li class="add-user">Добавить пользователя</li>
                    <li class="remove-user">Удалить пользователя</li>                 
                </ul>
              </div>
            </nav>
        `;
    }
}

import { Component } from '../../../../core/component.js';
export class ChatsBar extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    render() {
        return `
            <div class="chats-bar">
                <nav class="chats-bar__header">
                    <a class="chats-bar__header-title">Профиль</a>
                </nav>
                <div class="chats-bar__search-bar search-bar">
                    <input type="text" id="search" placeholder="&nbsp;">
                    <label for="search">Поиск</label>
                </div>
                <ul class="user-card__list">
                    {{{ cardList }}}
                </ul>
            </div>
        `;
    }
}
//# sourceMappingURL=chats-bar.js.map
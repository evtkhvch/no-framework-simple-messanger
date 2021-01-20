import { Component, Props } from '../../../../core/component.js';

export class ChatsBar extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public render(): string {
        return `
            <div class="chats-bar">
                <nav class="chats-bar__header">
                    <a class="chats-bar__header-title" href="../profile/profile.html">Профиль</a>
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

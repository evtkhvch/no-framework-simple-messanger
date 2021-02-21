import { Component, Props } from '../../../../core/component.js';
import { Router } from '../../../../core/router.js';

export class ChatsBar extends Component {
    private router = new Router('.app')

    constructor(public props: Props) {
        super('div', props);
    }

    public componentDidMount(): void {
        const profileTitle: HTMLElement | null = document.querySelector('.chats-bar__header-title');

        if (profileTitle) {
            profileTitle.onclick = () => {
                this.router?.go('/profile');
            };
        }
    }

    public render(): string {
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

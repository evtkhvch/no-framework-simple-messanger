import { Component, Props } from '../../../../core/component.js';
import { router } from '../../../../index.js';
import template from './chats-bar.template.js';

export class ChatsBar extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public componentDidMount(): void {
        const profileTitle: HTMLElement | null = document.querySelector('.chats-bar__header-title');

        if (profileTitle) {
            profileTitle.onclick = () => {
                router.go('/profile');
            };
        }
    }

    public render(): string {
        return template;
    }
}

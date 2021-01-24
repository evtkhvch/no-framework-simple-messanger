import { Component } from '../../../../core/component.js';
export class UserCard extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    render() {
        return `
            <li class="user-card">
                <div class="user-card__avatar"><span class="user-card__dot"></span></div>
                <div class="user-card__data">
                    <div class="user-card__name">{{ name }}</div>
                    <div class="user-card__text">{{ text }}</div>
                </div>
                <div class="user-card__info">
                    <div class="user-card__time">{{ time }}</div>
                    <div class="user-card__count">{{ messageCount }}</div>
                </div>
            </li>
        `;
    }
}
//# sourceMappingURL=user-card.js.map
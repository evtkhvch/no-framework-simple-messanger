import { Component } from '../../../../core/component.js';
export class UserCard extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    render() {
        return `
            <li class="user-card">
                <div class="user-card__avatar">
                    <div class="user-card__dot">
                        <img src="{{ avatar }}" />
                    </div>
                </div>
                <div class="user-card__data">
                    <div class="user-card__name">{{ title }}</div>
                    <div class="user-card__text"></div>
                </div>
                <div class="user-card__info">
                    <div class="user-card__time"></div>
                </div>
            </li>
        `;
    }
}
//# sourceMappingURL=user-card.js.map
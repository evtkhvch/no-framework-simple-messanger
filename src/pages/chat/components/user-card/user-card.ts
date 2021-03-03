import { Component, Props } from '../../../../core/component';

export class UserCard extends Component {
  constructor(public props: Props) {
    super('div', props);
  }

  public render(): string {
    return `
            <li data-id="{{ id }}" class="user-card">
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

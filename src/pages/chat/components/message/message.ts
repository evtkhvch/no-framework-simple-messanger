import { Component, Props } from '../../../../core/component';

export class Message extends Component {
  constructor(public props: Props) {
    super('div', props);
  }

  public render(): string {
    return `
            <div class="message {{ className }}">
                <div class="message__content">
                    <div class="message__text">{{ text }}</div>
                    <div class="message__footer">
                        <div class="message__date">{{ date }}</div>
                    </div>
                </div>
            </div>
        `;
  }
}

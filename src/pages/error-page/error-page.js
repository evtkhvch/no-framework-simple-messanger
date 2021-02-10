import { Component } from '../../core/component.js';
class ErrorPage extends Component {
    constructor(props) {
        super('div', props, 'not-found');
        this.props = props;
    }
    render() {
        return `
            <div class="not-found__title">505</div>
            <div class="not-found__message">Мы уже фиксим</div>
            <a class="not-found__back" href="../chat/chat.html">Назад к чатам</a>
        `;
    }
}
export const errorPage = new ErrorPage({});
//# sourceMappingURL=error-page.js.map
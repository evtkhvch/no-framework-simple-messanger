import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
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
const errorPage = new ErrorPage({});
render('.app', errorPage);
//# sourceMappingURL=error-page.js.map
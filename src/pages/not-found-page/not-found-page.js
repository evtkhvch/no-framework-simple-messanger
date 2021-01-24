import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
class PageNotFound extends Component {
    constructor(props) {
        super('div', props, 'not-found');
        this.props = props;
    }
    render() {
        return `
            <div class="not-found__title">404</div>
            <div class="not-found__message">Не туда попали</div>
            <a class="not-found__back" href="../chat/chat.html">Назад к чатам</a>
        `;
    }
}
const pageComponent = new PageNotFound({});
render('.app', pageComponent);
//# sourceMappingURL=not-found-page.js.map
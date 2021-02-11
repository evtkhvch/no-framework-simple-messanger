import { Component } from '../../core/component.js';
import { Router } from '../../core/router.js';
class ErrorPage extends Component {
    constructor(props) {
        super('div', props, 'not-found');
        this.props = props;
        this.router = null;
        this.router = new Router('.app');
    }
    componentDidMount() {
        const back = document.querySelector('.not-found__back');
        if (back) {
            back.onclick = () => { var _a; (_a = this.router) === null || _a === void 0 ? void 0 : _a.go('/chat'); };
        }
    }
    render() {
        return `
            <div class="not-found__title">505</div>
            <div class="not-found__message">Мы уже фиксим</div>
            <a class="not-found__back">Назад к чатам</a>
        `;
    }
}
export const errorPage = new ErrorPage({});
//# sourceMappingURL=error-page.js.map
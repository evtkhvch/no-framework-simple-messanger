import { render } from './render.js';
export class Route {
    constructor(pathname, component, props) {
        this.pathname = pathname;
        this.component = component;
        this.props = props;
        this._component = null;
    }
    navigate(pathname) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }
    leave() {
        if (this._component) {
            this._component.remove();
        }
    }
    match(pathname) {
        return isEqual(pathname, this.pathname);
    }
    render() {
        if (!this._component) {
            this._component = this.component;
        }
        this._component.init();
        render(this.props.rootQuery, this._component);
    }
}
const isEqual = (lhs, rhs) => lhs === rhs;
//# sourceMappingURL=route.js.map
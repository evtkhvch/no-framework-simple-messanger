import { render } from './render.js';
export class Route {
    constructor(pathname, component, props, rootQuery) {
        this.pathname = pathname;
        this.component = component;
        this.props = props;
        this.rootQuery = rootQuery;
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
            this._component._destroy();
        }
    }
    match(pathname) {
        return isEqual(pathname, this.pathname);
    }
    render() {
        if (!this._component) {
            this._component = new this.component(this.props);
        }
        else {
            this._component.init();
        }
        render(this.rootQuery, this._component);
    }
}
const isEqual = (lhs, rhs) => lhs === rhs;
//# sourceMappingURL=route.js.map
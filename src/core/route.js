import { render } from './render.js';
export class Route {
    constructor(pathname, component, props) {
        this.pathname = pathname;
        this.component = component;
        this.props = props;
        this._block = null;
    }
    navigate(pathname) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }
    leave() {
        if (this._block) {
            this._block.hide();
        }
    }
    match(pathname) {
        return isEqual(pathname, this.pathname);
    }
    render() {
        if (!this._block) {
            this._block = new this.component();
            render(this.props.rootQuery, this._block);
            return;
        }
        this._block.show();
    }
}
const isEqual = (lhs, rhs) => lhs === rhs;
//# sourceMappingURL=route.js.map
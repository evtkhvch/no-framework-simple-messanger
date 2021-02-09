import { Route } from './route.js';
export class Router {
    constructor(_rootQuery) {
        this._rootQuery = _rootQuery;
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        if (Router.__instance) {
            return Router.__instance;
        }
        Router.__instance = this;
    }
    use(pathname, component) {
        const route = new Route(pathname, component, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }
    start() {
        window.onpopstate = (event) => {
            // @ts-ignore
            this._onRoute(event.currentTarget.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }
    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }
    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}
//# sourceMappingURL=router.js.map
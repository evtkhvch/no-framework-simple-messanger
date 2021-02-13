import { Route } from './route.js';
import { Component, Props } from './component.js';
import { Constructable } from './interfaces.js';

export class Router {
    public routes: Route[] = [];
    public history: History = window.history;
    private _currentRoute: Route | null = null;
    private static __instance: Router | undefined;

    constructor(private _rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        Router.__instance = this;
    }

    public use(pathname: string, component: Constructable<Component>, props: Props): Router {
        const route = new Route(pathname, component, props, this._rootQuery);
        this.routes.push(route);

        return this;
    }

    public start(): void {
        window.onpopstate = (event: PopStateEvent) => {
            // @ts-ignore
            this._onRoute(event.currentTarget.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
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

    public go(pathname: string): void {
        this.history.pushState({}, '', pathname)
        this._onRoute(pathname);
    }

    public back(): void {
        this.history.back();
    }

    public forward(): void {
        this.history.forward();
    }

    public getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}

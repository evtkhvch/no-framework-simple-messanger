import { Route } from './route';
import { Component } from './component';

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

  public use(pathname: string, component: Component): Router {
    const route = new Route(pathname, component, this._rootQuery);
    this.routes.push(route);

    return this;
  }

  public start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      if (event && event.currentTarget) {
        // eslint-disable-next-line
        this._onRoute((event.currentTarget as any).location.pathname);
      }
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
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back(): void {
    this.history.back();
  }

  public forward(): void {
    this.history.forward();
  }

  public getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

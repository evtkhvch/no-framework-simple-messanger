import { Component, Props } from './component.js';
import { render } from './render.js';
import { Constructable } from './interfaces.js';

export class Route {
    private _component: Component | null = null;

    constructor(private pathname: string, public component: Constructable<Component>, private props: Props, private rootQuery: string) {
    }

    public navigate(pathname: string): void {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    public leave(): void {
        if (this._component) {
            this._component._destroy();
        }
    }

    public match(pathname: string): boolean {
        return isEqual(pathname, this.pathname);
    }

    public render(): void {
        if (!this._component) {
            this._component = new this.component(this.props);
        }
        render(this.rootQuery, this._component);
    }
}

const isEqual = (lhs: string, rhs: string) => lhs === rhs;

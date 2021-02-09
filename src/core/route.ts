import { Component } from './component.js';
import { render } from './render.js';
import { Constructable } from './interfaces.js';

export class Route {
    private _block: Component | null = null;

    constructor(private pathname: string, public component: Constructable<Component>, private props: { rootQuery: string }) {
    }

    public navigate(pathname: string): void {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    public leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    public match(pathname: string): boolean {
        return isEqual(pathname, this.pathname);
    }

    public render(): void {
        if (!this._block) {
            this._block = new this.component();
            render(this.props.rootQuery, this._block!);
            return;
        }

        this._block.show();
    }
}

const isEqual = (lhs: string, rhs: string) => lhs === rhs;

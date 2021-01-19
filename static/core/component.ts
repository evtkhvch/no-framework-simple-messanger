import { Subject } from './subject.js';
import { templateCompiler } from './template-compiler.js';

enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render'
}

export interface Props {
    [prop: string]: unknown
}

export interface Meta {
    tagName: string;
    className: string;
    props: Props;
}

abstract class IComponent {
    abstract init(): void;
    abstract componentDidMount(): void;
    abstract setProps(nextProps: Props): void;
    abstract componentDidUpdate(oldProps: Props, newProps: Props): boolean;
    abstract render(): string;
    abstract show(): void;
    abstract hide(): void;
    abstract get element(): HTMLElement | null;
}

export class Component implements IComponent {
    private _element: HTMLElement | null = null;
    private readonly _meta: Meta | null = null;
    private subject: Subject;

    constructor(public tagName = 'div', public props: Props = {}, public className: string = '') {
        const subject = new Subject();

        this._meta = { tagName, className, props };
        this.props = this._makePropsProxy(props);
        this.subject = subject;
        this._registerEvents(subject);

        subject.next(EVENTS.INIT);
    }

    private _registerEvents(subject: Subject): void {
        subject.subscribe(EVENTS.INIT, this.init.bind(this));
        subject.subscribe(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        subject.subscribe(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        subject.subscribe(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources(): void {
        if (this._meta) {
            const { tagName, className } = this._meta;

            this._element = Component._createDocumentElement(tagName);
            Component._setClass(this._element, className);
        }
    }

    public init(): void {
        this._createResources();
        this.subject.next(EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
    }

    public componentDidMount(): void {
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props): void {
        const response = this.componentDidUpdate(oldProps, newProps);

        this.props = newProps;

        if (response) {
            this.subject.next(EVENTS.FLOW_RENDER);
        }
    }

    public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        return true;
    }

    public setProps = (nextProps: Props): void => {
        if (!nextProps) {
            return;
        }
        const props = { ...this.props, ...nextProps };

        this._componentDidUpdate(this.props, props);
    };

    public get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {
        const block = this.render();

        if (this._element) {
            this._element.innerHTML = templateCompiler(block, this.props);
        }

        setTimeout(() => { this._afterViewInit(); });
    }

    private _afterViewInit(): void {
        this.subject.next(EVENTS.FLOW_CDM);
    }

    public render(): string {
        return '';
    }

    private _makePropsProxy(props: Props): Props {
        return new Proxy(props, {
            deleteProperty() {
                throw new Error('нет доступа');
            }
        });
    }

    private static _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    private static _setClass(element: HTMLElement, className: string): void {
        element.classList.add(className);
    }

    public show(): void {
        if (this._element) {
            this._element.style.display = 'block';
        }
    }

    public hide(): void {
        if (this._element) {
            this._element.style.display = 'none';
        }
    }
}

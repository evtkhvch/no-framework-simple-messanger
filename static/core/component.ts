import {Subject} from "./subject.js";
import {templateCompiler} from "./template-compiler.js";

enum EVENTS {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render"
}

export interface Props {
    [prop: string]: unknown
}

export class Component {
    private _element: HTMLElement | null = null;
    private readonly _meta: { tagName: string; props: Props } | null = null;
    private eventBus: Subject;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(public tagName = "div", public props: Props = {}) {
        const subject = new Subject();

        this._meta = {tagName, props};
        this.props = this._makePropsProxy(props);
        this.eventBus = subject;
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
            const {tagName} = this._meta;
            this._element = Component._createDocumentElement(tagName);
        }
    }

    public init(): void {
        this._createResources();
        this.eventBus.next(EVENTS.FLOW_CDM);
    }

    private _componentDidMount(): void {
        this.componentDidMount(this.props);
        this.eventBus.next(EVENTS.FLOW_RENDER);
    }

    // Может переопределять пользователь, необязательно трогать
    public componentDidMount(oldProps: Props): void {
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props): void {
        const response = this.componentDidUpdate(oldProps, newProps);

        this.props = newProps;

        if (response) {
            this.eventBus.next(EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        return true;
    }

    public setProps = (nextProps: Props): void => {
        if (!nextProps) {
            return;
        }
        const props = {...this.props, ...nextProps};

        this._componentDidUpdate(this.props, props);
    };

    public get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {
        const block = this.render();
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        if (this._element) {
            this._element.innerHTML = templateCompiler(block, this.props);
        }
    }

    // Может переопределять пользователь, необязательно трогать
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

    private static _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    public show() {
        if (this._element) {
            this._element.style.display = 'block';
        }
    }

    public hide() {
        if (this._element) {
            this._element.style.display = 'none';
        }
    }
}

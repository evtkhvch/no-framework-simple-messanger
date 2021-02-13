import { Observable } from './observable.js';
import { templateCompiler } from './template-compiler.js';
var EVENTS;
(function (EVENTS) {
    EVENTS["INIT"] = "init";
    EVENTS["FLOW_CDM"] = "flow:component-did-mount";
    EVENTS["FLOW_CDU"] = "flow:component-did-update";
    EVENTS["FLOW_RENDER"] = "flow:render";
    EVENTS["DESTROY"] = "destroy";
})(EVENTS || (EVENTS = {}));
class IComponent {
}
export class Component {
    constructor(tagName = 'div', props = {}, className = '') {
        this.tagName = tagName;
        this.props = props;
        this.className = className;
        this._element = null;
        this._meta = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            const props = Object.assign(Object.assign({}, this.props), nextProps);
            this._componentDidUpdate(this.props, props);
        };
        const subject = new Observable();
        this._meta = { tagName, className, props };
        this.props = this._makePropsProxy(props);
        this.subject = subject;
        this._registerEvents(subject);
        subject.next(EVENTS.INIT);
    }
    _registerEvents(subject) {
        subject.subscribe(EVENTS.INIT, this.init.bind(this));
        subject.subscribe(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        subject.subscribe(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        subject.subscribe(EVENTS.FLOW_RENDER, this._render.bind(this));
        subject.subscribe(EVENTS.DESTROY, this.destroy.bind(this));
    }
    _createResources() {
        if (this._meta) {
            const { tagName, className } = this._meta;
            this._element = Component._createDocumentElement(tagName);
            Component._setClass(this._element, className);
        }
    }
    init() {
        this._createResources();
        this.subject.next(EVENTS.FLOW_RENDER);
    }
    _componentDidMount() {
        this.componentDidMount();
    }
    componentDidMount() {
    }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        const wasChange = JSON.stringify(oldProps) !== JSON.stringify(newProps);
        this.props = newProps;
        if (response && wasChange) {
            this.subject.next(EVENTS.FLOW_RENDER);
        }
    }
    componentDidUpdate(oldProps, newProps) {
        return true;
    }
    get element() {
        return this._element;
    }
    get elementToString() {
        return this._element ? this._element.innerHTML : '';
    }
    _render() {
        const block = this.render();
        if (this._element) {
            const tmp = templateCompiler(block, this.props);
            // @ts-ignore
            this._element.innerHTML = window.DOMPurify.sanitize(tmp);
        }
        setTimeout(() => { this._afterViewInit(); });
    }
    _afterViewInit() {
        this.subject.next(EVENTS.FLOW_CDM);
    }
    render() {
        return '';
    }
    _makePropsProxy(props) {
        return new Proxy(props, {
            deleteProperty() {
                throw new Error('нет доступа');
            }
        });
    }
    static _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    static _setClass(element, className) {
        if (className) {
            element.classList.add(className);
        }
    }
    show() {
        if (this._element) {
            this._element.style.display = 'block';
        }
    }
    hide() {
        if (this._element) {
            this._element.style.display = 'none';
        }
    }
    _destroy() {
        if (this._element) {
            this._element.remove();
        }
        this.subject.next(EVENTS.DESTROY);
    }
    destroy() {
    }
}
//# sourceMappingURL=component.js.map
import { Subject } from "./subject.js";
import { templateCompiler } from "./template-compiler.js";
var EVENTS;
(function (EVENTS) {
    EVENTS["INIT"] = "init";
    EVENTS["FLOW_CDM"] = "flow:component-did-mount";
    EVENTS["FLOW_CDU"] = "flow:component-did-update";
    EVENTS["FLOW_RENDER"] = "flow:render";
})(EVENTS || (EVENTS = {}));
export class Component {
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
        this.tagName = tagName;
        this.props = props;
        this._element = null;
        this._meta = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            const props = Object.assign(Object.assign({}, this.props), nextProps);
            this._componentDidUpdate(this.props, props);
        };
        const subject = new Subject();
        this._meta = { tagName, props };
        this.props = this._makePropsProxy(props);
        this.eventBus = subject;
        this._registerEvents(subject);
        subject.next(EVENTS.INIT);
    }
    _registerEvents(subject) {
        subject.subscribe(EVENTS.INIT, this.init.bind(this));
        subject.subscribe(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        subject.subscribe(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        subject.subscribe(EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    _createResources() {
        if (this._meta) {
            const { tagName } = this._meta;
            this._element = Component._createDocumentElement(tagName);
        }
    }
    init() {
        this._createResources();
        this.eventBus.next(EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.componentDidMount(this.props);
        this.eventBus.next(EVENTS.FLOW_RENDER);
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps) {
    }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        this.props = newProps;
        if (response) {
            this.eventBus.next(EVENTS.FLOW_RENDER);
        }
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        return true;
    }
    get element() {
        return this._element;
    }
    _render() {
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
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
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
}
//# sourceMappingURL=component.js.map
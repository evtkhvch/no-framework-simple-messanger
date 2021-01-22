import { Component } from '../../core/component.js';
export class Button extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    render() {
        return `<button type="{{ type }}" class="{{ class }}">{{ name }}</button>`;
    }
}
//# sourceMappingURL=button.js.map
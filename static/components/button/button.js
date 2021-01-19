import { Component } from '../../core/component.js';
export class Button extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    render() {
        return `<button type="button" class="sign__submit default-button">{{ name }}</button>`;
    }
}
//# sourceMappingURL=button.js.map
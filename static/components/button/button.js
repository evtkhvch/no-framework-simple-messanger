import { Component } from '../../core/component.js';
import { buttonTemplate } from './button.template.js';
export class Button extends Component {
    constructor(props) {
        super('div', props);
        this.props = props;
    }
    render() {
        return buttonTemplate;
    }
}
//# sourceMappingURL=button.js.map
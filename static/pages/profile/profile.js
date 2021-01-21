import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
import template from './profile.template.js';
class Profile extends Component {
    constructor(props) {
        super('div', props, 'profile');
        this.props = props;
    }
    render() {
        return template;
    }
}
const profileComponent = new Profile({});
render('.app', profileComponent);
//# sourceMappingURL=profile.js.map
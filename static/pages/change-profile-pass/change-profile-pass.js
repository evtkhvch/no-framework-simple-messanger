import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
import template from './change-pass.template.js';
class ChangeProfilePass extends Component {
    constructor(props) {
        super('div', props, 'profile');
        this.props = props;
    }
    componentDidMount() {
        this.initForm();
    }
    initForm() {
        const { pass, newPass, newPassMore } = document.querySelector('.profile__form.profile__container');
        const button = document.querySelector('.profile__form-submit.default-button');
        if (button) {
            button.onclick = () => {
                console.log(pass.value, newPass.value, newPassMore.value);
            };
        }
    }
    render() {
        return template;
    }
}
const changeProfilePassComponent = new ChangeProfilePass({});
render('.app', changeProfilePassComponent);
//# sourceMappingURL=change-profile-pass.js.map
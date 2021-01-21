import { Component } from '../../core/component.js';
import { render } from '../../core/render.js';
import template from './change-data-template.js';
class ChangeProfileData extends Component {
    constructor(props) {
        super('div', props, 'profile');
        this.props = props;
    }
    componentDidMount() {
        this.initForm();
    }
    initForm() {
        const { mail, login, userName, surname, nameInChat, phone } = document.querySelector('.profile__form.profile__container');
        const button = document.querySelector('.profile__form-submit.default-button');
        if (button) {
            button.onclick = () => {
                console.log(mail.value, login.value, userName.value, surname.value, nameInChat.value, phone.value);
            };
        }
    }
    render() {
        return template;
    }
}
const changeProfileDataComponent = new ChangeProfileData({});
render('.app', changeProfileDataComponent);
//# sourceMappingURL=change-profile-data.js.map
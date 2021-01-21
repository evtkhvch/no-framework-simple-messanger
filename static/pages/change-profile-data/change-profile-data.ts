import { Component, Props } from '../../core/component.js';
import { render } from '../../core/render.js';
import template from './change-data-template.js';

class ChangeProfileData extends Component {
    constructor(public props: Props) {
        super('div', props, 'profile');
    }

    public componentDidMount(): void {
        this.initForm();
    }

    private initForm(): void {
        const {
            mail,
            login,
            userName,
            surname,
            nameInChat,
            phone
        } = document.querySelector('.profile__form.profile__container') as HTMLFormElement;
        const button: HTMLElement | null = document.querySelector('.profile__form-submit.default-button');

        if (button) {
            button.onclick = () => {
                console.log(mail.value, login.value, userName.value, surname.value, nameInChat.value, phone.value);
            };
        }
    }

    public render(): string {
        return template;
    }
}

const changeProfileDataComponent = new ChangeProfileData({});

render('.app', changeProfileDataComponent);

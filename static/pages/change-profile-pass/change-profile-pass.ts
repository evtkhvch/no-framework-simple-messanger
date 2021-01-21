import { Component, Props } from '../../core/component.js';
import { render } from '../../core/render.js';
import template from './change-pass.template.js';

class ChangeProfilePass extends Component {
    constructor(public props: Props) {
        super('div', props, 'profile');
    }

    public componentDidMount(): void {
        this.initForm();
    }

    private initForm(): void {
        const { pass, newPass, newPassMore } = document.querySelector('.profile__form.profile__container') as HTMLFormElement;
        const button: HTMLElement | null = document.querySelector('.profile__form-submit.default-button');

        if (button) {
            button.onclick = () => {
                console.log(pass.value, newPass.value, newPassMore.value);
            };
        }
    }

    public render(): string {
        return template;
    }
}

const changeProfilePassComponent = new ChangeProfilePass({});

render('.app', changeProfilePassComponent);

import { Component, Props } from '../../core/component.js';
import { render } from '../../core/render.js';
import template from './profile.template.js';

class Profile extends Component {
    constructor(public props: Props) {
        super('div', props, 'profile');
    }

    public render(): string {
        return template;
    }
}

const profileComponent = new Profile({});

render('.app', profileComponent);

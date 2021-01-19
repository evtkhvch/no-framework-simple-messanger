import { Component, Props } from '../../core/component.js';
import { buttonTemplate } from './button.template.js'

export class Button extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public render(): string {
        return buttonTemplate;
    }
}

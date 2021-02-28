import { Component, Props } from '../../core/component';

export class Button extends Component {
    constructor(public props: Props) {
        super('div', props);
    }

    public render(): string {
        return `<button {{ isDisabled }} type="{{ type }}" class="{{ class }}">{{ name }}</button>`;
    }
}

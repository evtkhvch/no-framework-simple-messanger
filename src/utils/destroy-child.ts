import { Component, Props } from '../core/component.js';

export const destroyChild = (props: Props): void => {
    Object.values(props).forEach(item => {
        if (item instanceof Component) {
            destroyChild(item.props);
            item.destroy();
        }
    });
}

import { Component, Props } from '../core/component';

export const destroyChild = (props: Props): void => {
    Object.values(props).forEach(item => {
        if (item instanceof Component) {
            destroyChild(item.props);
            item.destroy();
        }
    });
}

import { templateCompiler } from '../core/template-compiler.js';
import { Component, Props } from '../core/component.js';

export const renderChild = (props: Props): Props => {
    return Object.entries(props).reduce((acc, curr) => {
        const [key, value] = curr;

        if (value instanceof Component) {
            const childProps = renderChild(value.props);

            return { ...acc, [key]: templateCompiler(value.render(), childProps) }
        }

        if (Array.isArray(value) && value[0] instanceof Component) {
            return { ...acc, [key]: renderArray(value) };
        }

        return { ...acc, [key]: value }
    }, {});
}

const renderArray = (array: any[]): string => {
    return array.reduce((acc, curr) => {
        const childProps = renderChild(curr.props);

        return [ ...acc, templateCompiler(curr.render(), childProps) ];
    }, []).join('');
}

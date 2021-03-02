import { templateCompiler } from '../core/template-compiler';
import { Component, Props } from '../core/component';

export const renderChild = (props: Props): Props => {
  return Object.entries(props).reduce((acc, curr) => {
    const [key, value] = curr;

    if (value instanceof Component) {
      const childProps = renderChild(value.props);
      value._render();
      return { ...acc, [key]: templateCompiler(value.render(), childProps) };
    }

    if (Array.isArray(value) && value[0] instanceof Component) {
      return { ...acc, [key]: renderArray(value) };
    }

    return { ...acc, [key]: value };
  }, {});
};
// eslint-disable-next-line
const renderArray = (array: any[]): string => {
  return array
    .reduce((acc, curr) => {
      const childProps = renderChild(curr.props);
      curr._render();
      return [...acc, templateCompiler(curr.render(), childProps)];
    }, [])
    .join('');
};

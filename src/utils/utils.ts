import { Component } from '../core/component';

export const queryStringify = (data: { [name: string]: unknown }): string => {
    if (!data) {
        return '';
    } else {
        const str = Object.keys(data).reduce((acc: string[], p) => {
            return [ ...acc, `${p}=${data[p]}` ];
        }, []);
        const params = str.join('&');

        return `?${params}`;
    }
};

// eslint-disable-next-line
export const censor = <T>(censor: T) => {
    // eslint-disable-next-line
    return (key: keyof T, value: any): any => {
        if (value instanceof Component) {
            return value.props;
        }

        return value;
    }
}


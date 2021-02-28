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

export const censor = <T>(censor: T) => {
    return (key: keyof T, value: any) => {
        if (value instanceof Component) {
            return value.props;
        }

        return value;
    }
}


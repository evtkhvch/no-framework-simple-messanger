import { Action, Middleware, MiddlewareData } from '../interfaces/store.js';

export const applyMiddleware = (...middlewares: Middleware[]) => (store: MiddlewareData) => {
    if (middlewares.length === 0) {
        return (dispatch: (action: Action) => void) => dispatch;
    }
    if (middlewares.length === 1) {
        return middlewares[0](store);
    }
    const boundMiddlewares = middlewares.map(middleware =>
        middleware(store)
    );
    return boundMiddlewares.reduce((a, b) =>
        next => a(b(next))
    );
};

export const thunkMiddleware: Middleware = ({dispatch, getState}) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }
    return next(action);
};

export const loggingMiddleware: Middleware = ({getState}) => next => action => {
    console.info('before', getState());
    console.info('action', action);
    const result = next(action);
    console.info('after', getState());
    return result;
};




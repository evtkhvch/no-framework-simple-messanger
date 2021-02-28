import { createStore } from './core/create-store';
import { applyMiddleware, loggingMiddleware, thunkMiddleware } from './core/middlewares';
import { reducer } from './reducer';

export const store = createStore(reducer, applyMiddleware(
    thunkMiddleware,
    // loggingMiddleware
));


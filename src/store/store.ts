import { createStore } from './core/create-store.js';
import { applyMiddleware, loggingMiddleware, thunkMiddleware } from './core/middlewares.js';
import { reducer } from './reducer.js';

export const store = createStore(reducer, applyMiddleware(
    thunkMiddleware,
    // loggingMiddleware
));


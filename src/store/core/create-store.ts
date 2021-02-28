import { ACTION, State } from '../reducer';
import { Action, Middleware, Reducer, Store } from '../interfaces/store';

export const createStore = (reducer: Reducer, middleware: Middleware): Store => {
    let state: State;
    const subscribers: Function[] = [];
    const coreDispatch = (action: Action) => {
        state = reducer(state, action);
        subscribers.forEach(handler => handler());
    };
    const getState = () => state;
    const store: Store = {
        dispatch: coreDispatch,
        getState,
        subscribe: (handler: Function) => {
            subscribers.push(handler);
            return () => {
                const index = subscribers.indexOf(handler);

                if (index > 0) {
                    subscribers.splice(index, 1);
                }
            };
        }
    };
    if (middleware) {
        const dispatch = (action: Action) => store.dispatch(action);

        store.dispatch = middleware({
            dispatch,
            getState
        })(coreDispatch);
    }
    coreDispatch({ type: ACTION.INIT });
    return store;
};

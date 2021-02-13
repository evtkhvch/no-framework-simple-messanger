import { User } from '../api/auth-api.js';

export enum ACTION {
    INIT = 'INIT',
    GET_USER = 'GET_USER'
}

export interface Action {
    type: ACTION;
    props?: any;
}

export interface State {
    user: User | null;
}

export type Reducer = (state: State | undefined, action: Action) => State;

export const initialState: State = {
    user: null
}

const reducer: Reducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case ACTION.GET_USER:
            return { ...state, user: action.props };

        default:
            return state;
    }
};

const createStore = (yourReducer: Reducer) => {
    let listeners: Function[] = [];
    let currentState = yourReducer(undefined, { type: ACTION.INIT });

    return {
        getState: (): State => currentState,
        dispatch: (action: Action): void => {
            currentState = yourReducer(currentState, action);

            listeners.forEach((listener) => {
                listener();
            });
        },
        subscribe: (newListener: Function): () => void => {
            listeners.push(newListener);

            return () => {
                listeners = listeners.filter((l) => l !== newListener);
            };
        }
    };
};

export const store = createStore(reducer);

import { User } from '../api/auth-api.js';
import { Chat } from '../api/chat-api';

export enum ACTION {
    INIT = 'INIT',
    SET_USER = 'SET_USER',
    SET_CHAT_LIST = 'SET_CHAT_LIST'
}

export interface Action {
    type: ACTION;
    props?: any;
}

export interface State {
    user: User | null;
    chatList: Chat[];
    chat: Chat | undefined | null;
}

export type Reducer = (state: State | undefined, action: Action) => State;

export const initialState: State = {
    user: null,
    chatList: [],
    chat: null
}

const reducer: Reducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case ACTION.SET_USER:
            return { ...state, user: { ...state.user, ...action.props } };

        case ACTION.SET_CHAT_LIST:
            return { ...state, chatList: action.props };

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

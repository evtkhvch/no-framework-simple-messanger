import { User } from '../api/auth-api.js';
import { Chat } from '../api/chat-api';

export enum ACTION {
    INIT = 'INIT',
    GET_USER = 'GET_USER',
    CHANGE_USER = 'CHANGE_USER',
    GET_CHAT_LIST = 'GET_CHAT_LIST',
    SET_CURRENT_CHAT = 'SET_CURRENT_CHAT'
}

export interface Action {
    type: ACTION;
    props?: any;
}

export interface State {
    user: User | null;
    chatList: Chat[];
    chat: Chat | null;
}

export type Reducer = (state: State | undefined, action: Action) => State;

export const initialState: State = {
    user: null,
    chatList: [],
    chat: null
}

const reducer: Reducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case ACTION.GET_USER:
            return { ...state, user: { ...state.user, ...action.props } };

        case ACTION.CHANGE_USER:
            return { ...state, user: { ...state.user, ...action.props } };

        case ACTION.GET_CHAT_LIST:
            return { ...state, chatList: action.props };

        case ACTION.SET_CURRENT_CHAT:
            return { ...state, chat: action.props };

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

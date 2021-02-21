import { Action, Reducer } from './interfaces/store.js';
import { Chat } from '../interfaces/chat.js';
import { User } from '../interfaces/user.js';

export enum ACTION {
    INIT = '@@redux/INIT',
    SET_USER = 'SET_USER',
    SET_CHAT_LIST = 'SET_CHAT_LIST',
    SET_CHAT = 'SET_CHAT'
}

export interface State {
    user: User | null;
    chatList: Chat[];
    chat: Chat | undefined | null;
}

export const initialState: State = {
    user: null,
    chatList: [],
    chat: null
}

export const reducer: Reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ACTION.SET_USER:
            return { ...state, user: { ...state.user, ...action.props } };

        case ACTION.SET_CHAT:
            return { ...state, chat: action.props };

        case ACTION.SET_CHAT_LIST:
            return { ...state, chatList: action.props };

        default:
            return state;
    }
};

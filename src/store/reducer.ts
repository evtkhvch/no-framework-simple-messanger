import { Action, Reducer } from './interfaces/store';
import { Chat } from '../interfaces/chat';
import { User } from '../interfaces/user';

export enum ACTION {
  INIT = '@@redux/INIT',
  SET_USER = 'SET_USER',
  SET_CHAT_LIST = 'SET_CHAT_LIST',
  SET_CHAT = 'SET_CHAT',
  SET_CHAT_TOKEN = 'SET_CHAT_TOKEN'
}

export interface State {
  user: User | null;
  chatList: Chat[];
  chat: Chat | undefined | null;
  token: string | null;
}

export const initialState: State = {
  user: null,
  chatList: [],
  chat: null,
  token: null
};

export const reducer: Reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTION.SET_USER:
      return { ...state, user: { ...state.user, ...action.props } };

    case ACTION.SET_CHAT:
      return { ...state, chat: action.props };

    case ACTION.SET_CHAT_LIST:
      return { ...state, chatList: action.props };

    case ACTION.SET_CHAT_TOKEN:
      return { ...state, token: action.props };

    default:
      return state;
  }
};

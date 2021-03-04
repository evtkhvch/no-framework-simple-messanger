import { Action, Reducer } from './interfaces/store';
import { Chat } from '../interfaces/chat';
import { User } from '../interfaces/user';
import { Message } from '../pages/chat/models/message';

export enum ACTION {
  INIT = '@@redux/INIT',
  SET_USER = 'SET_USER',
  SET_CHAT_LIST = 'SET_CHAT_LIST',
  SET_CHAT = 'SET_CHAT',
  SET_CHAT_TOKEN = 'SET_CHAT_TOKEN',
  SET_MESSAGE_LIST = 'SET_MESSAGE_LIST',
  SET_MESSAGE = 'SET_MESSAGE'
}

export interface State {
  user: User | null;
  chatList: Chat[];
  chat: Chat | undefined | null;
  token: string | null;
  messageList: Message[];
}

export const initialState: State = {
  user: null,
  chatList: [],
  chat: null,
  token: null,
  messageList: []
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

    case ACTION.SET_MESSAGE_LIST:
      return { ...state, messageList: action.props };

    case ACTION.SET_MESSAGE:
      return { ...state, messageList: [...state.messageList, action.props] };

    default:
      return state;
  }
};

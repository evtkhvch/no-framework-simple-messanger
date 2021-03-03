import { Message, SocketMessage } from '../models/message';

export const getMessageList = (list: SocketMessage[], userId: number): Message[] =>
  list.map((item) => {
    const className = userId === item.user_id ? 'outgoing' : 'incoming';
    return new Message(item.id, className, item.content, '');
  });

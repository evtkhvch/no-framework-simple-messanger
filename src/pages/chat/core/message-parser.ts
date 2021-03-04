import { Message, MessageItem, MessageListItem } from '../models/message';

export const getMessageList = (list: MessageListItem[], userId: number): Message[] =>
  list.map((item) => {
    const className = userId === item.user_id ? 'outgoing' : 'incoming';

    return new Message(item.id, className, item.content, '');
  });

export const getMessage = (item: MessageItem, userId: number): Message => {
  const className = userId === item.userId ? 'outgoing' : 'incoming';

  return new Message(item.id, className, item.content, '');
};

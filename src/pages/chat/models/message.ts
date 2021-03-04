// eslint-disable-next-line @typescript-eslint/no-unused-vars
type MessageClassName = 'incoming' | 'outgoing';

export interface SocketMessage {
  user_id: number;
  chat_id: number;
  content: string;
  time: string;
  id: number;
}

export class Message {
  constructor(public id: number, public className: MessageClassName, public text: string, public date: string) {}
}

export interface OutgoingMessage {
  content: string;
  id: number;
  time: string;
  type: string;
  userId: number;
}

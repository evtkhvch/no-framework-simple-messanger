/* eslint-disable no-console */
import { MessageItem, MessageListItem } from '../models/message';

export class MessageService {
  public socket: WebSocket | null = null;
  private static __instance: MessageService;

  constructor() {
    if (MessageService.__instance) {
      return MessageService.__instance;
    }

    MessageService.__instance = this;
  }

  public getMessageList(from = 0): void {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: `${from}`,
          type: 'get old'
        })
      );
    }
  }

  public sendMessage(content: string): void {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content,
          type: 'message'
        })
      );
    }
  }

  public listenMessage(listCallback: (data: MessageListItem[]) => void, messageCallback: (data: MessageItem) => void): void {
    if (this.socket) {
      this.socket.addEventListener('message', (event) => {
        if (Array.isArray(JSON.parse(event.data))) {
          listCallback(JSON.parse(event.data));
        }
        if (!Array.isArray(JSON.parse(event.data))) {
          messageCallback(JSON.parse(event.data));
        }
      });
    }
  }

  public close(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  public openSocket(url: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const socket = new WebSocket(url);

      socket.addEventListener('open', () => {
        this.socket = socket;
        resolve();
      });

      socket.addEventListener('close', () => {
        this.socket = null;
      });

      socket.addEventListener('error', () => {
        this.socket = null;
      });
    });
  }
}

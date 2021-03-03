/* eslint-disable no-console */
import { SocketMessage } from '../models/message';

export class MessageService {
  private static __instance: MessageService;
  private socket: WebSocket | undefined;

  constructor() {
    if (MessageService.__instance) {
      return MessageService.__instance;
    }

    MessageService.__instance = this;
  }

  public getMessageList(from = 0): void {
    this.waitForConnection().then(() => {
      JSON.stringify({
        content: `${from}`,
        type: 'get old'
      });
    });
  }

  // public sendMessage(content: string): void {
  //   this.waitForConnection(() => {
  //     if (this.socket) {
  //       this.socket.send(
  //         JSON.stringify({
  //           content,
  //           type: 'message'
  //         })
  //       );
  //     }
  //   });
  // }

  public listenMessageList(callback: (data: SocketMessage[]) => void): void {
    if (this.socket) {
      this.socket.addEventListener('message', (event) => {
        console.log(event.data);
        callback(JSON.parse(event.data));
      });
    }
  }

  public waitForConnection(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.socket?.readyState === 1) {
        resolve();
      } else {
        reject();
      }
    });
  }

  public openSocket(url: string): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.socket) {
        this.socket.close();
      }
      this.socket = new WebSocket(url);

      this.socket.addEventListener('open', () => {
        resolve();
      });

      this.socket.addEventListener('close', () => {});
    });
  }
}

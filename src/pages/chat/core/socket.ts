/* eslint-disable no-console */
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

  public openSocket(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('message', (event) => {
      console.log(JSON.parse(event.data));
    });

    this.socket.addEventListener('error', (event) => {
      // @ts-ignore
      console.log('Ошибка', event.message);
    });
  }
}

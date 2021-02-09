export class Dialog {
    constructor(public id: number, public name: string, public text: string, public time: string, public messageCount?: number) {
    }
}

type MessageClassName = 'incoming' | 'outgoing';

export class Message {
    constructor(public id: number, public className: MessageClassName, public text: string, public date: string) {
    }
}

export class Chat {
    constructor(public id: number, public name: string, public messageList: Message[]) {
    }
}

export interface Constructable<T> {
    new(...args: any) : T;
}

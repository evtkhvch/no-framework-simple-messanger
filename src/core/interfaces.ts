type MessageClassName = 'incoming' | 'outgoing';

export class Message {
    constructor(public id: number, public className: MessageClassName, public text: string, public date: string) {
    }
}

export interface Constructable<T> {
    new(...args: any): T;
}

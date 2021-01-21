export class Dialog {
    constructor(id, name, text, time, messageCount) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.time = time;
        this.messageCount = messageCount;
    }
}
export class Message {
    constructor(id, className, text, date) {
        this.id = id;
        this.className = className;
        this.text = text;
        this.date = date;
    }
}
export class Chat {
    constructor(id, name, messageList) {
        this.id = id;
        this.name = name;
        this.messageList = messageList;
    }
}
//# sourceMappingURL=interfaces.js.map
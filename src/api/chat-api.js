import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';
export class ChatApi {
    constructor() {
        this.httpClient = new HTTPClient();
    }
    chats() {
        return this.httpClient.get(`${environment.praktikum}/chats`, {
            data: {},
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.response).then(res => JSON.parse(res));
    }
    createChat(title) {
        return this.httpClient.post(`${environment.praktikum}/chats`, {
            data: JSON.stringify({ title }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.status === 200);
    }
}
//# sourceMappingURL=chat-api.js.map
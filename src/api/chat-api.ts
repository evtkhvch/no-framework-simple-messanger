import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';

export class ChatApi {
    private httpClient = new HTTPClient();

    public chats(): Promise<Chat[]> {
        return this.httpClient.get(`${environment.praktikum}/chats`, {
            data: {},
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.response).then(res => JSON.parse(res))
    }
}

export interface Chat {
    id: number;
    title: string;
    avatar: string;
}
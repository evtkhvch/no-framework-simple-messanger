import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';

export class AuthApi {
    private httpClient = new HTTPClient();

    public signIn(login: string, password: string): Promise<any> {
        return this.httpClient.post(`${environment.praktikum}/v2/auth/signin`, {
            data: { login, password },
            headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
        });
    }
}

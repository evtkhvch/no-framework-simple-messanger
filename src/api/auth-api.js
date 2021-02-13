import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';
export class AuthApi {
    constructor() {
        this.httpClient = new HTTPClient();
    }
    signIn(login, password) {
        return this.httpClient.post(`${environment.praktikum}/v2/auth/signin`, {
            data: { login, password },
            headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
        });
    }
    signUp(data) {
        return this.httpClient.post(`${environment.praktikum}/v2/auth/signup`, {
            data,
            headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
        });
    }
    logout() {
        return this.httpClient.post(`${environment.praktikum}/v2/auth/logout`, {
            data: {},
            headers: { 'accept': 'application/json' }
        });
    }
}
//# sourceMappingURL=auth-api.js.map
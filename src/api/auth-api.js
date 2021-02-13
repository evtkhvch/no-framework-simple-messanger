import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';
export class AuthApi {
    constructor() {
        this.httpClient = new HTTPClient();
    }
    signIn(login, password) {
        return this.httpClient.post(`${environment.praktikum}/auth/signin`, {
            data: { login, password },
            headers: { 'Content-Type': 'application/json' }
        });
    }
    signUp(data) {
        return this.httpClient.post(`${environment.praktikum}/auth/signup`, {
            data,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    logout() {
        return this.httpClient.post(`${environment.praktikum}/auth/logout`, {
            data: {},
            headers: {}
        });
    }
    user() {
        return this.httpClient.post(`${environment.praktikum}/auth/user`, {
            data: {},
            headers: {}
        });
    }
}
//# sourceMappingURL=auth-api.js.map
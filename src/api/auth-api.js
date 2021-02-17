import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';
export class AuthApi {
    constructor() {
        this.httpClient = new HTTPClient();
    }
    signIn(login, password) {
        return this.httpClient.post(`${environment.praktikum}/auth/signin`, {
            data: JSON.stringify({ login, password }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.status === 200);
    }
    signUp(data) {
        return this.httpClient.post(`${environment.praktikum}/auth/signup`, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.status === 200);
    }
    logout() {
        return this.httpClient.post(`${environment.praktikum}/auth/logout`, {
            data: JSON.stringify({}),
            headers: {}
        }).then(res => res.status === 200);
    }
    user() {
        return this.httpClient.get(`${environment.praktikum}/auth/user`, {
            data: {},
            headers: {}
        }).then(res => res.response).then(res => JSON.parse(res));
    }
}
//# sourceMappingURL=auth-api.js.map
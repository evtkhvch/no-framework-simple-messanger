import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';

export class AuthApi {
    private httpClient = new HTTPClient();

    public signIn(login: string, password: string): Promise<XMLHttpRequest> {
        return this.httpClient.post(`${environment.praktikum}/auth/signin`, {
            data: { login, password },
            headers: { 'Content-Type': 'application/json' }
        });
    }

    public signUp(data: SignUpReq): Promise<XMLHttpRequest> {
        return this.httpClient.post(`${environment.praktikum}/auth/signup`, {
            data,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    public logout(): Promise<XMLHttpRequest> {
        return this.httpClient.post(`${environment.praktikum}/auth/logout`, {
            data: {},
            headers: {}
        });
    }

    public user(): Promise<XMLHttpRequest> {
        return this.httpClient.post(`${environment.praktikum}/auth/user`, {
            data: {},
            headers: {}
        });
    }
}

export interface SignUpReq {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

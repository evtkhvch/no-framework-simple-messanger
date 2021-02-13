import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';

export class AuthApi {
    private httpClient = new HTTPClient();

    public signIn(login: string, password: string): Promise<XMLHttpRequest> {
        return this.httpClient.post(`${environment.praktikum}/v2/auth/signin`, {
            data: { login, password },
            headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
        });
    }

    public signUp(data: SignUpReq): Promise<XMLHttpRequest> {
        return this.httpClient.post(`${environment.praktikum}/v2/auth/signup`, {
            data,
            headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
        });
    }

    public logout(): Promise<XMLHttpRequest> {
        return this.httpClient.post(`${environment.praktikum}/v2/auth/logout`, {
            data: {},
            headers: { 'accept': 'application/json' }
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

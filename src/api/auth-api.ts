import { HTTPClient } from '../core/http-client';
import { environment } from '../enviroment/enviroment';

export class AuthApi {
    private httpClient = new HTTPClient();

    public signIn(login: string, password: string): Promise<XMLHttpRequest> {
        return this.httpClient.post(`${environment.praktikum}/auth/signin`, {
            data: JSON.stringify({ login, password }),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    public signUp(data: SignUpReq): Promise<XMLHttpRequest> {
        return this.httpClient.post(`${environment.praktikum}/auth/signup`, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    public logout(): Promise<XMLHttpRequest> {
        return this.httpClient.post(`${environment.praktikum}/auth/logout`, {
            data: JSON.stringify({}),
            headers: {}
        });
    }

    public user(): Promise<XMLHttpRequest> {
        return this.httpClient.get(`${environment.praktikum}/auth/user`, {
            data: {},
            headers: {}
        })
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

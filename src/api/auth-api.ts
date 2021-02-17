import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';

export class AuthApi {
    private httpClient = new HTTPClient();

    public signIn(login: string, password: string): Promise<boolean> {
        return this.httpClient.post(`${environment.praktikum}/auth/signin`, {
            data: JSON.stringify({ login, password }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.status === 200);
    }

    public signUp(data: SignUpReq): Promise<XMLHttpRequest> {
        return this.httpClient.post(`${environment.praktikum}/auth/signup`, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    public logout(): Promise<boolean> {
        return this.httpClient.post(`${environment.praktikum}/auth/logout`, {
            data: JSON.stringify({}),
            headers: {}
        }).then(res => res.status === 200);
    }

    public user(): Promise<User> {
        return this.httpClient.get(`${environment.praktikum}/auth/user`, {
            data: {},
            headers: {}
        }).then(res => res.response).then(res => JSON.parse(res));
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

export interface User {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

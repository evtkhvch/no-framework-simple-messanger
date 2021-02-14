import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';
import { User } from './auth-api';

export class UserApi {
    private httpClient = new HTTPClient();

    public changeProfile(data: Profile): Promise<Profile> {
        return this.httpClient.put(`${environment.praktikum}/user/profile`, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.response).then(res => JSON.parse(res))
    }

    public changeProfileAvatar(data: FormData): Promise<User> {
        return this.httpClient.put(`${environment.praktikum}/user/profile/avatar`, {
            data,
            headers: {}
        }).then(res => res.response).then(res => JSON.parse(res))
    }

    public changeProfilePassword(oldPassword: string, newPassword: string): Promise<boolean> {
        return this.httpClient.put(`${environment.praktikum}/user/password`, {
            data: JSON.stringify({ oldPassword, newPassword }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.status === 200)
    }
}

export interface Profile {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

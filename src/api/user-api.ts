import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';

export class UserApi {
    private httpClient = new HTTPClient();

    public changeProfile(data: Profile): Promise<Profile> {
        return this.httpClient.put(`${environment.praktikum}/user/profile`, {
            data,
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.response).then(res => JSON.parse(res))
    }

    public changeProfileAvatar(avatar: any): Promise<boolean> {
        return this.httpClient.put(`${environment.praktikum}/user/profile/avatar`, {
            data: {},
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => res.status === 200)
    }

    public changeProfilePassword(oldPassword: string, newPassword: string): Promise<boolean> {
        return this.httpClient.put(`${environment.praktikum}/user/password`, {
            data: { oldPassword, newPassword },
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

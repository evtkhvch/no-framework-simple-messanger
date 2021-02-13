import { HTTPClient } from '../core/http-client';
import { environment } from '../enviroment/enviroment';

export class UserApi {
    private httpClient = new HTTPClient();

    public changeProfile(data: Profile): Promise<XMLHttpRequest> {
        return this.httpClient.put(`${environment.praktikum}/user/profile`, {
            data,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    public changeProfileAvatar(avatar: any): Promise<XMLHttpRequest> {
        return this.httpClient.put(`${environment.praktikum}/user/profile/avatar`, {
            data: {},
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    public changeProfilePassword(oldPassword: string, newPassword: string): Promise<XMLHttpRequest> {
        return this.httpClient.put(`${environment.praktikum}/user/password`, {
            data: { oldPassword, newPassword },
            headers: { 'Content-Type': 'multipart/form-data' }
        });
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

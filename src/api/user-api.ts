import { HTTPClient } from '../core/http-client';
import { environment } from '../enviroment/enviroment';
import { Profile } from '../interfaces/profile';

export class UserApi {
    private httpClient = new HTTPClient();

    public changeProfile(data: Profile): Promise<XMLHttpRequest> {
        return this.httpClient.put(`${environment.praktikum}/user/profile`, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    public changeProfileAvatar(data: FormData): Promise<XMLHttpRequest> {
        return this.httpClient.put(`${environment.praktikum}/user/profile/avatar`, {
            data,
            headers: {}
        });
    }

    public changeProfilePassword(oldPassword: string, newPassword: string): Promise<XMLHttpRequest> {
        return this.httpClient.put(`${environment.praktikum}/user/password`, {
            data: JSON.stringify({ oldPassword, newPassword }),
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


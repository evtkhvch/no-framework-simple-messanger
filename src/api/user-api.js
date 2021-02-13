import { HTTPClient } from '../core/http-client';
import { environment } from '../enviroment/enviroment';
export class UserApi {
    constructor() {
        this.httpClient = new HTTPClient();
    }
    changeProfile(data) {
        return this.httpClient.put(`${environment.praktikum}/user/profile`, {
            data,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    changeProfileAvatar(avatar) {
        return this.httpClient.put(`${environment.praktikum}/user/profile/avatar`, {
            data: {},
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
    changeProfilePassword(oldPassword, newPassword) {
        return this.httpClient.put(`${environment.praktikum}/user/password`, {
            data: { oldPassword, newPassword },
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
}
//# sourceMappingURL=user-api.js.map
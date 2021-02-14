import { HTTPClient } from '../core/http-client.js';
import { environment } from '../enviroment/enviroment.js';
export class UserApi {
    constructor() {
        this.httpClient = new HTTPClient();
    }
    changeProfile(data) {
        return this.httpClient.put(`${environment.praktikum}/user/profile`, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.response).then(res => JSON.parse(res));
    }
    changeProfileAvatar(data) {
        return this.httpClient.put(`${environment.praktikum}/user/profile/avatar`, {
            data,
            headers: {}
        }).then(res => res.response).then(res => JSON.parse(res));
    }
    changeProfilePassword(oldPassword, newPassword) {
        return this.httpClient.put(`${environment.praktikum}/user/password`, {
            data: JSON.stringify({ oldPassword, newPassword }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.status === 200);
    }
}
//# sourceMappingURL=user-api.js.map
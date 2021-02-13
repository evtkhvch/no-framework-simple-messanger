var METHOD;
(function (METHOD) {
    METHOD["GET"] = "GET";
    METHOD["POST"] = "POST";
    METHOD["PUT"] = "PUT";
    METHOD["DELETE"] = "DELETE";
})(METHOD || (METHOD = {}));
export class HTTPClient {
    constructor() {
        this.get = (url, options) => {
            const data = queryStringify(options.data);
            const newUrl = `${url}${data}`;
            return this.request(newUrl, Object.assign(Object.assign({}, options), { method: METHOD.GET }), options.timeout);
        };
        this.put = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHOD.PUT }), options.timeout);
        };
        this.post = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHOD.POST }), options.timeout);
        };
        this.delete = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHOD.DELETE }), options.timeout);
        };
        this.request = (url, options, timeout = 5000) => {
            const { method, data, headers } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                xhr.open(method, url);
                if (headers) {
                    for (let key in headers) {
                        if (headers.hasOwnProperty(key)) {
                            xhr.setRequestHeader(key, headers[key]);
                        }
                    }
                }
                xhr.timeout = timeout;
                xhr.onload = () => {
                    resolve(xhr);
                };
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                if (method === METHOD.GET || !data) {
                    xhr.send();
                }
                else {
                    xhr.send(JSON.stringify(data));
                }
            });
        };
    }
}
const queryStringify = (data) => {
    if (!data) {
        return '';
    }
    else {
        let str = [];
        for (let p in data) {
            if (data.hasOwnProperty(p)) {
                str.push(p + '=' + data[p]);
            }
        }
        const params = str.join('&');
        return `?${params}`;
    }
};
class Http {
}
//# sourceMappingURL=http-client.js.map
enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export class HTTPClient implements Http {
    public get = (url: string, options: HTTPClientOptions): Promise<XMLHttpRequest> => {
        const data = queryStringify(options.data);
        const newUrl = `${url}${data}`;

        return this.request(newUrl, { ...options, method: METHOD.GET }, options.timeout);
    };

    public put = (url: string, options: HTTPClientOptions): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
    };

    public post = (url: string, options: HTTPClientOptions): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
    };

    public delete = (url: string, options: HTTPClientOptions): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
    };

    private request = (url: string, options: RequestOptions, timeout = 5000): Promise<XMLHttpRequest> => {
        const { method, data, headers } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

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
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

const queryStringify = <T extends object>(data: T): string => {
    if (!data) {
        return '';
    } else {
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

abstract class Http {
    abstract get(url: string, options: HTTPClientOptions): Promise<XMLHttpRequest>;

    abstract put(url: string, options: HTTPClientOptions): Promise<XMLHttpRequest>;

    abstract post(url: string, options: HTTPClientOptions): Promise<XMLHttpRequest>;

    abstract delete(url: string, options: HTTPClientOptions): Promise<XMLHttpRequest>;
}

interface HTTPClientOptions {
    headers?: any;
    data: any;
    timeout?: number;
}

interface RequestOptions {
    method: METHOD;
    data: any;
    headers?: any;
}

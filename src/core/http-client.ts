import { ErrorInterceptor } from './interceptors';
import { queryStringify } from '../utils/utils';
import { Http, HTTPClientOptions, METHOD, RequestOptions } from '../interfaces/http';

export class HTTPClient implements Http {
    public interceptor = new ErrorInterceptor();

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

        const response = new Promise<XMLHttpRequest>((resolve, reject) => {
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
            xhr.onerror = () => reject;
            xhr.ontimeout = reject;

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });

        return this.interceptor.intercept(response);
    };
}

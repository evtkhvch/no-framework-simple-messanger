export interface Http {
    get(url: string, options: HTTPClientOptions): Promise<XMLHttpRequest>;
    put(url: string, options: HTTPClientOptions): Promise<XMLHttpRequest>;
    post(url: string, options: HTTPClientOptions): Promise<XMLHttpRequest>;
    delete(url: string, options: HTTPClientOptions): Promise<XMLHttpRequest>;
}

export interface HTTPClientOptions {
    headers?: any;
    data: any;
    timeout?: number;
}

export interface RequestOptions {
    method: METHOD;
    data: any;
    headers?: { [name: string]: string };
}

export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

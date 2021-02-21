import { router } from '../index.js';

interface HttpHandler {
    handle(req: Promise<XMLHttpRequest>): Promise<XMLHttpRequest>
}

interface HttpInterceptor {
    intercept(req: Promise<XMLHttpRequest>, next: HttpHandler): Promise<XMLHttpRequest>
}

export class ErrorInterceptor implements HttpInterceptor {
    public intercept(req: Promise<XMLHttpRequest>, next?: HttpHandler): Promise<XMLHttpRequest> {
        req.then(res => {
            if (res.status === 401) {
                router.go('/login');
            }
        });

        return req;
    }
}

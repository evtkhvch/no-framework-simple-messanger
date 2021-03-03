import { Router } from './router';

interface HttpHandler {
  handle(req: Promise<XMLHttpRequest>): Promise<XMLHttpRequest>;
}

interface HttpInterceptor {
  intercept(req: Promise<XMLHttpRequest>, next: HttpHandler): Promise<XMLHttpRequest>;
}

export class ErrorInterceptor implements HttpInterceptor {
  private router = new Router('.app');

  public intercept(req: Promise<XMLHttpRequest>): Promise<XMLHttpRequest> {
    req.then((res) => {
      if (res.status === 401) {
        this.router.go('/login');
      }
    });

    return req;
  }
}

import { expect } from 'chai';
import { Router } from '../src/core/router';
import { loginComponent } from '../src/pages/login/login';

describe('Routing', async () => {
  it('Router use returns this', () => {
    const router = new Router('.app');
    const use = router.use('/login', loginComponent);

    expect(use).to.be.an.instanceof(Router);
  });

  it('Router use push route', () => {
    const router = new Router('.app');
    router.use('/login', loginComponent);
    const route = router.getRoute('/login');

    expect(router.routes).to.include(route);
  });

  it('Router is singleton', () => {
    const first = new Router('.app');
    const second = new Router('.app');

    expect(first).to.equal(second);
  });
});

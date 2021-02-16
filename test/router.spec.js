import { Router } from '../src/core/router.js';
import { LoginComponent, loginProps } from '../src/pages/login/login.js';
import { expect } from 'chai';
describe('Router usage', () => {
    it('should return Router instance', () => {
        const router = new Router('.app');
        expect(router.use('/login', LoginComponent, loginProps)).to.be.an.instanceof(Router);
    });
});
//# sourceMappingURL=router.spec.js.map
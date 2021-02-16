import { Router } from '../src/core/router.js';
import { expect } from 'chai';
import { Route } from '../src/core/route.js';
import { LoginComponent, loginProps } from '../src/pages/login/login.js';
import * as Handlebars from 'handlebars';

describe('Router usage', () => {
    it('should return Router instance', () => {
        window.Handlebars = Handlebars;
        const router = new Router('.app');
        const route = router.use('/login', LoginComponent, loginProps).getRoute('/login')
        expect(route).to.be.an.instanceof(Route);
    });
});

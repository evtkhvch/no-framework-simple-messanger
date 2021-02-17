import { AuthApi } from '../src/api/auth-api';
import { expect } from 'chai';

describe('Api', async () => {
    describe('Auth', async () => {
        it('Sign in', () => {
            const authApi = new AuthApi();

            authApi.signIn('string', 'string').then(res => {
                expect(res).to.be.true;
            })
        });
    });
});

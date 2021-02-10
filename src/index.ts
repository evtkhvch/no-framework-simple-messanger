import { Router } from './core/router.js';
import { loginComponent } from './pages/login/login.js';
import { registrationComponent } from './pages/registration/registration.js';
import { profileComponent } from './pages/profile/profile.js';
import { chatComponent } from './pages/chat/chat.js';
import { changeProfilePassComponent } from './pages/change-profile-pass/change-profile-pass.js';
import { changeProfileDataComponent } from './pages/change-profile-data/change-profile-data.js';
import { errorPage } from './pages/error-page/error-page.js';
import { notFoundPageComponent } from './pages/not-found-page/not-found-page.js';

const router = new Router('.app');

router
    .use('/login', loginComponent)
    .use('/registration', registrationComponent)
    .use('/profile', profileComponent)
    .use('/chat', chatComponent)
    .use('/change-profile-pass', changeProfilePassComponent)
    .use('/change-profile-data', changeProfileDataComponent)
    .use('/error', errorPage)
    .use('/not-found', notFoundPageComponent)
    .start();

if (window.location.pathname === '/') {
    router.go('/login');
}

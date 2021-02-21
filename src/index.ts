import { Router } from './core/router.js';
import { loginComponent } from './pages/login/login.js';
import { registrationComponent } from './pages/registration/registration.js';
import { profileComponent } from './pages/profile/profile.js';
import { chatComponent } from './pages/chat/chat.js';
import { changeProfilePassComponent } from './pages/change-profile-pass/change-profile-pass.js';
import { changeProfileDataComponent } from './pages/change-profile-data/change-profile-data.js';
import { errorComponent } from './pages/error-page/error-page.js';
import { notFoundComponent } from './pages/not-found-page/not-found-page.js';

const ROUTES: string[] = [ '/login', '/registration', '/profile', '/chat', '/change-profile-pass', '/change-profile-data', '/error', '/not-found', '/' ];

export const router = new Router('.app');

router
    .use('/login', loginComponent)
    .use('/registration', registrationComponent)
    .use('/profile', profileComponent)
    .use('/chat', chatComponent)
    .use('/change-profile-pass', changeProfilePassComponent)
    .use('/change-profile-data', changeProfileDataComponent)
    .use('/error', errorComponent)
    .use('/not-found', notFoundComponent)
    .start();

if (window.location.pathname === '/') {
    router.go('/login');
}

if (!ROUTES.includes(window.location.pathname)) {
    router.go('/not-found');
}

import { Router } from './core/router.js';
import { loginProps, LoginComponent } from './pages/login/login.js';
import { RegistrationComponent, registrationProps } from './pages/registration/registration.js';
import { ProfileComponent, profileProps } from './pages/profile/profile.js';
import { ChatComponent, chatProps } from './pages/chat/chat.js';
import { ChangeProfilePassComponent, changeProfilePassProps } from './pages/change-profile-pass/change-profile-pass.js';
import { ChangeProfileDataComponent, changeProfileDataProps } from './pages/change-profile-data/change-profile-data.js';
import { ErrorComponent, errorProps } from './pages/error-page/error-page.js';
import { NotFoundComponent, notFoundProps } from './pages/not-found-page/not-found-page.js';
const ROUTES = ['/login', '/registration', '/profile', '/chat', '/change-profile-pass', '/change-profile-data', '/error', '/not-found', '/'];
const router = new Router('.app');
router
    .use('/login', LoginComponent, loginProps)
    .use('/registration', RegistrationComponent, registrationProps)
    .use('/profile', ProfileComponent, profileProps)
    .use('/chat', ChatComponent, chatProps)
    .use('/change-profile-pass', ChangeProfilePassComponent, changeProfilePassProps)
    .use('/change-profile-data', ChangeProfileDataComponent, changeProfileDataProps)
    .use('/error', ErrorComponent, errorProps)
    .use('/not-found', NotFoundComponent, notFoundProps)
    .start();
if (window.location.pathname === '/') {
    router.go('/login');
}
if (!ROUTES.includes(window.location.pathname)) {
    router.go('/not-found');
}
//# sourceMappingURL=index.js.map
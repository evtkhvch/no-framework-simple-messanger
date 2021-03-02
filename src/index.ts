import { Router } from './core/router';
import { loginComponent } from './pages/login/login';
import { registrationComponent } from './pages/registration/registration';
import { profileComponent } from './pages/profile/profile';
import { chatComponent } from './pages/chat/chat';
import { changeProfilePassComponent } from './pages/change-profile-pass/change-profile-pass';
import { changeProfileDataComponent } from './pages/change-profile-data/change-profile-data';
import { errorComponent } from './pages/error-page/error-page';
import { notFoundComponent } from './pages/not-found-page/not-found-page';
import './styles/index.sass';

const ROUTES: string[] = [
  '/login',
  '/registration',
  '/profile',
  '/chat',
  '/change-profile-pass',
  '/change-profile-data',
  '/error',
  '/not-found',
  '/'
];

const router = new Router('.app');

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

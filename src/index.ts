import { Router } from './core/router.js';
import { loginComponent } from './pages/login/login.js';

const router = new Router(".app");

router
    .use("/", loginComponent)
    .start();

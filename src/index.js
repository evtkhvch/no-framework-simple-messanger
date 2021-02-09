import { Router } from './core/router.js';
import { LoginComponent } from './pages/login/login.js';
const router = new Router(".app");
router
    .use("/", LoginComponent)
    .start();
//# sourceMappingURL=index.js.map
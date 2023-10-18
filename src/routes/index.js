import { HeaderOnly } from '~/Layout';

import Home from '~/pages/Home';
import About from '~/pages/About';
import Register from '~/pages/Register';
import Login from '~/pages/Login';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/register', component: Register, layout: HeaderOnly },
    { path: '/login', component: Login, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

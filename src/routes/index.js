import { HeaderOnly } from '~/Layout';

import Home from '~/components/pages/Home';
import About from '~/components/pages/About';
import Register from '~/components/pages/Register';
import Login from '~/components/pages/Login';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/register', component: Register, layout: HeaderOnly },
    { path: '/login', component: Login, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

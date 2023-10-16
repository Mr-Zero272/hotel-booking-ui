import { HeaderOnly } from '~/Layout';

import Home from '~/components/pages/Home';
import About from '~/components/pages/About';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

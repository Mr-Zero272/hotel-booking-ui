import { HeaderOnly } from '~/Layout';

import Home from '~/pages/Home';
import About from '~/pages/About';
import Register from '~/pages/Register';
import Login from '~/pages/Login';
import Admin from '~/Admin/admin';
import PieChart from '~/Admin/PieChart';
import LineChart from '~/Admin/LineChart';
import Calendar from '~/Admin/Calendar';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/register', component: Register, layout: HeaderOnly },
    { path: '/login', component: Login, layout: HeaderOnly },
    { path: '/admin', component: Admin },
    { path: '/piechart', component: PieChart },
    { path: '/linechart', component: LineChart },
    { path: '/calendar', component: Calendar },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

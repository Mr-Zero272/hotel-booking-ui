import { HeaderOnly } from '~/Layout';

import Home from '~/pages/Home';
import About from '~/pages/About';
import Register from '~/pages/Register';
import Login from '~/pages/Login';
import Admin from '~/Admin/admin';
import PieChart from '~/Admin/PieChart';
import LineChart from '~/Admin/LineChart';
import Calendar from '~/Admin/Calendar';
import Room from '~/pages/Room';
import Room_Add from '~/pages/Room_Add';
import Room_Edit from '~/pages/Room_Edit';


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/register', component: Register, layout: HeaderOnly },
    { path: '/login', component: Login, layout: HeaderOnly },
    { path: '/admin', component: Admin },
    { path: '/piechart', component: PieChart },
    { path: '/linechart', component: LineChart },
    { path: '/calendar', component: Calendar },
    { path: '/room-list', component: Room },
    { path: '/room-add', component: Room_Add, layout: HeaderOnly},
    { path: '/room-edit/:id', component: Room_Edit },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

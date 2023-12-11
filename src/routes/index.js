import { HeaderOnly } from '~/Layout';

import Home from '~/pages/Home';
import About from '~/pages/About';
import Register from '~/pages/Register';
import Login from '~/pages/Login';
import Ticket from '~/pages/Ticket';
import Checkout from '~/pages/Checkout';
import YourTickets from '~/pages/YourTickets';
import HotelDetails from '~/pages/Hotel';
import CreatePost from '~/pages/CreatePost';
import Admin from '~/Admin/admin';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/register', component: Register, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/cart', component: Ticket },
    { path: '/checkout', component: Checkout },
    { path: '/ticket', component: YourTickets },
    { path: '/hotel/:id', component: HotelDetails },
    { path: '/admin', component: Admin },
    { path: '/createpost', component: CreatePost, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

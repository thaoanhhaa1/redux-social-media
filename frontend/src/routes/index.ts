import config from '../config';
import DefaultLayout from '../layouts/DefaultLayout';
import Home from '../pages/Home';

const publicRoutes = [
    {
        path: config.routes.home,
        element: Home,
        layout: DefaultLayout,
    },
];

export { publicRoutes };

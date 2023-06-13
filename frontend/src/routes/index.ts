import config from '../config';
import DefaultLayout from '../layouts/DefaultLayout';
import Explore from '../pages/Explore';
import Home from '../pages/Home';

const publicRoutes = [
    {
        path: config.routes.home,
        element: Home,
        layout: DefaultLayout,
    },
    {
        path: config.routes.explore,
        element: Explore,
        layout: DefaultLayout,
    },
];

export { publicRoutes };

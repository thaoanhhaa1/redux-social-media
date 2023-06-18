import config from '../config';
import DefaultLayout from '../layouts/DefaultLayout';
import Bookmark from '../pages/Bookmark';
import Explore from '../pages/Explore';
import Home from '../pages/Home';
import Message from '../pages/Message';
import Notifications from '../pages/Notifications';

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
    {
        path: config.routes.notifications,
        element: Notifications,
        layout: DefaultLayout,
    },
    {
        path: config.routes.messages,
        element: Message,
        layout: DefaultLayout,
    },
    {
        path: config.routes.bookmarks,
        element: Bookmark,
        layout: DefaultLayout,
    },
];

export { publicRoutes };

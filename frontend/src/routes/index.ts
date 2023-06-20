import config from '../config';
import { IRoute } from '../interfaces';
import Bookmark from '../pages/Bookmark';
import Explore from '../pages/Explore';
import Home from '../pages/Home';
import Lists from '../pages/Lists';
import Message from '../pages/Message';
import Notifications from '../pages/Notifications';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

const publicRoutes: IRoute[] = [
    {
        path: config.routes.home,
        element: Home,
    },
    {
        path: config.routes.explore,
        element: Explore,
    },
    {
        path: config.routes.notifications,
        element: Notifications,
    },
    {
        path: config.routes.messages,
        element: Message,
    },
    {
        path: config.routes.bookmarks,
        element: Bookmark,
    },
    {
        path: config.routes.lists,
        element: Lists,
    },
    {
        path: config.routes.profile,
        element: Profile,
    },
    {
        path: config.routes.settings,
        element: Settings,
    },
];

export { publicRoutes };

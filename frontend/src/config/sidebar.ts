import {
    BookmarkIcon,
    ExploreIcon,
    HomeIcon,
    ListIcon,
    MessageIcon,
    NotificationIcon,
    ProfileIcon,
    SettingIcon,
} from '../components/Icons';
import { ISidebar } from '../interfaces';
import routes from './routes';

const sidebar: ISidebar[] = [
    {
        icon: HomeIcon,
        title: 'Home',
        link: routes.home,
    },
    {
        icon: ExploreIcon,
        title: 'Explore',
        link: routes.explore,
    },
    {
        icon: NotificationIcon,
        title: 'Notifications',
        link: routes.notifications,
    },
    {
        icon: MessageIcon,
        title: 'Messages',
        link: routes.messages,
    },
    {
        icon: BookmarkIcon,
        title: 'Bookmarks',
        link: routes.bookmarks,
    },
    {
        icon: ListIcon,
        title: 'Lists',
        link: routes.lists,
    },
    {
        icon: ProfileIcon,
        title: 'Profile',
        link: routes.profile,
    },
    {
        icon: SettingIcon,
        title: 'Settings',
        link: routes.settings,
    },
];

export default sidebar;

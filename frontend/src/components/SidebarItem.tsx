import { NavLink } from 'react-router-dom';
import { ISidebar } from '../interfaces';
import { classNames } from '../utils';

const SidebarItem = ({ sidebarItem }: { sidebarItem: ISidebar }) => {
    const Icon = sidebarItem.icon;

    return (
        <NavLink
            to={sidebarItem.link}
            className={({ isActive }) =>
                classNames(
                    isActive
                        ? '!text-blue !fill-blue active dark:bg-dark-black-3'
                        : 'text-black-8 fill-black-8 dark:bg-dark-black-2',
                    'flex gap-4 p-4 rounded-[10px] hover:text-blue-white-2 hover:fill-blue-white-2 transition-all',
                )
            }
        >
            <Icon className="w-4 h-4" />
            <span className="font-semibold text-sm leading-sm">
                {sidebarItem.title}
            </span>
        </NavLink>
    );
};

export default SidebarItem;

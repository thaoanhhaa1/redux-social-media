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
                        ? 'bg-blue-blue-white-4 !text-blue !fill-blue active'
                        : 'bg-dark-mude-white text-black-8 fill-black-8',
                    'flex gap-4 p-4 rounded-[10px] hover:text-blue-white-2 hover:fill-blue-white-2 transition-all',
                )
            }
        >
            <Icon className="w-4 h-4" />
            <span className="font-semibold text-sm leading-[17px]">
                {sidebarItem.title}
            </span>
        </NavLink>
    );
};

export default SidebarItem;

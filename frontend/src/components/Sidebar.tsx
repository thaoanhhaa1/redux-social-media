import { Link } from 'react-router-dom';
import config from '../config';
import SidebarItem from './SidebarItem';
import { v4 } from 'uuid';
import Image from './Image';

const Sidebar = () => {
    return (
        <div className="sticky top-0 h-fit w-[var(--sidebar-left-width)] flex-shrink-0 p-5 min-h-screen shadow-[0px_5px_45px_#EBEBED] dark:shadow-none dark:bg-dark-black-2">
            <div className="flex items-center gap-4">
                <Link to={config.routes.home}>
                    <Image src="Vector.svg" alt="" />
                </Link>
                <span className="font-medium text-sm text-dark-black-1 dark:text-white leading-sm">
                    Hoque
                </span>
            </div>
            <div className="mt-[41px]">
                {config.sidebar.map((sidebarItem) => (
                    <SidebarItem key={v4()} sidebarItem={sidebarItem} />
                ))}
            </div>
            <button className="mt-10 w-full p-[15px] font-semibold bg-blue-blue-white-2 text-sm text-white leading-sm rounded-[10px]">
                Tweet
            </button>
        </div>
    );
};

export default Sidebar;

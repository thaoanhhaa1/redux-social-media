import { Link } from 'react-router-dom';
import config from '../config';
import SidebarItem from './SidebarItem';
import { v4 } from 'uuid';
import Image from './Image';

const Sidebar = () => {
    return (
        <div className="sticky top-0 h-fit w-[237px] flex-shrink-0 p-5 min-h-screen shadow-[0px_5px_45px_#EBEBED]">
            <div className="flex items-center gap-4">
                <Link to={config.routes.home}>
                    <Image src="Vector.svg" alt="" />
                </Link>
                <span className="font-medium text-sm text-dark-black-1 leading-[17px]">
                    Hoque
                </span>
            </div>
            <div className="mt-[41px]">
                {config.sidebar.map((sidebarItem) => (
                    <SidebarItem key={v4()} sidebarItem={sidebarItem} />
                ))}
            </div>
            <button className="mt-10 w-full p-[15px] font-semibold bg-blue-blue-white-2 text-sm text-white leading-[17px] rounded-[10px]">
                Tweet
            </button>
        </div>
    );
};

export default Sidebar;

import { useSelector } from 'react-redux';
import { DropdownIcon, SearchIcon } from './Icons';
import Image from './Image';
import { RootState } from '../app/store';
import Search from './search/Search';

const TopBar = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="z-40 fixed top-0 right-0 left-[var(--sidebar-left-width)] h-[var(--top-bar-height)] px-5 flex items-center justify-between bg-white dark:bg-dark-black-2 shadow-container dark:shadow-none">
            <div className="relative flex items-center flex-1 max-w-[649px] h-[43px] bg-white-1 dark:bg-dark-black-3 rounded-2.5">
                <span className="absolute left-5">
                    <SearchIcon className="fill-white-03 dark:fill-white" />
                </span>
                <input
                    placeholder="Search on twitter"
                    type="text"
                    className="w-full pl-12 pr-5 py-[14px] text-black dark:text-white bg-transparent font-medium text-xs leading-3.75 outline-none"
                />
                <Search />
            </div>
            <div className="flex items-center gap-2.5">
                <Image className="w-10 h-10" rounded src={user.avatar} alt="" />
                <div className="flex flex-col gap-1.25">
                    <span className="text-dark-black-1 dark:text-white font-semibold">
                        {user.username}
                    </span>
                    <span className="font-semibold text-black-8 dark:text-white text-sm leading-sm">
                        Profile
                    </span>
                </div>
                <DropdownIcon className="fill-dark-black-1 dark:fill-white" />
            </div>
        </div>
    );
};

export default TopBar;

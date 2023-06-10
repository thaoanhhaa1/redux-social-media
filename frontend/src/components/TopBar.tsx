import { DropdownIcon, SearchIcon } from './Icons';
import Image from './Image';

const TopBar = () => {
    return (
        <div className="h-[75px] px-5 flex items-center justify-between bg-white dark:bg-dark-black-2 shadow-[0px_5px_45px_#EBEBED]">
            <div className="relative flex items-center flex-1 max-w-[649px] h-[43px] bg-white-1 dark:bg-dark-black-3 rounded-[10px]">
                <span className="absolute left-5">
                    <SearchIcon className="fill-white-03 dark:fill-white" />
                </span>
                <input
                    placeholder="Search on twitter"
                    type="text"
                    className="w-full pl-12 pr-5 py-[14px] text-black dark:text-white bg-transparent font-medium text-xs leading-[15px] outline-none"
                />
            </div>
            <div className="flex items-center gap-[10px]">
                <Image
                    className="w-10 h-10 rounded-full"
                    src="https://cdn.openai.com/labs/images/A%20cyberpunk%20monster%20in%20a%20control%20room.webp?v=1"
                    alt=""
                />
                <div className="flex flex-col gap-[5px]">
                    <span className="text-dark-black-1 dark:text-white font-semibold">
                        Md mahmudul
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

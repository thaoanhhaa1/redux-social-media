import { DropdownIcon, SearchIcon } from './Icons';
import Image from './Image';

const TopBar = () => {
    return (
        <div className="h-[75px] px-5 flex items-center justify-between bg-white shadow-[0px_5px_45px_#EBEBED]">
            <div className="relative flex items-center flex-1 max-w-[649px] h-[43px] bg-white-white-1 rounded-[10px]">
                <span className="absolute left-5">
                    <SearchIcon></SearchIcon>
                </span>
                <input
                    placeholder="Search on twitter"
                    type="text"
                    className="w-full pl-12 pr-5 py-[14px] text-black bg-transparent font-medium text-xs leading-[15px] outline-none"
                />
            </div>
            <div className="flex items-center gap-[10px]">
                <Image
                    className="w-10 h-10 rounded-full"
                    src="https://scontent-hkt1-2.xx.fbcdn.net/v/t39.30808-1/298008203_2883113008649874_7546349808600317930_n.jpg?stp=dst-jpg_p320x320&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_ohc=7M3CrwxyU5kAX_7bHzJ&_nc_ht=scontent-hkt1-2.xx&oh=00_AfDIBdFe30dUfMz0geUGNoSfFdRQnmacQQVdPh8yzjJOCQ&oe=63E8A37E"
                    alt=""
                />
                <div className="flex flex-col gap-[5px]">
                    <span className="text-dark-black-1 font-semibold leading-[19px]">
                        Md mahmudul
                    </span>
                    <span className="font-semibold text-black-8 text-sm leading-[17px]">
                        Profile
                    </span>
                </div>
                <DropdownIcon />
            </div>
        </div>
    );
};

export default TopBar;

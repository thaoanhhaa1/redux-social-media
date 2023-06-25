import { CloseIcon } from '../Icons';
import Image from '../Image';

const SearchItem = () => {
    return (
        <div className="cursor-pointer group/close flex items-center gap-5 p-2 rounded-2.5 hover:bg-blue-white-4 dark:bg-dark-black-1 dark:hover:bg-dark-black-3 ease-linear duration-300">
            <Image
                rounded
                alt=""
                src="https://plus.unsplash.com/premium_photo-1686090449625-16579c8ac225?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                className="w-9 h-9"
            />

            <div className="flex-1 font-semibold text-base-black dark:text-white">
                Recent
            </div>
            <button className="w-6 h-6 flex justify-center items-center">
                <CloseIcon className="transition-all duration-300 stroke-stroke-icon group-hover/close:stroke-red dark:stroke-white" />
            </button>
        </div>
    );
};

export default SearchItem;

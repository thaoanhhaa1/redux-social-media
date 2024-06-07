import { ITrending } from '../../interfaces';

const TrendItem = ({ item }: { item: ITrending }) => {
    return (
        <div className='cursor-pointer rounded-2.5 gap-2 p-2 -mx-2 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all'>
            <div className='flex flex-col gap-[2px]'>
                <div className='text-xs leading-xs text-stroke-icon dark:text-[#736F72]'>
                    Trending
                </div>
                <div className='font-bold text-base-black dark:text-white capitalize work-break line-clamp-1'>
                    {item._id}
                </div>
                <div className='font-semibold text-sm leading-sm text-stroke-icon dark:text-[#736F72]'>
                    {item.quantity} Tweets
                </div>
            </div>
            <button className='-ml-1 p-1 text-base-black dark:text-white'>
                ...
            </button>
        </div>
    );
};

export default TrendItem;

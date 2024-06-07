import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { setActiveTrending } from '../../features/trending';
import { ITrending } from '../../interfaces';
import { classNames } from '../../utils';

const TrendItem = ({ item }: { item: ITrending }) => {
    const { active } = useAppSelector((state: RootState) => state.trending);
    const dispatch = useAppDispatch();

    const handleChange = () => dispatch(setActiveTrending(item._id));

    return (
        <div
            onClick={handleChange}
            className={classNames(
                'cursor-pointer rounded-2.5 gap-2 p-2 -mx-2 flex justify-between items-center transition-all',
                active === item._id
                    ? 'bg-blue-white-5 dark:bg-dark-black-3'
                    : 'hover:bg-gray-100 dark:hover:bg-white-opacity-10',
            )}
        >
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

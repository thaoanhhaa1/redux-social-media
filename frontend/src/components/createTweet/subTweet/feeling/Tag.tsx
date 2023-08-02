import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { setTag } from '../../../../features/myTweet';
import { XMarkIcon } from '../../../Icons';

const Tag = () => {
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const dispatch = useAppDispatch();

    const handleClick = () => dispatch(setTag(''));

    return (
        <div className='flex items-center flex-shrink-0 px-2.5 py-1 font-semibold text-sm leading-sm text-blue bg-blue-white-5 dark:bg-[rgba(45,_136,_255,_0.2)] rounded-md'>
            <span className='capitalize'>{myTweet.tag}...</span>
            <button
                onClick={handleClick}
                className='block -mr-1.5 p-1.5 rounded-full hover:bg-black-opacity-05 transition-all'
            >
                <XMarkIcon />
            </button>
        </div>
    );
};

export default Tag;

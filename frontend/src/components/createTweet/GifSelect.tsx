import { useSelector } from 'react-redux';
import { XMarkIcon } from '../Icons';
import Image from '../Image';
import { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks';
import { setGif } from '../../features/myTweet';

const GifSelect = () => {
    const gif = useSelector((state: RootState) => state.myTweet.gif);
    const dispatch = useAppDispatch();

    const handleClick = () => dispatch(setGif());

    if (!gif) return null;

    return (
        <div className='relative mt-8 border border-[#CED0D4] dark:border-[#3E4042] rounded-lg overflow-hidden'>
            <div
                onClick={handleClick}
                className='cursor-pointer absolute top-1 right-1 w-8 h-8 rounded-full overflow-hidden border border-black-opacity-05'
            >
                <div className='flex justify-center items-center w-full h-full dark:text-[#B0B3BA] bg-white dark:bg-[#3E4042] hover:bg-black-opacity-05 dark:hover:bg-white-opacity-10 transition-all dark:shadow-[0_0_0_1px_rgba(0,_0,_0,_0.1)]'>
                    <XMarkIcon
                        width={16}
                        height={16}
                        className='text-stroke-icon'
                    />
                </div>
            </div>
            <Image alt={gif.title} src={gif.url} />
        </div>
    );
};

export default GifSelect;

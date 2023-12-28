import { useAppDispatch } from '../../../../app/hooks';
import { setGif } from '../../../../features/myTweet';
import { resetSubs } from '../../../../features/popupMultiLevel';
import { IGif } from '../../../../interfaces';
import Image from '../../../Image';

const GifItem = ({ gif }: { gif: IGif }) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setGif(gif));
        dispatch(resetSubs());
    };

    return (
        <div onClick={handleClick} className='w-full cursor-pointer'>
            <Image
                fallback={gif.title}
                className='w-full aspect-square'
                alt={gif.title}
                src={gif.url}
            />
        </div>
    );
};

export default GifItem;

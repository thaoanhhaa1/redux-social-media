import { useAppDispatch } from '../../../../app/hooks';
import useCreateTweet from '../../../../contexts/CreateTweetContext';
import { setGif } from '../../../../features/myTweet';
import { IGif } from '../../../../interfaces';
import Image from '../../../Image';

const GifItem = ({ gif }: { gif: IGif }) => {
    const dispatch = useAppDispatch();
    const { setSub } = useCreateTweet();

    const handleClick = () => {
        dispatch(setGif(gif));
        setSub();
    };

    return (
        <div onClick={handleClick} className='cursor-pointer'>
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

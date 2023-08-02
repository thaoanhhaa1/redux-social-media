import { useNavigate } from 'react-router-dom';
import useCreateTweet from '../../../../contexts/CreateTweetContext';
import { IActionCreateTweet } from '../../../../interfaces';
import Image from '../../../Image';
import { useAppDispatch } from '../../../../app/hooks';
import { setShowUploadImage } from '../../../../features/myTweet';

const MoreItem = ({ item }: { item: IActionCreateTweet }) => {
    const navigate = useNavigate();
    const { setSub } = useCreateTweet();
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (item.link) navigate(item.link);
        else if (item.tooltip === 'Photo/Video')
            dispatch(setShowUploadImage(true));
        else setSub(item.sub);
    };

    return (
        <div
            onClick={handleClick}
            className='flex items-center gap-1 py-[2px] rounded-lg hover:bg-black-opacity-05 transition-all cursor-pointer'
        >
            <div className='w-10 h-10 p-2'>
                <Image alt='' className='w-6 h-6' src={item.image} />
            </div>
            <div className='font-semibold'>{item.tooltip}</div>
        </div>
    );
};

export default MoreItem;

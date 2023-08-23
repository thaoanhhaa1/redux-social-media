import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { setShowUploadImage, setSub } from '../../../../features/myTweet';
import { useActionCreateTweetBtn } from '../../../../hooks';
import { IActionCreateTweet } from '../../../../interfaces';
import { classNames } from '../../../../utils';
import { CheckIcon } from '../../../Icons';
import Image from '../../../Image';

const MoreItem = ({ item }: { item: IActionCreateTweet }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { disabled, active } = useActionCreateTweetBtn(item);

    const handleClick = () => {
        if (disabled) return;

        if (item.link) navigate(item.link);
        else if (item.tooltip === 'Photo/Video') {
            dispatch(setShowUploadImage(true));
            dispatch(setSub(undefined));
        } else dispatch(setSub(item.sub));
    };

    return (
        <div
            onClick={handleClick}
            className={classNames(
                'flex items-center gap-1 pr-2 py-[2px] rounded-lg transition-all cursor-pointer',
                disabled &&
                    'grayscale brightness-30 dark:brightness-50 pointer-events-none',
                active
                    ? 'bg-[rgba(45,_136,_255,_0.1)]'
                    : 'hover:bg-black-opacity-05 dark:hover:bg-white-opacity-10',
            )}
        >
            <div className='w-10 h-10 p-2'>
                <Image alt='' className='w-6 h-6' src={item.image} />
            </div>
            <div className='flex-1 font-semibold'>{item.tooltip}</div>
            {active && <CheckIcon className='text-blue' />}
        </div>
    );
};

export default MoreItem;

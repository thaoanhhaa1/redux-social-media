import { useAppDispatch } from '../../../../app/hooks';
import { setTag } from '../../../../features/myTweet';
import { IFeeling } from '../../../../interfaces';
import { ArrowRightIcon } from '../../../Icons';
import Image from '../../../Image';

const ActivityItem = ({ feeling }: { feeling: IFeeling }) => {
    const dispatch = useAppDispatch();

    const handleClick = () => dispatch(setTag(feeling.title.toLowerCase()));

    return (
        <div
            onClick={handleClick}
            className='flex items-center gap-3 p-[6px] transition-all hover:bg-black-opacity-05 cursor-pointer rounded-lg'
        >
            <div className='flex-shrink-0 p-2 bg-[#E4E6EB] rounded-full'>
                <Image alt='' src={feeling.image} className='flex-1 w-5 h-5' />
            </div>
            <span className='flex-1'>{feeling.title}...</span>
            <span className='flex-shrink-0 p-[6px]'>
                <ArrowRightIcon />
            </span>
        </div>
    );
};

export default ActivityItem;

import { useAppDispatch } from '../../../../app/hooks';
import { setTag } from '../../../../features/myTweet';
import { IActivity } from '../../../../interfaces';
import { ArrowRightIcon } from '../../../Icons';
import Image from '../../../Image';

const ActivityItem = ({ activity }: { activity: IActivity }) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setTag(activity.title.toLowerCase()));
    };

    return (
        <div
            onClick={handleClick}
            className='flex items-center gap-3 p-[6px] transition-all hover:bg-black-opacity-05 cursor-pointer rounded-lg'
        >
            <div className='flex-shrink-0 p-2 bg-[#E4E6EB] rounded-full'>
                <Image alt='' src={activity.image} className='flex-1 w-5 h-5' />
            </div>
            <span className='flex-1'>{activity.title}...</span>
            <span className='flex-shrink-0 p-[6px]'>
                <ArrowRightIcon />
            </span>
        </div>
    );
};

export default ActivityItem;

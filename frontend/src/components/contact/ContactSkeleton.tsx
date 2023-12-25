import Skeleton from 'react-loading-skeleton';
import { ClockIcon } from '../Icons';

const ContactSkeleton = () => {
    return (
        <div className='-mx-2 p-2 flex gap-4 cursor-pointer rounded-2.5 hover:bg-gray-100 dark:hover:bg-white-opacity-10 transition-all'>
            <Skeleton width={34} height={34} circle />
            <div className='flex-1 flex justify-between items-center'>
                <Skeleton width={50} height={19} />
                <div className='flex gap-2 items-center'>
                    <ClockIcon className='fill-white-45 dark:fill-white-9' />
                    <Skeleton width={70} height={17} />
                </div>
            </div>
        </div>
    );
};

export default ContactSkeleton;

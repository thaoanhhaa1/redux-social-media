import Skeleton from 'react-loading-skeleton';

const NotificationAllItemSkeleton = () => {
    return (
        <div className='group/close flex gap-5 p-5 rounded-2.5 hover:bg-blue-white-4 dark:bg-dark-black-1 dark:hover:bg-dark-black-3 shadow-container dark:shadow-none ease-linear duration-300'>
            <Skeleton width={40} height={40} circle />
            <div className='flex-1 flex justify-between items-center gap-5'>
                <div className='flex-1'>
                    <Skeleton containerClassName='w-4/5' height={24} />
                    <Skeleton containerClassName='w-[100px] mt-1' height={17} />
                </div>
                <Skeleton width={20} height={20} />
            </div>
        </div>
    );
};

export default NotificationAllItemSkeleton;

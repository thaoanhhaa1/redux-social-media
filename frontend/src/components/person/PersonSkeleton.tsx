import Skeleton from 'react-loading-skeleton';

const PersonSkeleton = () => {
    return (
        <div className='flex gap-2 xxs:gap-3 xs:gap-4 dl:gap-5 cursor-pointer bg-white dark:bg-dark-black-2'>
            <Skeleton width={40} height={40} circle />
            <div className='flex-1 flex justify-between items-center gap-2'>
                <div className='flex-1'>
                    <Skeleton
                        width='70%'
                        height={14}
                        containerClassName='my-[2px]'
                    />
                    <Skeleton
                        width='50%'
                        height={14}
                        containerClassName='my-[1px]'
                    />
                </div>
                <Skeleton width={86} height={34} borderRadius={10} />
            </div>
        </div>
    );
};

export default PersonSkeleton;

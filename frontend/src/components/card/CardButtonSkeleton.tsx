import Skeleton from 'react-loading-skeleton';

const CardButtonSkeleton = () => {
    return (
        <div className='flex items-center gap-[6px]'>
            <Skeleton width={28} height={28} circle />
            <Skeleton width={15} height={16} />
        </div>
    );
};

export default CardButtonSkeleton;

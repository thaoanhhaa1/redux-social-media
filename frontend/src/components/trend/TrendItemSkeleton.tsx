import Skeleton from 'react-loading-skeleton';

const TrendItemSkeleton = () => {
    return (
        <div className='cursor-pointer rounded-2.5 gap-2 p-2 -mx-2 flex justify-between items-center'>
            <div className='flex flex-col gap-[2px] flex-1'>
                <Skeleton width='30%' height={15} />
                <Skeleton width='70%' height={24} />
                <Skeleton width='40%' height={17} />
            </div>
            <Skeleton width={21} height={32} />
        </div>
    );
};

export default TrendItemSkeleton;

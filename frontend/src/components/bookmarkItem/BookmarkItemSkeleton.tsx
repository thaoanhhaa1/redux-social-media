import Skeleton from 'react-loading-skeleton';

const BookmarkItemSkeleton = () => {
    return (
        <div className='flex gap-2 xxs:gap-3 xs:gap-4 dl:gap-5 p-2 xxs:p-3 xs:p-4 dl:p-5 rounded-2.5'>
            <Skeleton width={40} height={40} circle />
            <div className='justify-between items-center gap-2 flex-1 overflow-auto hidden dl:flex'>
                <div className='flex-1 overflow-hidden flex flex-col gap-1.25'>
                    <Skeleton width='70%' height={17} />
                    <Skeleton width='50%' height={15} />
                </div>
                <Skeleton width={45} height={15} />
            </div>
        </div>
    );
};

export default BookmarkItemSkeleton;

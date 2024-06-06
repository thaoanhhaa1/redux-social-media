import Skeleton from 'react-loading-skeleton';

const ListSkeleton = () => {
    return (
        <div className='p-2 xxs:p-3 xs:p-4 dl:p-5 rounded-2.5'>
            <div className='mt-1.25 flex items-center gap-1.25'>
                <Skeleton width={40} height={40} circle />
                <div className='flex-1 whitespace-nowrap text-ellipsis overflow-hidden'>
                    <Skeleton width='70%' height={14} />{' '}
                    <Skeleton
                        width='50%'
                        containerClassName='mt-[7px]'
                        height={12}
                    />
                </div>
                <Skeleton width={15} height={24} />
            </div>
        </div>
    );
};

export default ListSkeleton;

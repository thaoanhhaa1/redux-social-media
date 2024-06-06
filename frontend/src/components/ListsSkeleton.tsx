import { useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import ListDetailSkeleton from './ListDetailSkeleton';
import ListWrapperSkeleton from './ListWrapperSkeleton';
import { ScrollbarFixTop } from './scrollbar';

const ListsSkeleton = () => {
    const renderListChild = useCallback(() => {
        return (
            <div className='flex flex-col gap-2 xxs:gap-3'>
                <ListWrapperSkeleton />
                <ListWrapperSkeleton />
            </div>
        );
    }, []);

    return (
        <div className='px-2 xxs:px-3 xs:px-4 dl:px-5'>
            <div className='block dl:hidden mb-2 xxs:mb-3 dl:mb-4 bg-white dark:bg-dark-black-2 p-2 xxs:p-3 xs:p-4 dl:p-5 rounded-md'>
                {renderListChild()}
            </div>
            <div className='flex gap-2 xxs:gap-3 xs:gap-4 dl:gap-5'>
                <ScrollbarFixTop
                    marginBottom='20px'
                    className='hidden dl:flex w-[336px] shadow-box dark:shadow-none'
                    header={
                        <Skeleton
                            containerClassName='justify-center'
                            width={50}
                            height={17}
                        />
                    }
                >
                    {renderListChild()}
                </ScrollbarFixTop>
                <ListDetailSkeleton />
            </div>
        </div>
    );
};

export default ListsSkeleton;

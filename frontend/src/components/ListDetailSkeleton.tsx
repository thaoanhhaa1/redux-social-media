import Skeleton from 'react-loading-skeleton';
import RenderList from './RenderList';
import { CardSkeleton } from './card';

const ListDetailSkeleton = () => {
    return (
        <div className='flex-1 mb-2 rounded-2.5 shadow-box dark:shadow-none overflow-hidden dark:bg-dark-black-1'>
            <Skeleton className='h-auto aspect-[809/207]' />
            <div className='-mt-10 xxs:-mt-17.5 mb-2 xxs:mb-3 xs:mb-4 dl:mb-5 mx-2 xxs:mx-3 xs:mx-4 dl:mx-5 pt-0 p-2 xxs:p-3 xs:p-4 dl:p-5 flex flex-col xxl:flex-row items-center gap-5 bg-white dark:bg-dark-black-2 shadow-[0px_5px_45px_#EBEBED] dark:shadow-none rounded-lg'>
                <Skeleton
                    circle
                    className='w-[160px] xxs:w-[200px] aspect-square'
                />
                <div className='xxl:mt-[18.5px] flex-1 flex flex-col gap-2'>
                    <div className='flex flex-wrap xxl:items-center justify-center xxl:justify-start gap-2'>
                        <Skeleton width={100} height={24} />{' '}
                        <Skeleton width={70} height={17} />
                    </div>
                    <div className='flex flex-wrap gap-3 justify-center xxl:justify-start font-semibold text-sm leading-sm text-black dark:text-white'>
                        <Skeleton width={75} height={14} />
                        <Skeleton width={75} height={14} />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton width={138} height={40} />
                    <Skeleton width={138} height={40} />
                </div>
            </div>
            <div className='mt-7 flex flex-col gap-5'>
                <RenderList Control={CardSkeleton} />
            </div>
        </div>
    );
};

export default ListDetailSkeleton;

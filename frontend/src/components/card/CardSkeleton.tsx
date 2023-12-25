import Skeleton from 'react-loading-skeleton';
import { BottomIcon } from '../Icons';
import Wrapper from '../wrapper/Wrapper';
import CardButtonSkeleton from './CardButtonSkeleton';

const CardSkeleton = () => {
    return (
        <Wrapper className='p-2 xxs:p-5'>
            <div className='flex gap-2 xxs:gap-4 overflow-y-visible'>
                <Skeleton width={40} height={40} circle />
                <div className='flex justify-between items-center flex-1 gap-2'>
                    <div>
                        <Skeleton height={24} width={150} />
                        <Skeleton
                            height={17}
                            width={70}
                            containerClassName='mt-1.25'
                        />
                    </div>
                    <div className='hidden xxs:flex gap-1.25 text-black-8 dark:text-white font-medium text-xs leading-3.75'>
                        <Skeleton height={16} width={60} />
                        <div className='relative group/more'>
                            <BottomIcon className='cursor-pointer w-4 h-4 fill-black dark:fill-white group-hover/more:fill-blue dark:group-hover/more:fill-blue-white-2 transition' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2 xxs:gap-5 ml-12 xxs:ml-[56px]'>
                <div>
                    <Skeleton height={14} className='my-[3px]' />
                    <Skeleton height={14} className='my-[3px]' />
                    <Skeleton height={14} className='my-[3px]' />
                </div>

                <div className='flex justify-between'>
                    <div className='flex gap-2 xxs:gap-5'>
                        <CardButtonSkeleton />
                        <CardButtonSkeleton />
                        <CardButtonSkeleton />
                    </div>
                    <CardButtonSkeleton />
                </div>
            </div>
        </Wrapper>
    );
};

export default CardSkeleton;

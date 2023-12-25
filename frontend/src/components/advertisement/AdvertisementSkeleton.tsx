import Skeleton from 'react-loading-skeleton';
import Wrapper from '../wrapper';

const AdvertisementSkeleton = () => {
    return (
        <Wrapper className='p-5'>
            <div className='flex items-center justify-between font-semibold'>
                <Skeleton width={120} height={24} />
                <Skeleton width={70} height={17} />
            </div>
            <Skeleton
                height={120}
                containerClassName='rounded-2.5 overflow-hidden'
            />
            <div className='font-semibold text-sm leading-sm'>
                <Skeleton width={120} height={17} />
                <Skeleton width={70} height={17} containerClassName='mt-1.25' />
            </div>
        </Wrapper>
    );
};

export default AdvertisementSkeleton;

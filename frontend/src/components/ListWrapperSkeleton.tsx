import Skeleton from 'react-loading-skeleton';
import ListSkeleton from './ListSkeleton';
import RenderList from './RenderList';

const ListWrapperSkeleton = () => {
    return (
        <div>
            <div className='px-5 py-3 bg-blue-white-4 dark:bg-dark-black-3 rounded-2.5 flex justify-between items-center font-semibold text-blue-black-5 dark:text-white'>
                <Skeleton width={50} height={24} />
                <Skeleton width={50} height={24} />
            </div>
            <RenderList Control={ListSkeleton} />
        </div>
    );
};

export default ListWrapperSkeleton;

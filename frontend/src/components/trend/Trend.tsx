import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { countPages, getTrending } from '../../features/trending';
import Empty from '../Empty';
import RenderList from '../RenderList';
import Wrapper from '../wrapper/Wrapper';
import TrendItem from './TrendItem';
import TrendItemSkeleton from './TrendItemSkeleton';

const Trend = () => {
    const { pages, trendingList, page, loading } = useAppSelector(
        (state: RootState) => state.trending,
    );
    const dispatch = useAppDispatch();
    const tweetTrendingList = useMemo(
        () => trendingList.filter((item) => item.type === 'tweet'),
        [trendingList],
    );

    const loadMore = () =>
        dispatch(getTrending({ type: 'tweet', page: page + 1 }));

    useEffect(() => {
        if (pages >= 0) return;

        dispatch(countPages({ type: 'tweet' }));
        dispatch(getTrending({ type: 'tweet', page: 1 }));
    }, [dispatch, pages]);

    return (
        <Wrapper className='p-3 xs:p-4 dl:p-5' gap='0'>
            <div className='mb-3 font-semibold text-base-black dark:text-white'>
                Trends for you
            </div>
            {tweetTrendingList.map((item) => (
                <TrendItem item={item} key={item._id} />
            ))}
            {loading && <RenderList Control={TrendItemSkeleton} />}
            {page >= pages || loading || (
                <button
                    onClick={loadMore}
                    className='mt-2 xxs:mt-3 xs:mt-4 dl:mt-5 w-fit font-medium text-xs leading-xs text-blue-white-2 dark:text-blue'
                >
                    show more
                </button>
            )}
            {pages === 0 && !loading && <Empty>No trends available</Empty>}
        </Wrapper>
    );
};

export default Trend;

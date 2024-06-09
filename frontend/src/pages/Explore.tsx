import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import {
    Card,
    CardSkeleton,
    Empty,
    Page,
    RenderList,
    Trend,
} from '../components';
import CardWrapper from '../components/card/CardWrapper';
import { getTweetsByTrending, setActiveTrending } from '../features/trending';
import { ITweetTrending } from '../interfaces';

const Explore = () => {
    const { pages, trendingList, loading, active } = useAppSelector(
        (state: RootState) => state.trending,
    );
    const trending = useMemo(
        () => trendingList.find((item) => item._id === active),
        [trendingList, active],
    ) as ITweetTrending | undefined;
    const dispatch = useAppDispatch();
    const filteredTweets = useMemo(
        () => trending?.tweets.filter((tweet) => !tweet.deleted) || [],
        [trending],
    );

    useEffect(() => {
        if (pages < 0 || !trending || trending.page || trending.loading) return;

        dispatch(
            getTweetsByTrending({
                trending: trending._id,
                page: 1,
            }),
        );
    }, [dispatch, trending, pages, trendingList]);

    useEffect(() => {
        if (active || !trendingList.length) return;

        dispatch(setActiveTrending(trendingList.at(0)?._id));
    }, [active, dispatch, trendingList]);

    return (
        <Page
            scrollChildren={
                <>
                    {((loading && !trending) ||
                        trending?.loading ||
                        !trending?.page) && (
                        <RenderList className='gap-5' Control={CardSkeleton} />
                    )}
                    {filteredTweets.map((tweet) => (
                        <CardWrapper
                            type='TRENDING'
                            tweet={tweet}
                            key={tweet._id}
                        >
                            <Card />
                        </CardWrapper>
                    ))}
                    {pages === 0 ||
                        (trending &&
                            !filteredTweets.length &&
                            trending.page &&
                            !trending.loading && (
                                <Empty>No tweets available</Empty>
                            )) ||
                        null}
                </>
            }
            scrollHeight='var(--scroll-height)'
            scrollWidth='var(--explore-sidebar-width)'
        >
            {/* <Live />
            <Criket /> */}
            <Trend />
        </Page>
    );
};

export default Explore;

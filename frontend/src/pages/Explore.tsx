import { useEffect } from 'react';
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
import { getTweetsByTrending } from '../features/trending';
import { ITweetTrending } from '../interfaces';

const Explore = () => {
    const { pages, trendingList, loading } = useAppSelector(
        (state: RootState) => state.trending,
    );
    const firstTrending = trendingList.at(0) as ITweetTrending | undefined;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (
            pages < 0 ||
            !firstTrending ||
            firstTrending.page ||
            firstTrending.loading
        )
            return;

        dispatch(
            getTweetsByTrending({
                trending: firstTrending._id,
                page: 1,
            }),
        );
    }, [dispatch, firstTrending, pages, trendingList]);

    return (
        <Page
            scrollChildren={
                <>
                    {((loading && !firstTrending) ||
                        firstTrending?.loading ||
                        !firstTrending?.page) && (
                        <RenderList gap='20px' Control={CardSkeleton} />
                    )}
                    {firstTrending &&
                        firstTrending.tweets.map((tweet) => (
                            <CardWrapper tweet={tweet} key={tweet._id}>
                                <Card />
                            </CardWrapper>
                        ))}
                    {pages === 0 ||
                        (firstTrending &&
                            !firstTrending.tweets.length &&
                            firstTrending.page &&
                            !firstTrending.loading && (
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

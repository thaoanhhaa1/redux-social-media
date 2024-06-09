import { memo, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import {
    Advertisement,
    AdvertisementSkeleton,
    Card,
    CardSkeleton,
    Contact,
    ContactSkeleton,
    Empty,
    Group,
    Page,
    RenderList,
    Stories,
    WhatHappen,
    Wrapper,
} from '../components';
import CardWrapper from '../components/card/CardWrapper';
import { WrapperHeader } from '../components/wrapper';
import { getContacts } from '../features/contacts';
import { getStories } from '../features/stories';
import { countFollowingTweets, getTweets } from '../features/tweets';
import { getNewTweets } from '../utils';

const Home = () => {
    const {
        contacts: { contacts },
        tweets: { tweets, followingPages, followingPage },
        user,
    } = useSelector((state: RootState) => state);
    const dispatch = useAppDispatch();
    const newTweets = useMemo(() => getNewTweets(tweets), [tweets]);
    const otherTweet = useMemo(
        () => tweets.filter((tweet) => tweet.user._id !== user._id),
        [tweets, user._id],
    );
    const [loading, setLoading] = useState<boolean>(false);

    const loadMoreCard = async () =>
        await dispatch(getTweets(followingPage + 1));

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const queries = [];

            queries.push(dispatch(getStories()).unwrap());
            queries.push(dispatch(getContacts(1)).unwrap());
            queries.push(dispatch(getTweets(1)).unwrap());
            queries.push(dispatch(countFollowingTweets()));

            await Promise.all(queries);
            setLoading(false);
        }

        if (user._id && followingPages < 0) getData();
    }, [dispatch, followingPages, user]);

    return (
        <Page
            scrollWidth='var(--home-sidebar-width)'
            scrollHeight='var(--scroll-height)'
            scrollChildren={
                <>
                    {(loading && (
                        <>
                            <AdvertisementSkeleton />
                            <AdvertisementSkeleton />
                        </>
                    )) || (
                        <>
                            <Advertisement />
                            <Group />
                        </>
                    )}
                    <Wrapper gap='0' className='p-5'>
                        <WrapperHeader
                            title='Contacts'
                            titleLink='See more'
                            to='/'
                            className='mb-3'
                        />
                        {(loading && (
                            <RenderList Control={ContactSkeleton} />
                        )) ||
                            contacts.map((contact) => (
                                <Contact
                                    contact={contact}
                                    className='-mx-2'
                                    key={contact._id}
                                />
                            ))}
                    </Wrapper>
                </>
            }
        >
            <Stories loading={loading} />
            <WhatHappen />
            {!newTweets.length && !loading && !otherTweet.length && (
                <Empty>No tweets available</Empty>
            )}
            {newTweets.map((tweet) => (
                <CardWrapper key={tweet._id} tweet={tweet}>
                    <Card />
                </CardWrapper>
            ))}
            {loading || (
                <InfiniteScroll
                    dataLength={otherTweet.length}
                    hasMore={followingPage < followingPages}
                    loader={<RenderList Control={CardSkeleton} />}
                    next={loadMoreCard}
                    className='scrollbar flex flex-col gap-2 xxs:gap-5 !overflow-visible'
                >
                    {otherTweet.map((tweet) => (
                        <CardWrapper key={tweet._id} tweet={tweet}>
                            <Card />
                        </CardWrapper>
                    ))}
                </InfiniteScroll>
            )}
            {loading && (
                <RenderList
                    className='gap-2 xxs:gap-5'
                    Control={CardSkeleton}
                />
            )}
        </Page>
    );
};

export default memo(Home);

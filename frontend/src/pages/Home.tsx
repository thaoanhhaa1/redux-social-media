import { memo, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { v4 } from 'uuid';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import {
    Card,
    Contact,
    Page,
    Stories,
    WhatHappen,
    Wrapper,
} from '../components';
import Advertisement, {
    AdvertisementSkeleton,
} from '../components/advertisement';
import CardSkeleton from '../components/card/CardSkeleton';
import ContactSkeleton from '../components/contact/ContactSkeleton';
import Group from '../components/group';
import { WrapperHeader } from '../components/wrapper';
import { getContacts, setOffline, setOnline } from '../features/contacts';
import { countFollowingTweets, getTweets } from '../features/followingTweets';
import { getStories } from '../features/stories';
import { getArray } from '../utils';
import getNewTweets from '../utils/getNewTweets';

const Home = () => {
    const {
        contacts: { contacts },
        socket,
        followingTweets: { tweets, followingPages, followingPage },
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

    useEffect(() => {
        if (!socket.socket) return;
        const socketIo = socket.socket as Socket;

        socketIo.on('online', (userId) => dispatch(setOnline(userId)));

        socketIo.on('offline', (data: { userId: string; date: string }) => {
            const date = new Date(data.date);

            dispatch(
                setOffline({
                    userId: data.userId,
                    date,
                }),
            );
        });

        return () => {
            socketIo.removeListener('offline');
            socketIo.removeListener('online');
        };
    }, [dispatch, socket.socket]);

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
                        {(loading &&
                            getArray().map(() => (
                                <ContactSkeleton key={v4()} />
                            ))) ||
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
            {newTweets.map((tweet) => (
                <Card tweet={tweet} key={tweet._id} />
            ))}
            {loading || (
                <InfiniteScroll
                    dataLength={otherTweet.length}
                    hasMore={followingPage < followingPages}
                    loader={
                        <>
                            {getArray(3).map(() => (
                                <CardSkeleton key={v4()} />
                            ))}
                        </>
                    }
                    next={loadMoreCard}
                    className='scrollbar flex flex-col gap-2 xxs:gap-5'
                >
                    {otherTweet.map((tweet) => (
                        <Card tweet={tweet} key={tweet._id} />
                    ))}
                </InfiniteScroll>
            )}
            {loading && getArray(3).map(() => <CardSkeleton key={v4()} />)}
        </Page>
    );
};

export default memo(Home);

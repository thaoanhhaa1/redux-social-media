import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import {
    Card,
    Contact,
    Image,
    Members,
    Page,
    Stories,
    WhatHappen,
    Wrapper,
} from '../components';
import { WrapperHeader } from '../components/wrapper';
import { getContacts, setOffline, setOnline } from '../features/contacts';
import { getTweets } from '../features/followingTweets';
import { setLoading } from '../features/page';
import { getStories } from '../features/stories';

const Home = () => {
    const { pageCount, contacts } = useSelector(
        (state: RootState) => state.contacts,
    );
    const socket = useSelector((state: RootState) => state.socket);
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const followingTweets = useSelector(
        (state: RootState) => state.followingTweets,
    );
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!user) return;

        (async () => {
            const queries = [dispatch(getStories()).unwrap()];

            if (contacts.length === 0)
                queries.push(dispatch(getContacts(pageCount)).unwrap());
            if (followingTweets.data.length === 0)
                queries.push(dispatch(getTweets()).unwrap());

            await Promise.all(queries);
            dispatch(setLoading(false));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

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
                    <Wrapper className='p-5'>
                        <WrapperHeader
                            title='sponsored'
                            titleLink='Create Ad'
                            to='/'
                        />
                        <Image
                            className='rounded-2.5 h-[120px]'
                            alt=''
                            src='https://plus.unsplash.com/premium_photo-1686090449366-b7a5a28577aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                        />
                        <div className='font-semibold text-sm leading-sm'>
                            <div className='text-black dark:text-white'>
                                ali baba online shoping
                            </div>
                            <p className='mt-1.25 text-black-8 dark:text-white-9'>
                                ali baba .com
                            </p>
                        </div>
                    </Wrapper>
                    <Wrapper className='p-5'>
                        <WrapperHeader
                            title='Suggested groups'
                            titleLink='See more'
                            to='/'
                        />
                        <Image
                            className='rounded-2.5 h-[120px]'
                            alt=''
                            src='https://plus.unsplash.com/premium_photo-1686090449366-b7a5a28577aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
                        />
                        <div className='flex gap-1'>
                            <div className='font-semibold'>
                                <div className='text-black dark:text-white'>
                                    Anthony Douglas
                                </div>
                                <p className='mt-[2px] text-sm leading-sm text-black-8 dark:text-white-9'>
                                    65 friends | 1.5k members
                                </p>
                            </div>
                            <Members />
                        </div>
                    </Wrapper>
                    <Wrapper gap='0' className='p-5'>
                        <WrapperHeader
                            title='Contacts'
                            titleLink='See more'
                            to='/'
                            className='mb-3'
                        />
                        {contacts.map((contact) => (
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
            <Stories />
            <WhatHappen />
            {myTweet.newTweets.map((tweet) => (
                <Card tweet={tweet} user={user} key={tweet._id || ''} />
            ))}
            {followingTweets.data.map((item) =>
                item.tweets.map((tweet) => (
                    <Card
                        tweet={tweet}
                        user={item.user}
                        key={tweet._id || ''}
                    />
                )),
            )}
        </Page>
    );
};

export default memo(Home);

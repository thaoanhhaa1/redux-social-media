import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { useEffectOnce } from 'usehooks-ts';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import {
    Button,
    CalendarIcon,
    CameraIcon,
    Card,
    EditProfile,
    EditProfileIcon,
    Follow,
    Image,
    Loading,
    ProfileItem,
    StickyBottom,
    Stories,
    WhatHappen,
    Wrapper,
} from '../components';
import { getMyTweets } from '../features/followingTweets';
import { setLoading } from '../features/page';
import { dec, getProfile, inc } from '../features/profile';
import { getStories } from '../features/stories';
import { getMonthYear } from '../utils';

const Profile = () => {
    const [isShowModalEditProfile, setShowModalEditProfile] = useState(false);
    const { user, socket, profile, followingTweets } = useSelector(
        (state: RootState) => state,
    );
    const stories = useSelector((state: RootState) => state.stories);
    const dispatch = useAppDispatch();
    const myTweets = useMemo(
        () =>
            followingTweets.tweets.filter((item) => item.user._id === user._id),
        [followingTweets.tweets, user._id],
    );

    const handleShowModal = useCallback(
        () => setShowModalEditProfile((isShowModal) => !isShowModal),
        [],
    );

    useEffect(() => {
        if (!socket.socket) return;
        const socketIo = socket.socket as Socket;

        socketIo.on('follower', () => dispatch(inc('follower')));
        socketIo.on('following', () => dispatch(inc('following')));
        socketIo.on('un-follower', () => dispatch(dec('follower')));
        socketIo.on('un-following', () => dispatch(dec('following')));

        return () => {
            socketIo.removeListener('follower');
            socketIo.removeListener('following');
            socketIo.removeListener('un-follower');
            socketIo.removeListener('un-following');
        };
    }, [dispatch, socket.socket, user._id]);

    useEffectOnce(() => {
        (async function () {
            const queries = [];

            if (!profile.isLoading) {
                queries.push(dispatch(getProfile()));
                queries.push(dispatch(getMyTweets()));
            }
            if (!stories.stories.length)
                queries.push(dispatch(getStories()).unwrap());

            await Promise.all(queries);

            dispatch(setLoading(false));
        })();
    });

    if (!user._id) return <Loading />;

    return (
        <div className='relative px-5'>
            <Image
                fallback='/no-background.jpg'
                alt=''
                src={user.background}
                className='aspect-[1163/253] h-auto rounded-2.5'
            />
            <Button
                onClick={handleShowModal}
                className='!px-5 absolute top-[35px] right-[36px] bg-white dark:bg-dark-black-3 text-black dark:text-white font-medium text-xs leading-xs'
                large
                icon={<EditProfileIcon />}
            >
                Edit profile
            </Button>
            <EditProfile
                isShowModal={isShowModalEditProfile}
                setShowModal={setShowModalEditProfile}
            />
            <Wrapper
                isRow
                className='relative -mt-[82px] mx-7.5 px-7.5 pb-[2px] shadow-[0px_5px_45px_#EBEBED] dark:shadow-none'
            >
                <div className='relative w-[200px] h-[200px] flex-shrink-0'>
                    <Image alt='' src={user.avatar} rounded />
                    <Button
                        className='absolute right-3 bottom-[14px] bg-white'
                        icon={<CameraIcon />}
                        rounded
                    />
                </div>
                <div className='flex-1 flex justify-between items-center gap-5'>
                    <div className='flex flex-col gap-[11px]'>
                        <div className='font-medium text-4xl leading-4xl text-black-1 dark:text-white'>
                            {user.name || user.username}
                        </div>
                        <div className='font-semibold text-xl leading-xl text-black-8 dark:text-white'>
                            @{user.username}
                        </div>
                        <div className='flex'>
                            <CalendarIcon className='dark:hidden mr-[6px]' />
                            <span className='font-semibold text-black-1 dark:text-white'>
                                Joined {getMonthYear(new Date(user.createdAt))}
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <ProfileItem
                            color='--emerald-black-1-color'
                            title='Tweets'
                            number={profile.tweetCount}
                        />
                        <ProfileItem
                            color='--red-black-1-color'
                            title='Followers'
                            number={profile.followerCount}
                        />
                        <ProfileItem
                            color='--yellow-black-1-color'
                            title='Following'
                            number={profile.followingCount}
                        />
                    </div>
                </div>
            </Wrapper>
            <div className='flex gap-5 mt-5 pb-5'>
                <div className='flex-1 flex flex-col gap-5 overflow-hidden'>
                    <Stories all={false} />
                    <WhatHappen />
                    {(myTweets.length > 0 &&
                        myTweets.map((tweet) => (
                            <Card key={tweet._id} tweet={tweet} />
                        ))) || (
                        <div className='font-semibold text-xl text-center leading-xl text-black-8 dark:text-white'>
                            No posts available
                        </div>
                    )}
                </div>
                <StickyBottom>
                    <Wrapper className='w-[337px] p-5 mb-5'>
                        <div className='font-semibold text-xl leading-xl text-black dark:text-white'>
                            Who to follow
                        </div>
                        {profile.whoToFollow.map((user) => (
                            <Follow key={user._id} user={user} />
                        ))}
                        <button className='w-fit font-medium text-xs leading-xs text-blue-white-2 dark:text-blue'>
                            SHOW more
                        </button>
                    </Wrapper>
                </StickyBottom>
            </div>
        </div>
    );
};

export default Profile;

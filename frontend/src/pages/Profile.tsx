import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import api from '../api';
import axiosClient from '../api/axiosClient';
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
import { addTweets } from '../features/myTweet';
import { IUser } from '../interfaces';
import { getMonthYear } from '../utils';
import { useEffectOnce } from 'usehooks-ts';

const Profile = () => {
    const [isShowModalEditProfile, setShowModalEditProfile] = useState(false);
    const { user, socket, myTweet } = useSelector((state: RootState) => state);
    const [isLoading, setLoading] = useState(false);
    const [tweetCount, setTweetCount] = useState(-1);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [whoToFollow, setWhoToFollow] = useState<IUser[]>([]);
    const dispatch = useAppDispatch();

    const handleShowModal = useCallback(
        () => setShowModalEditProfile((isShowModal) => !isShowModal),
        [],
    );

    useEffect(() => {
        if (!socket.socket) return;
        const socketIo = socket.socket as Socket;

        socketIo.on('follower', () => setFollowerCount((count) => count + 1));
        socketIo.on('following', () => setFollowingCount((count) => count + 1));
        socketIo.on('un-follower', () =>
            setFollowerCount((count) => count - 1),
        );
        socketIo.on('un-following', () =>
            setFollowingCount((count) => count - 1),
        );

        return () => {
            socketIo.removeListener('follower');
            socketIo.removeListener('following');
            socketIo.removeListener('un-follower');
            socketIo.removeListener('un-following');
        };
    }, [socket.socket, user._id]);

    useEffectOnce(() => {
        (async function () {
            setLoading(true);
            const res = (
                await Promise.all([
                    axiosClient.get(api.countTweet()),
                    axiosClient.get(api.countFollow()),
                    axiosClient.get(api.whoToFollow()),
                    axiosClient.get(api.getMyTweets()),
                ])
            ).map((item) => item.data);
            setLoading(false);
            setTweetCount(res[0]);
            setFollowerCount(res[1][0]);
            setFollowingCount(res[1][1]);
            setWhoToFollow(res[2]);
            dispatch(addTweets(res[3]));
        })();
    });

    if (isLoading) return <Loading />;

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
                            number={tweetCount}
                        />
                        <ProfileItem
                            color='--red-black-1-color'
                            title='Followers'
                            number={followerCount}
                        />
                        <ProfileItem
                            color='--yellow-black-1-color'
                            title='Following'
                            number={followingCount}
                        />
                    </div>
                </div>
            </Wrapper>
            <div className='flex gap-5 mt-5 pb-5'>
                <div className='flex-1 flex flex-col gap-5 overflow-hidden'>
                    <Stories all={false} />
                    <WhatHappen />
                    {(myTweet.tweets.length > 0 &&
                        myTweet.tweets.map((tweet) => (
                            <Card key={tweet._id} user={user} tweet={tweet} />
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
                        {whoToFollow.map((user) => (
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

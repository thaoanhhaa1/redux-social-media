import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import api from '../api';
import axiosClient from '../api/axiosClient';
import { RootState } from '../app/store';
import Button from '../components/Button';
import EditProfile from '../components/EditProfile';
import Follow from '../components/Follow';
import { CalendarIcon, CameraIcon, EditProfileIcon } from '../components/Icons';
import Image from '../components/Image';
import Loading from '../components/Loading';
import ProfileItem from '../components/ProfileItem';
import StickyBottom from '../components/StickyBottom';
import Card from '../components/card/Card';
import Stories from '../components/story/Stories';
import WhatHappen from '../components/whatHappen/WhatHappen';
import Wrapper from '../components/wrapper/Wrapper';
import { ITweet, IUser } from '../interfaces';
import { getMonthYear } from '../utils';

const Profile = () => {
    const [isShowModel, setShowModel] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const [isLoading, setLoading] = useState(false);
    const [tweetCount, setTweetCount] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [whoToFollow, setWhoToFollow] = useState<IUser[]>([]);
    const [tweets, setTweets] = useState<ITweet[]>([]);

    const handleShowModel = useCallback(
        () => setShowModel((isShowModel) => !isShowModel),
        [],
    );

    useEffect(() => {
        document.body.style.height = isShowModel ? '100vh' : 'unset';
        document.body.style.overflow = isShowModel ? 'hidden' : 'unset';
    }, [isShowModel]);

    useEffect(() => {
        async function fetch() {
            setLoading(true);
            const res = await Promise.all([
                (await axiosClient.get(api.countTweet())).data,
                (await axiosClient.get(api.countFollow())).data,
                (await axiosClient.get(api.whoToFollow())).data,
                (await axiosClient.get(api.getMyTweets())).data,
            ]);
            console.log('🚀 ~ fetch ~ res:', res);
            setLoading(false);

            setTweetCount(res[0]);
            setFollowerCount(res[1][0]);
            setFollowingCount(res[1][1]);
            setWhoToFollow(res[2]);
            setTweets(res[3]);
        }

        fetch();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <div className="relative px-5">
            <Image
                fallback="/no-background.jpg"
                alt=""
                src={user.background}
                className="aspect-[1163/253] h-auto rounded-2.5"
            />
            <Button
                onClick={handleShowModel}
                className="!px-5 absolute top-[35px] right-[36px] bg-white dark:bg-dark-black-3 text-black dark:text-white font-medium text-xs leading-xs"
                large
                icon={<EditProfileIcon />}
            >
                Edit profile
            </Button>
            <EditProfile
                isShowModel={isShowModel}
                handleShowModel={handleShowModel}
            />
            <Wrapper
                isRow
                className="relative -mt-[82px] mx-7.5 px-7.5 pb-[2px] shadow-[0px_5px_45px_#EBEBED] dark:shadow-none"
            >
                <div className="relative w-[200px] h-[200px] flex-shrink-0">
                    <Image alt="" src={user.avatar} rounded />
                    <Button
                        className="absolute right-3 bottom-[14px] bg-white"
                        icon={<CameraIcon />}
                        rounded
                    />
                </div>
                <div className="flex-1 flex justify-between items-center gap-5">
                    <div className="flex flex-col gap-[11px]">
                        <div className="font-medium text-4xl leading-4xl text-black-1 dark:text-white">
                            {user.name || user.username}
                        </div>
                        <div className="font-semibold text-xl leading-xl text-black-8 dark:text-white">
                            @{user.username}
                        </div>
                        <div className="flex">
                            <CalendarIcon className="dark:hidden mr-[6px]" />
                            <span className="font-semibold text-black-1 dark:text-white">
                                Joined {getMonthYear(user.createdAt)}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <ProfileItem
                            color="--emerald-black-1-color"
                            title="Tweets"
                            number={tweetCount}
                        />
                        <ProfileItem
                            color="--red-black-1-color"
                            title="Followers"
                            number={followerCount}
                        />
                        <ProfileItem
                            color="--yellow-black-1-color"
                            title="Following"
                            number={followingCount}
                        />
                    </div>
                </div>
            </Wrapper>
            <div className="flex gap-5 mt-5">
                <div className="flex-1 flex flex-col gap-5 overflow-auto">
                    <Stories />
                    <WhatHappen />
                    {tweets.map((tweet) => (
                        <Card key={tweet._id} tweet={tweet} />
                    ))}
                </div>
                <StickyBottom>
                    <Wrapper className="w-[337px] p-5 mb-5">
                        <div className="font-semibold text-xl leading-xl text-black dark:text-white">
                            Who to follow
                        </div>
                        {whoToFollow.map((user) => (
                            <Follow key={user._id} user={user} />
                        ))}
                        <button className="w-fit font-medium text-xs leading-xs text-blue-white-2 dark:text-blue">
                            SHOW more
                        </button>
                    </Wrapper>
                </StickyBottom>
            </div>
        </div>
    );
};

export default Profile;

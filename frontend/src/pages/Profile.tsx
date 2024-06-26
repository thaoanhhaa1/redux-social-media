import { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'usehooks-ts';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import {
    Button,
    CalendarIcon,
    CameraIcon,
    Card,
    EditProfile,
    EditProfileIcon,
    Empty,
    Follow,
    Image,
    Loading,
    ProfileItem,
    RenderList,
    StickyBottom,
    Stories,
    WhatHappen,
    Wrapper,
} from '../components';
import { CardSkeleton } from '../components/card';
import CardWrapper from '../components/card/CardWrapper';
import { PersonSkeleton } from '../components/person';
import {
    getProfile,
    getWhoToFollow,
    getWhoToFollowPages,
} from '../features/profile';
import { getStories } from '../features/stories';
import { countMyTweets, getMyTweets } from '../features/tweets';
import { getMonthYear } from '../utils';

const Profile = () => {
    const {
        user,
        profile,
        tweets: { tweets, myTweetPage, myTweetPages },
    } = useSelector((state: RootState) => state);
    const [isShowModalEditProfile, setShowModalEditProfile] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingFollow, setLoadingFollow] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const myTweets = useMemo(
        () => tweets.filter((item) => item.user._id === user._id),
        [tweets, user._id],
    );
    const { width } = useWindowSize();

    let WhoToFollowWrapper: React.ElementType =
        width >= 986 ? StickyBottom : 'div';

    const handleShowModal = () =>
        setShowModalEditProfile((isShowModal) => !isShowModal);

    const handleLoadMoreWhoToFollow = async () => {
        setLoadingFollow(true);

        await dispatch(getWhoToFollow(profile.whoToFollowPage + 1));

        setLoadingFollow(false);
    };

    const loadMoreCard = () => dispatch(getMyTweets(myTweetPage + 1));

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const queries = [];

            queries.push(dispatch(getWhoToFollowPages()));
            queries.push(dispatch(getProfile()));
            queries.push(dispatch(getMyTweets(1)));
            queries.push(dispatch(getWhoToFollow(1)));
            queries.push(dispatch(getStories()));
            queries.push(dispatch(countMyTweets()));

            await Promise.all(queries);
            setLoading(false);
        }

        if (user._id && myTweetPages === -1) getData();
    }, [dispatch, myTweetPages, user._id]);

    if (!user._id) return <Loading />;

    return (
        <div className='relative px-2 xxs:px-3 xs:px-4 dl:px-5'>
            <Image
                fallback='/no-background.jpg'
                alt=''
                src={user.background}
                className='h-[112px] xxs:h-auto xxxs:aspect-[1163/253] rounded-2.5'
            />
            <Button
                onClick={handleShowModal}
                className='z-1 !px-5 absolute top-[35px] right-[36px] bg-white dark:bg-dark-black-3 text-black dark:text-white font-medium text-xs leading-xs shadow-icon-btn dark:shadow-none dl:shadow-none'
                large
                icon={<EditProfileIcon />}
            >
                <span className='hidden xs:inline-block'>Edit profile</span>
            </Button>
            <EditProfile
                isShowModal={isShowModalEditProfile}
                setShowModal={setShowModalEditProfile}
            />
            <Wrapper
                isRow
                className='relative -mt-[106px] xxxs:-mt-[82px] mx-2 xxs:mx-3 xs:mx-4 dl:mx-5 gx:mx-7.5 px-2 xxs:px-3 xs:px-4 dl:px-5 gx:px-7.5 pb-[2px] shadow-[0px_5px_45px_#EBEBED] dark:shadow-none flex-wrap'
            >
                <div className='w-full gx:w-[200px]'>
                    <div className='mx-auto relative w-[160px] xxxs:w-[200px] aspect-square flex-shrink-0'>
                        <Image alt='' src={user.avatar} rounded />
                        <Button
                            onClick={handleShowModal}
                            className='absolute right-3 bottom-[14px] bg-white text-black'
                            icon={<CameraIcon />}
                            rounded
                        />
                    </div>
                </div>
                <div className='flex-1 flex justify-center gx:justify-between items-center gap-5 flex-wrap'>
                    <div className='text-center gx:text-left w-full gx:w-auto flex flex-col gap-[11px]'>
                        <div className='font-medium text-4xl leading-4xl text-black-1 dark:text-white'>
                            {user.name || user.username}
                        </div>
                        <div className='font-semibold text-xl leading-xl text-black-8 dark:text-white'>
                            @{user.username}
                        </div>
                        <div className='flex justify-center gx:justify-start'>
                            <CalendarIcon className='dark:hidden mr-[6px]' />
                            <span className='font-semibold text-black-1 dark:text-white'>
                                Joined {getMonthYear(new Date(user.createdAt))}
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-center gap-5 flex-wrap'>
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
            <div className='flex flex-col-reverse dl:flex-row gap-5 mt-5 pb-5'>
                <div className='max-w-[680px] mx-auto w-full flex-1 flex flex-col gap-5 overflow-hidden'>
                    <Stories all={false} loading={loading} />
                    <WhatHappen />
                    {!loading && !profile.tweetCount && !myTweets.length && (
                        <Empty>No tweets available</Empty>
                    )}
                    {loading || (
                        <InfiniteScroll
                            dataLength={myTweets.length}
                            hasMore={myTweetPage < myTweetPages}
                            loader={
                                <RenderList
                                    className='gap-2 xxs:gap-5'
                                    Control={CardSkeleton}
                                />
                            }
                            next={loadMoreCard}
                            className='scrollbar flex flex-col gap-2 xxs:gap-5'
                        >
                            {myTweets.map((tweet) => (
                                <CardWrapper tweet={tweet} key={tweet._id}>
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
                </div>
                <WhoToFollowWrapper>
                    <Wrapper className='w-full dl:w-[300px] p-2 xxs:p-3 xs:p-4 dl:p-5 gx:p-7.5 gx:mb-5'>
                        <div className='font-semibold text-xl leading-xl text-black dark:text-white'>
                            Who to follow
                        </div>
                        {loading ||
                            profile.whoToFollow.map((user) => (
                                <Follow key={user._id} user={user} />
                            ))}
                        {(loading || loadingFollow) && (
                            <RenderList
                                className='gap-2 xxs:gap-5'
                                Control={PersonSkeleton}
                            />
                        )}
                        {profile.whoToFollowPage < profile.whoToFollowPages &&
                            !loading && (
                                <button
                                    onClick={handleLoadMoreWhoToFollow}
                                    className='w-fit font-medium text-xs leading-xs text-blue-white-2 dark:text-blue'
                                >
                                    SHOW more
                                </button>
                            )}
                    </Wrapper>
                </WhoToFollowWrapper>
            </div>
        </div>
    );
};

export default Profile;

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../app/hooks';
import {
    countTweetsByUserId,
    getTweetsByUserId,
    toggleFollow,
    toggleFollowList,
} from '../features/lists';
import { IList } from '../interfaces';
import Button from './Button';
import { FollowIcon, MessageIcon, UnFollowIcon } from './Icons';
import Image from './Image';
import Card from './card';
import CardWrapper from './card/CardWrapper';

const ListDetail = ({ list }: { list: IList }) => {
    const [tweetLoading, setTweetLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const { Icon, title } = useMemo(() => {
        if (list.isFollowing)
            return {
                title: 'Unfollow',
                Icon: UnFollowIcon,
            };

        return {
            title: 'Follow',
            Icon: FollowIcon,
        };
    }, [list.isFollowing]);

    const handleToggleFollow = async () => {
        try {
            dispatch(
                toggleFollowList({
                    userId: list._id,
                    isFollow: !list.isFollowing,
                }),
            );

            await dispatch(
                toggleFollow({
                    follow: !list.isFollowing,
                    tweetOwner: list._id,
                    userId: list._id,
                }),
            ).unwrap();
        } catch (error) {
            toast.error('Failed to toggle follow');
            dispatch(
                toggleFollowList({
                    userId: list._id,
                    isFollow: list.isFollowing,
                }),
            );
        }
    };

    useEffect(() => {
        const getTweets = async () => {
            setTweetLoading(true);
            try {
                if (list.pages === -1) {
                    await Promise.all([
                        dispatch(
                            getTweetsByUserId({ userId: list._id, page: 1 }),
                        ).unwrap(),
                        dispatch(countTweetsByUserId(list._id)).unwrap(),
                    ]);
                }
            } catch (error) {
            } finally {
                setTweetLoading(false);
            }
        };

        getTweets();
    }, [dispatch, list]);

    return (
        <div className='flex-1 mb-2 rounded-2.5 shadow-box dark:shadow-none overflow-hidden dark:bg-dark-black-3'>
            <Image
                alt=''
                src={list.background}
                className='h-auto aspect-[809/207]'
                fallback={process.env.REACT_APP_FALLBACK_BACKGROUND}
            />
            <div className='-mt-17.5 mb-[43.5px] mx-5 pt-0 p-5 flex items-center gap-5 bg-white dark:bg-dark-black-2 shadow-[0px_5px_45px_#EBEBED] dark:shadow-none rounded-lg'>
                <Image
                    alt=''
                    src={list.avatar}
                    className='w-[200px] aspect-square'
                    rounded
                />
                <div className='mt-[18.5px] flex-1 flex flex-col gap-1.25'>
                    {/* <div className='font-semibold text-3xl text-black dark:text-white'>
                            Sunday Suppers
                        </div>
                        <div className='font-semibold text-xl leading-xl text-black dark:text-white'>
                            Delicious dinner ideas
                        </div> */}
                    <div>
                        <span className='font-semibold text-black dark:text-white'>
                            {list.name}
                        </span>{' '}
                        <span className='font-medium text-sm leading-sm text-black-8 dark:text-white'>
                            @{list.username}
                        </span>
                    </div>
                    <div className='font-semibold text-sm leading-sm text-black dark:text-white'>
                        <span>{list.followers} Followers</span>
                        <span className='ml-[14px]'>
                            {list.following} Following
                        </span>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <Button
                        onClick={handleToggleFollow}
                        className={
                            list.isFollowing
                                ? 'bg-white-7 text-black'
                                : 'bg-blue text-white'
                        }
                        icon={<Icon className='w-5.5 h-5.5 fill-current' />}
                    >
                        {title}
                    </Button>
                    <Button
                        className='bg-white-7 text-black'
                        icon={
                            <MessageIcon className='w-5.5 h-5.5 fill-current' />
                        }
                    >
                        Message
                    </Button>
                </div>
            </div>
            <div className='mt-7 flex flex-col gap-5'>
                {list.tweets.map((tweet) => (
                    <CardWrapper type='LISTS' key={tweet._id} tweet={tweet}>
                        <Card />
                    </CardWrapper>
                ))}
                {tweetLoading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default ListDetail;

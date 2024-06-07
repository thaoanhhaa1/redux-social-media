import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { tweets } from '../../constants';
import { ITweet } from '../../interfaces';
import { tweetService } from '../../services';
import { getTweetDTO, getTweetsDTO } from '../../utils';

const getMyTweets = createAsyncThunk(
    'tweets/getMyTweets',
    async (page: number): Promise<Array<ITweet>> => {
        const skip = (page - 1) * tweets.NUMBER_OF_PAGES;
        const limit = tweets.NUMBER_OF_PAGES;

        const res = await axiosClient.get(api.getMyTweets(), {
            params: { skip, limit },
        });

        return res.data;
    },
);

const getTweets = createAsyncThunk(
    'tweets/getTweets',
    async (page: number): Promise<Array<ITweet>> => {
        try {
            const res = await axiosClient.get(api.getFollowingTweets(), {
                params: { page },
            });

            return res.data;
        } catch (error) {
            throw error;
        }
    },
);

const countFollowingTweets = createAsyncThunk(
    'tweets/countFollowingTweets',
    async (): Promise<number> => {
        const res = await axiosClient.get(api.countFollowingTweets());

        return res.data;
    },
);

const getTweet = createAsyncThunk(
    'tweets/getTweet',
    async ({
        tweetId,
        userId,
    }: {
        tweetId: string;
        userId: string;
    }): Promise<ITweet> => {
        const res = await axiosClient.get(api.getTweet(userId, tweetId));

        return res.data;
    },
);

const countMyTweets = createAsyncThunk(
    'tweets/countMyTweets',
    async (): Promise<number> => {
        const res = await axiosClient.get(api.countTweet());

        return res.data;
    },
);

const toggleLikeTweet = createAsyncThunk<
    any,
    {
        tweetId: string;
        isLike: boolean;
        userId: string;
        tweetOwner: string;
    },
    {
        rejectValue: {
            tweetId: string;
            isLike: boolean;
            userId: string;
            tweetOwner: string;
        };
    }
>('tweets/toggleLikeTweet', async (data, { rejectWithValue }) => {
    const { isLike, tweetId } = data;

    try {
        const res = await axiosClient.post(api.toggleLike(), {
            isLike,
            tweetId,
        });

        return res.data;
    } catch (error) {
        return rejectWithValue(data);
    }
});

const toggleInterested = createAsyncThunk<
    any,
    {
        interested: boolean;
        tweetId: string;
        tweetOwner: string;
    },
    {
        rejectValue: {
            interested: boolean;
            tweetId: string;
            tweetOwner: string;
        };
    }
>('tweets/toggleInterested', async (data, { rejectWithValue }) => {
    const { interested, tweetId } = data;

    try {
        const res = await axiosClient.post(
            api[`${interested ? 'i' : 'notI'}nterestedTweet`](tweetId),
        );

        return res.data;
    } catch (error) {
        return rejectWithValue(data);
    }
});

const toggleFollow = createAsyncThunk<
    any,
    {
        userId: string;
        follow: boolean;
        tweetOwner: string;
    },
    {
        rejectValue: {
            userId: string;
            follow: boolean;
            tweetOwner: string;
        };
    }
>('tweets/toggleFollow', async (data, { rejectWithValue }) => {
    const { userId, follow } = data;

    try {
        const res = await axiosClient.post(
            follow ? api.follow() : api.unfollow(),
            {
                userId,
            },
        );

        return res.data;
    } catch (error) {
        return rejectWithValue(data);
    }
});

const toggleList = createAsyncThunk<
    any,
    { userId: string; isAdd: boolean; tweetOwner: string },
    {
        rejectValue: { userId: string; isAdd: boolean; tweetOwner: string };
    }
>('tweets/toggleList', async (data, { rejectWithValue }) => {
    const { userId, isAdd } = data;

    try {
        const res = await axiosClient.post(api.toggleList(isAdd), {
            userId,
        });

        return res.data;
    } catch (error) {
        return rejectWithValue(data);
    }
});

const toggleReport = createAsyncThunk(
    'toggleReport',
    async ({
        isReport,
        tweetId,
    }: {
        tweetId: string;
        isReport: boolean;
        tweetOwner: string;
    }) => {
        await tweetService[isReport ? 'report' : 'unReport'](tweetId);

        return {
            tweetId,
            isReport,
        };
    },
);

const getTweetsByUserId = createAsyncThunk(
    'bookmarks/getTweets',
    async ({
        userId,
        page,
    }: {
        userId: string;
        page: number;
    }): Promise<Array<ITweet>> => {
        const res = await tweetService.getTweetsByUserId({ userId, page });

        return res;
    },
);

const countTweetsByUserId = createAsyncThunk(
    'tweets/countTweetsByUserId',
    async (userId: string) => {
        const res = await tweetService.countTweetsByUserId(userId);

        return res;
    },
);

const addViewer = createAsyncThunk(
    'tweets/addViewer',
    async ({ tweetId }: { tweetId: string; tweetOwner: string }) => {
        await tweetService.addViewer(tweetId);

        return tweetId;
    },
);

const tweetHelper = {
    asyncThunk: {
        getMyTweets,
        getTweets,
        countFollowingTweets,
        getTweet,
        countMyTweets,
        toggleLikeTweet,
        toggleInterested,
        toggleFollow,
        toggleList,
        toggleReport,
        getTweetsByUserId,
        countTweetsByUserId,
        addViewer,
    },
    reducers: {
        addNewTweet: (tweets: ITweet[], tweet: ITweet) => {
            tweet.isNewTweet = true;
            tweet.notInterested = false;
            tweets.unshift(getTweetDTO(tweet));
        },
        updateTweet: (tweets: ITweet[], tweet: ITweet) => {
            const index = findIndexTweet(tweets, tweet._id);

            if (index === -1) return;

            tweets[index] = tweet;
        },
        setTweetActiveId: (state: any, value: string | null) => {
            state.tweetActiveId = value;
        },
        toggleLikeTweetSocket: ({
            isLike,
            tweetId,
            tweets,
            userId,
        }: {
            tweets: ITweet[];
            tweetId: string;
            userId: string;
            isLike: boolean;
        }) => {
            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            if (isLike) {
                if (!tweet.likes.includes(userId)) tweet.likes.push(userId);

                return;
            }

            const index = tweet.likes.findIndex((id) => id === userId);

            tweet.likes.splice(index, 1);
        },
        setBlock: ({
            isBlock,
            tweetId,
            tweets,
        }: {
            tweetId: string;
            isBlock: boolean;
            tweets: ITweet[];
        }) => {
            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            tweet.blocked = isBlock;
        },
    },
    extraReducers: {
        toggleLikeTweetPending: ({
            meta,
            tweets,
        }: {
            tweets: ITweet[];
            meta: any;
        }) => {
            const { tweetId, isLike, userId } = meta.arg;

            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            if (isLike) tweet.likes.push(userId);
            else tweet.likes.pop();
        },
        toggleLikeTweetRejected: ({
            tweets,
            isLike,
            tweetId,
            userId,
        }: {
            tweets: ITweet[];
            tweetId: string;
            isLike: boolean;
            userId: string;
        }) => {
            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            if (isLike) tweet.likes.pop();
            else tweet.likes.push(userId);
        },
        toggleInterestedPending: ({
            meta,
            tweets,
        }: {
            tweets: ITweet[];
            meta: any;
        }) => {
            const { interested, tweetId } = meta.arg;

            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            tweet.notInterested = !interested;
        },
        toggleInterestedRejected: ({
            tweets,
            interested,
            tweetId,
        }: {
            tweets: ITweet[];
            interested: boolean;
            tweetId: string;
        }) => {
            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            tweet.notInterested = interested;
        },
        toggleFollowPending: ({
            meta,
            tweets,
        }: {
            tweets: ITweet[];
            meta: any;
        }) => {
            const { userId, follow } = meta.arg;

            tweets.forEach((tweet) => {
                if (tweet.user._id === userId) tweet.user.follow = follow;
            });
        },
        toggleFollowRejected: ({
            tweets,
            userId,
            follow,
        }: {
            tweets: ITweet[];
            userId: string;
            follow: boolean;
        }) => {
            const tweet = findById(tweets, userId);
            if (!tweet) return;

            tweet.user.follow = !follow;
        },
        toggleListPending: ({
            meta,
            tweets,
        }: {
            tweets: ITweet[];
            meta: any;
        }) => {
            const { userId, isAdd } = meta.arg;

            tweets.forEach((tweet) => {
                if (tweet.user._id === userId) tweet.user.isInList = isAdd;
            });
        },
        toggleListRejected: ({
            tweets,
            userId,
            isAdd,
        }: {
            tweets: ITweet[];
            userId: string;
            isAdd: boolean;
        }) => {
            const tweet = findById(tweets, userId);
            if (!tweet) return;

            tweet.user.isInList = !isAdd;
        },
        toggleReportFulfilled: ({
            isReport,
            tweetId,
            tweets,
        }: {
            tweets: ITweet[];
            tweetId: string;
            isReport: boolean;
        }) => {
            const tweet = findById(tweets, tweetId);

            if (!tweet) return;

            tweet.report = isReport;
        },
        getTweetsByUserIdFulfilled: ({
            tweets,
            tweetsResults,
        }: {
            tweets: ITweet[];
            tweetsResults: ITweet[];
        }) => {
            tweets.push(...getTweetsDTO(tweetsResults));
        },
        addViewerPending: ({
            tweets,
            tweetId,
        }: {
            tweets: ITweet[];
            tweetId: string;
        }) => {
            const tweet = findById(tweets, tweetId);

            if (!tweet) return;

            tweet.viewed = true;
        },
        addViewerReject: ({
            tweets,
            tweetId,
        }: {
            tweets: ITweet[];
            tweetId: string;
        }) => {
            const tweet = findById(tweets, tweetId);

            if (!tweet) return;

            tweet.viewed = false;
        },
    },
};

function findIndexTweet(tweets: ITweet[], tweetId: string): number {
    const length = tweets.length;

    for (let index = 0; index < length; index++) {
        const tweet = tweets[index];

        if (tweet._id === tweetId) return index;
    }

    return -1;
}

function findById(tweets: ITweet[], tweetId: string): ITweet | undefined {
    return tweets.find((tweet) => tweet._id === tweetId);
}

export default tweetHelper;

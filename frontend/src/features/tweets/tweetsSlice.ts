import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { ITweet } from '../../interfaces';
import { getTweetDTO, getTweetsDTO } from '../../utils';

type FollowingTweet = {
    tweets: ITweet[];
    isLoading: boolean;
    followingPage: number;
    followingPages: number;
    myTweetPage: number;
    myTweetPages: number;
};

const NUMBER_MY_TWEET_OF_PAGE = 8;

const initialState: FollowingTweet = {
    tweets: [],
    isLoading: false,
    followingPage: 0,
    followingPages: -1,
    myTweetPage: 0,
    myTweetPages: -1,
};

const getMyTweets = createAsyncThunk(
    'tweets/getMyTweets',
    async (page: number): Promise<Array<ITweet>> => {
        const skip = (page - 1) * NUMBER_MY_TWEET_OF_PAGE;
        const limit = NUMBER_MY_TWEET_OF_PAGE;

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
    async ({ tweetId }: { tweetId: string }): Promise<ITweet> => {
        const res = await axiosClient.get(api.getTweet(tweetId));

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

const tweetsSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        addNewTweet: (state, { payload }: { payload: ITweet }) => {
            payload.isNewTweet = true;
            state.tweets.unshift(getTweetDTO(payload));
        },
        updateTweet: (state, { payload }: { payload: ITweet }) => {
            const index = findIndexTweet(state.tweets, payload._id);

            if (index === -1) return state;

            state.tweets[index] = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTweets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTweets.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getTweets.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.followingPage += 1;

                const tweetIds = state.tweets.map((tweet) => tweet._id);

                const tweets = payload
                    .filter((tweet) => !tweetIds.includes(tweet._id))
                    .map(getTweetDTO);

                state.tweets.push(...tweets);
            })
            .addCase(getMyTweets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyTweets.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getMyTweets.fulfilled, (state, { payload }) => {
                if (payload.length) {
                    state.tweets.push(...getTweetsDTO(payload));
                    state.isLoading = false;
                    state.myTweetPage += 1;
                }
            })
            .addCase(countFollowingTweets.fulfilled, (state, { payload }) => {
                state.followingPages = Math.ceil(payload / 10);
            })
            .addCase(countMyTweets.fulfilled, (state, { payload }) => {
                state.myTweetPages = Math.ceil(
                    payload / NUMBER_MY_TWEET_OF_PAGE,
                );
            })
            .addCase(getTweet.fulfilled, (state, { payload }) => {
                state.tweets.push(getTweetDTO(payload));
            });
    },
});

function findIndexTweet(tweets: ITweet[], tweetId: string): number {
    const length = tweets.length;

    for (let index = 0; index < length; index++) {
        const tweet = tweets[index];

        if (tweet._id === tweetId) return index;
    }

    return -1;
}

export default tweetsSlice.reducer;
export {
    countFollowingTweets,
    countMyTweets,
    getMyTweets,
    getTweet,
    getTweets,
};
export const { addNewTweet, updateTweet } = tweetsSlice.actions;

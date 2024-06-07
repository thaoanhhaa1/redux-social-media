import { createSlice } from '@reduxjs/toolkit';
import { ITweet } from '../../interfaces';

const initialState: {
    tweet?: ITweet;
} = {};

const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {
        toggleUserList: (state) => {
            if (state.tweet)
                state.tweet.user.isInList = !state.tweet.user.isInList;
        },
        toggleUserFollow: (state) => {
            if (state.tweet) state.tweet.user.follow = !state.tweet.user.follow;
        },
        toggleLikeTweet: (
            state,
            {
                payload,
            }: {
                payload: {
                    tweetId: string;
                    userId: string;
                };
            },
        ) => {
            const tweet = state.tweet;

            if (!tweet || !tweet.likes) return state;

            const index = tweet.likes.findIndex(
                (userId) => userId === payload.userId,
            );

            if (index === -1) tweet.likes.push(payload.userId);
            else tweet.likes.splice(index, 1);
        },
        toggleNotInterested: (state) => {
            if (state.tweet)
                state.tweet.notInterested = !state.tweet.notInterested;
        },
        setTweet: (state, { payload }: { payload: ITweet }) => {
            state.tweet = payload;
        },
    },
    extraReducers: (builder) => {},
});

export default tweetSlice.reducer;

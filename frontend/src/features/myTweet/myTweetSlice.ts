import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITweet } from '../../interfaces';
import axiosClient from '../../api/axiosClient';
import api from '../../api';

const initialState: {
    tweets: ITweet[];
    isLoading: boolean;
    tag: string;
    feeling: string;
    image: string;
} = {
    tweets: [],
    isLoading: false,
    tag: '',
    feeling: '',
    image: '',
};

const createTweet = createAsyncThunk(
    'myTweet/createTweet',
    async (tweet: ITweet) => {
        try {
            const res = await axiosClient.post(api.createTweet(), {
                content: tweet.content,
                images: tweet.images,
                videos: tweet.videos,
                group: tweet.group,
            });

            return res.data;
        } catch (error) {
            console.error('🚀 ~ error:', error);
            throw error;
        }
    },
);

const myTweetSlice = createSlice({
    name: 'myTweet',
    initialState,
    reducers: {
        addTweets: (state, { payload }) => {
            state.tweets.push(...payload);
        },
        setTag: (state, { payload }) => {
            state.tag = payload;
        },
        setFeeling: (state, { payload }) => {
            state.feeling = payload.feeling;
            state.image = payload.image;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTweet.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTweet.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(createTweet.fulfilled, (state, { payload }) => {
                state.tweets.unshift(payload);
                state.isLoading = false;
                state.tag = '';
                state.feeling = '';
                state.image = '';
            });
    },
});

export default myTweetSlice.reducer;
export const { addTweets, setFeeling, setTag } = myTweetSlice.actions;
export { createTweet };

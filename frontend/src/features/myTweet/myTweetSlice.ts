import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { IGif, ILocation, ITweet, IUserTweet } from '../../interfaces';

const initialState: {
    tweets: ITweet[];
    isLoading: boolean;
    tag: string;
    feeling: string;
    image?: string;
    location?: ILocation;
    tagPeople?: IUserTweet[];
    gif?: IGif;
} = {
    tweets: [],
    isLoading: false,
    tag: '',
    feeling: '',
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
        init: (state) => {
            Object.assign(state, initialState);
        },
        addTweets: (state, { payload }) => {
            state.tweets.push(...payload);
        },
        setTag: (state, { payload }) => {
            state.tag = payload;
            state.feeling = '';
            state.image = '';
        },
        setFeeling: (state, { payload }) => {
            state.feeling = payload.feeling;
            state.image = payload.image;
        },
        setLocation: (
            state,
            { payload }: { payload: ILocation | undefined },
        ) => {
            state.location = payload;
        },
        addTagPeople: (state, { payload }: { payload: IUserTweet }) => {
            if (state.tagPeople) state.tagPeople.push(payload);
            else state.tagPeople = [payload];
        },
        removeTagPeople: (state, { payload }: { payload: string }) => {
            state.tagPeople = state?.tagPeople?.filter(
                (user) => user._id !== payload,
            );

            if (state.tagPeople?.length === 0) state.tagPeople = undefined;
        },
        setGif: (state, { payload }: { payload: IGif | undefined }) => {
            state.gif = payload;
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
export const {
    addTweets,
    setFeeling,
    setTag,
    init,
    setLocation,
    addTagPeople,
    removeTagPeople,
    setGif,
} = myTweetSlice.actions;
export { createTweet };

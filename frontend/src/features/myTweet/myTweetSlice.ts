import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { IGif, ILocation, ITweet, IPerson } from '../../interfaces';
import SubProps from '../../types/SubProps';

const initialState: {
    tweets: ITweet[];
    newTweets: ITweet[];
    isLoading: boolean;
    tag: string;
    feeling: string;
    image?: string;
    images?: string[];
    location?: ILocation;
    tagPeople?: IPerson[];
    gif?: IGif;
    isShowUploadImage?: boolean;
    value: string;
    sub?: SubProps;
} = {
    tweets: [],
    newTweets: [],
    isLoading: false,
    tag: '',
    feeling: '',
    value: '',
};

const createTweet = createAsyncThunk(
    'myTweet/createTweet',
    async (tweet: ITweet) => {
        try {
            await axiosClient.post(api.createTweet(), {
                content: tweet.content,
                images: tweet.images,
                videos: tweet.videos,
                group: tweet.group,
                feeling: tweet.feeling,
                location: tweet.location,
                tagPeople: tweet.tagPeople?.map((tag) => tag._id),
                gif: tweet.gif,
            });

            return tweet;
        } catch (error) {
            console.error('🚀 ~ error:', error);
            throw error;
        }
    },
);

const getMyTweets = createAsyncThunk('myTweet/getMyTweets', async () => {
    const res = await axiosClient.get(api.getMyTweets());

    return res.data;
});

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
        addTagPeople: (state, { payload }: { payload: IPerson }) => {
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
        setShowUploadImage: (
            state,
            { payload }: { payload: boolean | undefined },
        ) => {
            state.isShowUploadImage = payload;
        },
        setImage: (state, { payload }: { payload: string | undefined }) => {
            state.images = payload ? [payload] : undefined;
        },
        setValue: (state, { payload }: { payload: string }) => {
            state.value = payload;
        },
        setSub: (state, { payload }: { payload: SubProps | undefined }) => {
            state.sub = payload;
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
                state.newTweets.unshift(payload);
                state.isLoading = false;
                state.tag = '';
                state.feeling = '';
                state.image = '';
            })
            .addCase(getMyTweets.fulfilled, (state, { payload }) => {
                state.tweets.push(...payload);
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
    setShowUploadImage,
    setImage,
    setValue,
    setSub,
} = myTweetSlice.actions;
export { createTweet, getMyTweets };

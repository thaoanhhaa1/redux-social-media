import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { IGif, ILocation, IPerson, ITweetPost } from '../../interfaces';

const initialState: {
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
} = {
    isLoading: false,
    tag: '',
    feeling: '',
    value: '',
};

const createTweet = createAsyncThunk(
    'myTweet/createTweet',
    async (tweet: ITweetPost) => {
        const result = await axiosClient.post(api.createTweet(), {
            user: tweet.user,
            content: tweet.content,
            images: tweet.images,
            videos: tweet.videos,
            group: tweet.group,
            feeling: tweet.feeling,
            location: tweet.location,
            tagPeople: tweet.tagPeople?.map((tag) => tag._id),
            gif: tweet.gif,
        });

        return {
            ...result.data,
            location: tweet.location,
            tagPeople: tweet.tagPeople,
        };
    },
);

const myTweetSlice = createSlice({
    name: 'myTweet',
    initialState,
    reducers: {
        init: (state) => {
            Object.assign(state, initialState);
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
    },
    extraReducers: (builder) => {},
});

export default myTweetSlice.reducer;
export const {
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
} = myTweetSlice.actions;
export { createTweet };

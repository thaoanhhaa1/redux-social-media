import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { IPersonTweet, ITweet } from '../../interfaces';

const initialState: {
    data: Array<{
        user: IPersonTweet;
        tweets: Array<ITweet>;
    }>;
    isLoading: boolean;
} = {
    data: [],
    isLoading: false,
};

const getTweets = createAsyncThunk('followingTweets/getTweets', async () => {
    try {
        const res = await axiosClient.get(api.getFollowingTweets());

        return res.data;
    } catch (error) {
        throw error;
    }
});

const toggleLike = createAsyncThunk(
    'followingTweets/toggleLike',
    ({
        userId,
        tweetId,
        isLike,
    }: {
        userId: string;
        tweetId: string;
        isLike: boolean;
    }) => {
        try {
            axiosClient.post(api.toggleLike(), {
                _id: userId,
                tweetId,
                isLike,
            });
        } catch (error) {}
    },
);

const toggleList = createAsyncThunk(
    'followingTweets/toggleList',
    async ({ userId, isAdd }: { userId: string; isAdd: boolean }) => {
        const res = await axiosClient.post(api.toggleList(isAdd), {
            userId,
        });

        return res.data;
    },
);

const followingTweetsSlice = createSlice({
    name: 'followingTweets',
    initialState,
    reducers: {
        toggleUserList: (state, { payload }: { payload: string }) => {
            state.data.forEach((item) => {
                if (item.user._id === payload) {
                    item.user.isInList = !item.user.isInList;
                    return;
                }
            });
        },
        toggleUserFollow: (state, { payload }: { payload: string }) => {
            state.data.forEach((item) => {
                if (item.user._id === payload) {
                    item.user.follow = !item.user.follow;
                    return;
                }
            });
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
                state.data = payload;
            });
    },
});

export default followingTweetsSlice.reducer;
export { getTweets, toggleLike, toggleList };
export const { toggleUserList, toggleUserFollow } =
    followingTweetsSlice.actions;

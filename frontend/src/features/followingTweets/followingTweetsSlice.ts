import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITweet, IUserTweet } from '../../interfaces';
import axiosClient from '../../api/axiosClient';
import api from '../../api';

const initialState: {
    data: Array<{
        user: IUserTweet;
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

const followingTweetsSlice = createSlice({
    name: 'followingTweets',
    initialState,
    reducers: {},
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
export { getTweets };

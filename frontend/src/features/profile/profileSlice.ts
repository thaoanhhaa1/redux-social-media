import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { IProfile } from '../../interfaces';

const initialState: IProfile = {
    tweetCount: 0,
    followerCount: 0,
    followingCount: 0,
    whoToFollow: [],
    isLoading: false,
};

const getProfile = createAsyncThunk('profile/getProfile', async () => {
    const res = (
        await Promise.all([
            axiosClient.get(api.countTweet()),
            axiosClient.get(api.countFollow()),
            axiosClient.get(api.whoToFollow()),
        ])
    ).map((item) => item.data);

    return res;
});

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        inc: (state, { payload }: { payload: 'follower' | 'following' }) => {
            if (payload === 'follower') state.followerCount += 1;
            else state.followingCount += 1;
        },
        dec: (state, { payload }: { payload: 'follower' | 'following' }) => {
            if (payload === 'follower') state.followerCount -= 1;
            else state.followingCount -= 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProfile.fulfilled, (state, { payload }) => {
            state.tweetCount = payload[0];
            state.followerCount = payload[1][0];
            state.followingCount = payload[1][1];
            state.whoToFollow = payload[2];
            state.isLoading = true;
        });
    },
});

export default profileSlice.reducer;
export { getProfile };
export const { dec, inc } = profileSlice.actions;

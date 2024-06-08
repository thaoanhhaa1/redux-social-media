import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { IProfile, IUserProfile } from '../../interfaces';
import { tweetHelper } from '../helpers';

const NUMBER_OF_PAGE = 5;

const initialState: IProfile = {
    tweetCount: 0,
    followerCount: 0,
    followingCount: 0,
    whoToFollow: [],
    whoToFollowPage: 0,
    whoToFollowPages: -1,
    isLoading: false,
};

const getProfile = createAsyncThunk('profile/getProfile', async () => {
    const res = (
        await Promise.all([
            axiosClient.get(api.countTweet()),
            axiosClient.get(api.countFollow()),
        ])
    ).map((item) => item.data);

    return res;
});

const getWhoToFollow = createAsyncThunk(
    'profile/getWhoToFollow',
    async (page: number): Promise<IUserProfile[]> => {
        const skip = (page - 1) * NUMBER_OF_PAGE;
        const limit = NUMBER_OF_PAGE;

        const res = await axiosClient.get(api.whoToFollow(), {
            params: {
                skip,
                limit,
            },
        });

        return res.data;
    },
);

const getWhoToFollowPages = createAsyncThunk(
    'profile/getWhoToFollowPages',
    async () => {
        const res = await axiosClient.get(api.countWhoToFollow());

        return Math.ceil(res.data / NUMBER_OF_PAGE);
    },
);

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
        builder
            .addCase(getProfile.fulfilled, (state, { payload }) => {
                state.tweetCount = payload[0];
                state.followerCount = payload[1][0];
                state.followingCount = payload[1][1];
                state.isLoading = true;
            })
            .addCase(
                getWhoToFollowPages.fulfilled,
                (state, { payload }: { payload: number }) => {
                    state.whoToFollowPages = payload;
                },
            )
            .addCase(getWhoToFollow.fulfilled, (state, { payload }) => {
                state.whoToFollow.push(...payload);
                state.whoToFollowPage += 1;
            });

        // Tweets
        builder
            .addCase(tweetHelper.asyncThunk.deleteTweet.pending, (state) => {
                state.tweetCount -= 1;
            })
            .addCase(tweetHelper.asyncThunk.deleteTweet.rejected, (state) => {
                state.tweetCount += 1;
            });
    },
});

export default profileSlice.reducer;
export { getProfile, getWhoToFollow, getWhoToFollowPages };
export const { dec, inc } = profileSlice.actions;

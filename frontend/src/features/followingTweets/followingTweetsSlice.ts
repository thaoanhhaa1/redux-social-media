import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { IPerson, IPersonTweet, ITweet } from '../../interfaces';
import IComment from '../../interfaces/IComment';
import { comments } from '../../constants';

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

const getComments = createAsyncThunk(
    'followingTweets/getComments',
    async ({ tweetId, skip }: { tweetId: String; skip: number }) => {
        const res = await axiosClient.get(api.getComments(tweetId), {
            params: {
                skip,
                limit: comments.LIMIT,
            },
        });

        return res.data;
    },
);

const postComment = createAsyncThunk(
    'followingTweets/postComment',
    async ({
        user,
        content,
        parent,
        tweetId,
    }: {
        user: IPerson;
        content: string;
        parent?: string;
        tweetId: string;
    }) => {
        const res = await axiosClient.post(api.postComments(tweetId), {
            user,
            content,
            parent,
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

                state.data.forEach((item) => {
                    item.tweets.forEach((tweet) => {
                        tweet.skip = 0;
                        tweet.comments = [];
                    });
                });
            })
            .addCase(
                getComments.fulfilled,
                (state, { payload }: { payload: IComment[] }) => {
                    if (payload.length) {
                        const tweetId = payload[0].post;

                        state.data.find((item) =>
                            item.tweets.find((tweet) => {
                                if (tweet._id === tweetId) {
                                    tweet.skip += 1;
                                    return tweet.comments.push(...payload);
                                }
                                return false;
                            }),
                        );
                    }
                },
            )
            .addCase(
                postComment.fulfilled,
                (state, { payload }: { payload: IComment }) => {
                    const tweetId = payload.post;

                    state.data.find((item) =>
                        item.tweets.find((tweet) => {
                            if (tweet._id === tweetId)
                                return tweet.comments.unshift(payload);
                            return false;
                        }),
                    );
                },
            );
    },
});

export default followingTweetsSlice.reducer;
export { getTweets, toggleLike, toggleList, getComments, postComment };
export const { toggleUserList, toggleUserFollow } =
    followingTweetsSlice.actions;

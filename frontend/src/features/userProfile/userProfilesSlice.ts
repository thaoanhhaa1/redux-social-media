import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tweets } from '../../constants';
import { IList } from '../../interfaces';
import { listService } from '../../services';
import { findTweetById } from '../../utils';
import { deleteComment, postComment } from '../comments';
import { tweetHelper } from '../helpers';
export const {
    getTweets,
    getMyTweets,
    countFollowingTweets,
    countMyTweets,
    getTweet,
    toggleList,
    toggleFollow,
    toggleLikeTweet,
    toggleInterested,
    toggleReport,
    addViewer,
    deleteTweet,
} = tweetHelper.asyncThunk;

export const { getTweetsByUserId, countTweetsByUserId } =
    tweetHelper.asyncThunk;

interface ListsState {
    lists: IList[];
    loading: boolean;
    tweetActiveId: string | null;
}

const initialState: ListsState = {
    lists: [],
    loading: false,
    tweetActiveId: null,
};

export const getUserProfile = createAsyncThunk(
    'lists/getLists',
    async ({ username }: { username: string }) => {
        const res = await listService.getUser({ username });
        return res;
    },
);

const listsSlice = createSlice({
    name: 'userProfiles',
    initialState,
    reducers: {
        toggleFollowList: (
            state,
            {
                payload,
            }: {
                payload: {
                    userId: string;
                    isFollow: boolean;
                };
            },
        ) => {
            const list = findByUserId(state.lists, payload.userId);

            if (!list) return;

            list.isFollowing = payload.isFollow;
        },
        setBlock: (
            state,
            {
                payload: { isBlock, tweetId, tweetOwner },
            }: {
                payload: {
                    isBlock: boolean;
                    tweetId: string;
                    tweetOwner: string;
                };
            },
        ) => {
            const list = findByUserId(state.lists, tweetOwner);
            if (!list) return state;

            tweetHelper.reducers.setBlock({
                isBlock,
                tweetId,
                tweets: list.tweets,
            });
        },
        toggleLikeTweetSocket: (
            state,
            {
                payload: { isLike, tweetId, userId, tweetOwner },
            }: {
                payload: {
                    isLike: boolean;
                    tweetId: string;
                    userId: string;
                    tweetOwner: string;
                };
            },
        ) => {
            const list = findByUserId(state.lists, tweetOwner);
            if (!list) return state;

            tweetHelper.reducers.toggleLikeTweetSocket({
                isLike,
                tweetId,
                tweets: list.tweets,
                userId,
            });
        },
        setTweetActiveId: (state, { payload }) => {
            state.tweetActiveId = payload;
        },
        incNumberOfComments: (
            state,
            {
                payload,
            }: {
                payload: {
                    tweetId: string;
                    tweetOwner: string;
                };
            },
        ) => {
            const list = findByUserId(state.lists, payload.tweetOwner);

            if (!list) return state;
            tweetHelper.reducers.incNumberOfComments(
                list.tweets,
                payload.tweetId,
            );
        },
        decNumberOfComments: (
            state,
            {
                payload,
            }: {
                payload: {
                    tweetId: string;
                    tweetOwner: string;
                };
            },
        ) => {
            const list = findByUserId(state.lists, payload.tweetOwner);

            if (!list) return state;
            tweetHelper.reducers.decNumberOfComments(
                list.tweets,
                payload.tweetId,
            );
        },

        deleteTweetSocket: (
            state,
            {
                payload: { tweetId, tweetOwner },
            }: {
                payload: {
                    tweetId: string;
                    tweetOwner: string;
                };
            },
        ) => {
            const list = findByUserId(state.lists, tweetOwner);

            if (!list) return state;

            tweetHelper.reducers.deleteTweetSocket(list.tweets, tweetId);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, { payload }) => {
                state.lists.push({
                    ...payload,
                    tweets: [],
                    page: 0,
                    pages: -1,
                });
                state.loading = false;
            })
            .addCase(getUserProfile.rejected, (state) => {
                state.loading = false;
            });

        //
        builder
            .addCase(
                getTweetsByUserId.fulfilled,
                (state, { payload, meta }) => {
                    const list = findByUserId(state.lists, meta.arg.userId);

                    if (!list) return;

                    tweetHelper.extraReducers.getTweetsByUserIdFulfilled({
                        tweets: list.tweets,
                        tweetsResults: payload,
                    });
                    list.page += 1;
                },
            )
            .addCase(
                countTweetsByUserId.fulfilled,
                (state, { payload, meta }) => {
                    const userId = meta.arg;

                    const list = findByUserId(state.lists, userId);

                    if (!list) return;

                    list.pages = Math.ceil(payload / tweets.NUMBER_OF_PAGES);
                },
            );

        builder
            .addCase(toggleList.pending, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.toggleListPending({
                    tweets: list.tweets,
                    meta,
                });
            })
            .addCase(toggleList.rejected, (state, { meta }) => {
                const { isAdd, userId, tweetOwner } = meta.arg;

                const list = findByUserId(state.lists, tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.toggleListRejected({
                    tweets: list.tweets,
                    isAdd,
                    userId,
                });
            })
            .addCase(toggleFollow.pending, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.toggleFollowPending({
                    tweets: list.tweets,
                    meta,
                });
            })
            .addCase(toggleFollow.rejected, (state, { meta }) => {
                const { follow, userId, tweetOwner } = meta.arg;

                const list = findByUserId(state.lists, tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.toggleFollowRejected({
                    tweets: list.tweets,
                    follow,
                    userId,
                });
            })
            .addCase(toggleLikeTweet.pending, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.toggleLikeTweetPending({
                    tweets: list.tweets,
                    meta,
                });
            })
            .addCase(toggleLikeTweet.rejected, (state, { meta }) => {
                const { isLike, tweetId, userId } = meta.arg;

                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.toggleLikeTweetRejected({
                    tweets: list.tweets,
                    isLike,
                    tweetId,
                    userId,
                });
            })
            .addCase(toggleInterested.pending, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.toggleInterestedPending({
                    tweets: list.tweets,
                    meta,
                });
            })
            .addCase(toggleInterested.rejected, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                const { tweetId, interested } = meta.arg;

                tweetHelper.extraReducers.toggleInterestedRejected({
                    tweets: list.tweets,
                    tweetId,
                    interested,
                });
            })
            .addCase(toggleReport.fulfilled, (state, { payload, meta }) => {
                const { isReport, tweetId } = payload;

                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.toggleReportFulfilled({
                    tweets: list.tweets,
                    isReport,
                    tweetId,
                });
            })
            .addCase(addViewer.rejected, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.addViewerReject({
                    tweets: list.tweets,
                    tweetId: meta.arg.tweetId,
                });
            })
            .addCase(addViewer.pending, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.addViewerPending({
                    tweets: list.tweets,
                    tweetId: meta.arg.tweetId,
                });
            })
            .addCase(deleteTweet.pending, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.deleteTweetPending({
                    tweets: list.tweets,
                    tweetId: meta.arg.tweetId,
                });
            })
            .addCase(deleteTweet.rejected, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.deleteTweetRejected({
                    tweets: list.tweets,
                    tweetId: meta.arg.tweetId,
                });
            });

        // Comments
        builder
            .addCase(postComment.fulfilled, (state, { payload, meta }) => {
                const { parent } = payload;

                if (parent) return state;
                const list = findByUserId(state.lists, meta.arg.tweetOwner);

                if (!list) return state;

                const tweet = findTweetById(list.tweets, meta.arg.tweetId);

                if (!tweet) return state;

                tweet.numberOfComments += 1;
            })
            .addCase(deleteComment.pending, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                const tweet = findTweetById(list.tweets, meta.arg.tweetId);

                if (!tweet) return state;

                tweet.numberOfComments -= 1;
            })
            .addCase(deleteComment.rejected, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                const tweet = findTweetById(list.tweets, meta.arg.tweetId);

                if (!tweet) return state;

                tweet.numberOfComments += 1;
            });
    },
});

function findByUserId(lists: IList[], userId: string) {
    return lists.find((list) => list._id === userId);
}

export default listsSlice.reducer;
export const {
    toggleFollowList,
    setBlock,
    toggleLikeTweetSocket,
    setTweetActiveId,
    decNumberOfComments,
    incNumberOfComments,
    deleteTweetSocket,
} = listsSlice.actions;

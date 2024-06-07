import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tweets } from '../../constants';
import { IComment, IList } from '../../interfaces';
import { listService } from '../../services';
import { tweetHelper } from '../helpers';
export const {
    getTweets,
    getMyTweets,
    countFollowingTweets,
    countMyTweets,
    getTweet,
    getComments,
    toggleList,
    toggleFollow,
    deleteComment,
    toggleLikeComment,
    toggleLikeTweet,
    toggleInterested,
    toggleReport,
    postComment,
    getChildrenComments,
    editComment,
    addViewer,
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
            const bookmark = findByUserId(state.lists, tweetOwner);
            if (!bookmark) return state;

            tweetHelper.reducers.setBlock({
                isBlock,
                tweetId,
                tweets: bookmark.tweets,
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
            const bookmark = findByUserId(state.lists, tweetOwner);
            if (!bookmark) return state;

            tweetHelper.reducers.toggleLikeTweetSocket({
                isLike,
                tweetId,
                tweets: bookmark.tweets,
                userId,
            });
        },
        toggleLikeCommentSocket: (
            state,
            {
                payload: { commentId, isLike, tweetId, userId, tweetOwner },
            }: {
                payload: {
                    commentId: string;
                    isLike: boolean;
                    tweetId: string;
                    userId: string;
                    tweetOwner: string;
                };
            },
        ) => {
            const bookmark = findByUserId(state.lists, tweetOwner);
            if (!bookmark) return state;

            tweetHelper.reducers.toggleLikeCommentSocket({
                commentId,
                isLike,
                tweetId,
                userId,
                tweets: bookmark.tweets,
            });
        },
        addCommentSocket: (
            state,
            {
                payload,
            }: {
                payload: {
                    comment: IComment;
                    tweetOwner: string;
                };
            },
        ) => {
            const bookmark = findByUserId(state.lists, payload.tweetOwner);
            if (!bookmark) return state;

            tweetHelper.reducers.addCommentSocket(
                bookmark.tweets,
                payload.comment,
            );
        },
        setTweetActiveId: (state, { payload }) => {
            state.tweetActiveId = payload;
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
            .addCase(getComments.fulfilled, (state, { payload, meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.getCommentsFulfilled({
                    comments: payload,
                    meta,
                    tweets: list.tweets,
                });
            })
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
            .addCase(deleteComment.pending, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.deleteCommentPending({
                    tweets: list.tweets,
                    meta,
                });
            })
            .addCase(deleteComment.rejected, (state, { meta }) => {
                const { commentId, tweetId, parentCommentId, tweetOwner } =
                    meta.arg;
                const list = findByUserId(state.lists, tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.deleteCommentRejected({
                    tweets: list.tweets,
                    commentId,
                    tweetId,
                    parentCommentId,
                });
            })
            .addCase(deleteComment.fulfilled, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.deleteCommentFulfilled({
                    tweets: list.tweets,
                    meta,
                });
            })
            .addCase(toggleLikeComment.pending, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.toggleLikeCommentPending({
                    tweets: list.tweets,
                    meta,
                });
            })
            .addCase(toggleLikeComment.rejected, (state, { meta }) => {
                const { commentId, isLike, tweetId, userId, tweetOwner } =
                    meta.arg;

                const list = findByUserId(state.lists, tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.toggleLikeCommentRejected({
                    tweets: list.tweets,
                    commentId,
                    isLike,
                    tweetId,
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
            .addCase(postComment.fulfilled, (state, { payload, meta }) => {
                console.log('🚀 ~ .addCase ~ payload:', payload);
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.postCommentFulfilled({
                    tweets: list.tweets,
                    comment: payload,
                });
            })
            .addCase(
                getChildrenComments.fulfilled,
                (state, { payload, meta }) => {
                    const list = findByUserId(state.lists, meta.arg.tweetOwner);
                    if (!list) return state;

                    tweetHelper.extraReducers.getChildrenCommentsFulfilled({
                        tweets: list.tweets,
                        comments: payload,
                        meta,
                    });
                },
            )
            .addCase(editComment.fulfilled, (state, { payload, meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.editCommentFulfilled({
                    tweets: list.tweets,
                    comment: payload,
                });
            })
            .addCase(editComment.pending, (state, { meta }) => {
                const list = findByUserId(state.lists, meta.arg.tweetOwner);
                if (!list) return state;

                tweetHelper.extraReducers.addViewerPending({
                    tweets: list.tweets,
                    tweetId: meta.arg.tweetId,
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
            });
    },
});

function findByUserId(lists: IList[], userId: string) {
    return lists.find((list) => list._id === userId);
}

export default listsSlice.reducer;
export const {
    toggleFollowList,
    addCommentSocket,
    setBlock,
    toggleLikeCommentSocket,
    toggleLikeTweetSocket,
    setTweetActiveId,
} = listsSlice.actions;

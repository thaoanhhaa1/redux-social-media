import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { IBookmark, IComment, ITweet } from '../../interfaces';
import { tweetService } from '../../services';
import { getBookmarksDTO, getTweetsDTO } from '../../utils';
import { tweetHelper } from '../helpers';

export const {
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
} = tweetHelper.asyncThunk;

interface IBookmarks {
    bookmarks: Array<IBookmark>;
    activeId: string | null;
    tweetActiveId: string | null;
    isLoading: boolean;
}

const initialState: IBookmarks = {
    bookmarks: [],
    activeId: null,
    tweetActiveId: null,
    isLoading: true,
};

const getBookmarks = createAsyncThunk(
    'bookmarks/getBookmarks',
    async (): Promise<Array<IBookmark>> => {
        const res = await axiosClient.get(api.getBookmarks());

        return res.data;
    },
);

const getTweets = createAsyncThunk(
    'getTweets',
    async ({
        userId,
        page,
    }: {
        userId: string;
        page: number;
    }): Promise<Array<ITweet>> => {
        const res = await tweetService.getTweetsByUserId({ userId, page });

        return res;
    },
);

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        updateTweet: (state, { payload }: { payload: ITweet }) => {
            const userId = payload.user._id;

            const bookmark = state.bookmarks.find(
                (bookmark) => bookmark._id === userId,
            );

            if (!bookmark) return state;

            const indexTweet = bookmark.tweets.findIndex(
                (tweet) => tweet._id === payload._id,
            );

            bookmark.tweets[indexTweet] = payload;
        },
        setActiveId: (state, { payload }: { payload: string | null }) => {
            state.activeId = payload;
        },
        setTweetActiveId: (state, { payload }: { payload: string | null }) => {
            tweetHelper.reducers.setTweetActiveId(state, payload);
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
            const bookmark = findById(state.bookmarks, tweetOwner);
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
            const bookmark = findById(state.bookmarks, tweetOwner);
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
            const bookmark = findById(state.bookmarks, tweetOwner);
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
            const bookmark = findById(state.bookmarks, payload.tweetOwner);
            if (!bookmark) return state;

            tweetHelper.reducers.addCommentSocket(
                bookmark.tweets,
                payload.comment,
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookmarks.fulfilled, (state, { payload }) => {
                state.bookmarks.push(...getBookmarksDTO(payload));
                state.isLoading = false;
            })
            .addCase(getBookmarks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBookmarks.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getTweets.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                if (!payload.length) return state;

                const userId = payload[0].user._id;

                const index = state.bookmarks.findIndex(
                    (bookmark) => bookmark._id === userId,
                );

                if (index === -1) return state;

                state.bookmarks[index].tweets.push(...getTweetsDTO(payload));
                state.bookmarks[index].page += 1;
            });

        //
        builder
            .addCase(getComments.fulfilled, (state, { payload, meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.getCommentsFulfilled({
                    comments: payload,
                    meta,
                    tweets: bookmark.tweets,
                });
            })
            .addCase(toggleList.pending, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.toggleListPending({
                    tweets: bookmark.tweets,
                    meta,
                });
            })
            .addCase(toggleList.rejected, (state, { meta }) => {
                const { isAdd, userId, tweetOwner } = meta.arg;

                const bookmark = findById(state.bookmarks, tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.toggleListRejected({
                    tweets: bookmark.tweets,
                    isAdd,
                    userId,
                });
            })
            .addCase(toggleFollow.pending, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.toggleFollowPending({
                    tweets: bookmark.tweets,
                    meta,
                });
            })
            .addCase(toggleFollow.rejected, (state, { meta }) => {
                const { follow, userId, tweetOwner } = meta.arg;

                const bookmark = findById(state.bookmarks, tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.toggleFollowRejected({
                    tweets: bookmark.tweets,
                    follow,
                    userId,
                });
            })
            .addCase(deleteComment.pending, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.deleteCommentPending({
                    tweets: bookmark.tweets,
                    meta,
                });
            })
            .addCase(deleteComment.rejected, (state, { meta }) => {
                const { commentId, tweetId, parentCommentId, tweetOwner } =
                    meta.arg;
                const bookmark = findById(state.bookmarks, tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.deleteCommentRejected({
                    tweets: bookmark.tweets,
                    commentId,
                    tweetId,
                    parentCommentId,
                });
            })
            .addCase(deleteComment.fulfilled, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.deleteCommentFulfilled({
                    tweets: bookmark.tweets,
                    meta,
                });
            })
            .addCase(toggleLikeComment.pending, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.toggleLikeCommentPending({
                    tweets: bookmark.tweets,
                    meta,
                });
            })
            .addCase(toggleLikeComment.rejected, (state, { meta }) => {
                const { commentId, isLike, tweetId, userId, tweetOwner } =
                    meta.arg;

                const bookmark = findById(state.bookmarks, tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.toggleLikeCommentRejected({
                    tweets: bookmark.tweets,
                    commentId,
                    isLike,
                    tweetId,
                    userId,
                });
            })
            .addCase(toggleLikeTweet.pending, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.toggleLikeTweetPending({
                    tweets: bookmark.tweets,
                    meta,
                });
            })
            .addCase(toggleLikeTweet.rejected, (state, { meta }) => {
                const { isLike, tweetId, userId } = meta.arg;

                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.toggleLikeTweetRejected({
                    tweets: bookmark.tweets,
                    isLike,
                    tweetId,
                    userId,
                });
            })
            .addCase(toggleInterested.pending, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.toggleInterestedPending({
                    tweets: bookmark.tweets,
                    meta,
                });
            })
            .addCase(toggleInterested.rejected, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                const { tweetId, interested } = meta.arg;

                tweetHelper.extraReducers.toggleInterestedRejected({
                    tweets: bookmark.tweets,
                    tweetId,
                    interested,
                });
            })
            .addCase(toggleReport.fulfilled, (state, { payload, meta }) => {
                const { isReport, tweetId } = payload;

                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.toggleReportFulfilled({
                    tweets: bookmark.tweets,
                    isReport,
                    tweetId,
                });
            })
            .addCase(postComment.fulfilled, (state, { payload, meta }) => {
                console.log('🚀 ~ .addCase ~ payload:', payload);
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.postCommentFulfilled({
                    tweets: bookmark.tweets,
                    comment: payload,
                });
            })
            .addCase(
                getChildrenComments.fulfilled,
                (state, { payload, meta }) => {
                    const bookmark = findById(
                        state.bookmarks,
                        meta.arg.tweetOwner,
                    );
                    if (!bookmark) return state;

                    tweetHelper.extraReducers.getChildrenCommentsFulfilled({
                        tweets: bookmark.tweets,
                        comments: payload,
                        meta,
                    });
                },
            )
            .addCase(editComment.fulfilled, (state, { payload, meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.editCommentFulfilled({
                    tweets: bookmark.tweets,
                    comment: payload,
                });
            });
    },
});

function findById(bookmarks: IBookmark[], id: string) {
    return bookmarks.find((bookmark) => bookmark._id === id);
}

export default bookmarksSlice.reducer;
export const {
    updateTweet,
    setActiveId,
    addCommentSocket,
    setBlock,
    setTweetActiveId,
    toggleLikeCommentSocket,
    toggleLikeTweetSocket,
} = bookmarksSlice.actions;
export { getBookmarks, getTweets };

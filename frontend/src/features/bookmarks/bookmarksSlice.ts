import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { IBookmark, ITweet } from '../../interfaces';
import { tweetService } from '../../services';
import { findTweetById, getBookmarksDTO, getTweetsDTO } from '../../utils';
import { deleteComment, postComment } from '../comments';
import { tweetHelper } from '../helpers';

export const {
    toggleList,
    toggleFollow,
    toggleLikeTweet,
    toggleInterested,
    toggleReport,
    addViewer,
    deleteTweet,
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
            const bookmark = findById(state.bookmarks, payload.tweetOwner);
            if (!bookmark) return state;
            console.log('🚀 ~ bookmark:', bookmark);
            tweetHelper.reducers.incNumberOfComments(
                bookmark.tweets,
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
            const bookmark = findById(state.bookmarks, payload.tweetOwner);
            if (!bookmark) return state;
            tweetHelper.reducers.decNumberOfComments(
                bookmark.tweets,
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
            const bookmark = findById(state.bookmarks, tweetOwner);
            if (!bookmark) return state;

            tweetHelper.reducers.deleteTweetSocket(bookmark.tweets, tweetId);
        },
        decNumberOfTweets: (state, { payload }: { payload: string }) => {
            const bookmark = findById(state.bookmarks, payload);
            if (!bookmark) return state;
            bookmark.numberOfTweets -= 1;
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

        // Tweets
        builder
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
            .addCase(addViewer.pending, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.addViewerPending({
                    tweets: bookmark.tweets,
                    tweetId: meta.arg.tweetId,
                });
            })
            .addCase(addViewer.rejected, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.addViewerReject({
                    tweets: bookmark.tweets,
                    tweetId: meta.arg.tweetId,
                });
            })
            .addCase(deleteTweet.pending, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.deleteTweetPending({
                    tweets: bookmark.tweets,
                    tweetId: meta.arg.tweetId,
                });
            })
            .addCase(deleteTweet.rejected, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                tweetHelper.extraReducers.deleteTweetRejected({
                    tweets: bookmark.tweets,
                    tweetId: meta.arg.tweetId,
                });
            });

        // Comments
        builder
            .addCase(postComment.fulfilled, (state, { meta }) => {
                const { parent, tweetOwner, tweetId } = meta.arg;

                if (parent) return state;

                const bookmark = findById(state.bookmarks, tweetOwner);
                if (!bookmark) return state;

                const tweet = findTweetById(bookmark.tweets, tweetId);

                if (!tweet) return state;

                tweet.numberOfComments += 1;
            })
            .addCase(deleteComment.pending, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                const tweet = findTweetById(bookmark.tweets, meta.arg.tweetId);

                if (!tweet) return state;

                tweet.numberOfComments -= 1;
            })
            .addCase(deleteComment.rejected, (state, { meta }) => {
                const bookmark = findById(state.bookmarks, meta.arg.tweetOwner);
                if (!bookmark) return state;

                const tweet = findTweetById(bookmark.tweets, meta.arg.tweetId);

                if (!tweet) return state;

                tweet.numberOfComments += 1;
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
    setBlock,
    setTweetActiveId,
    toggleLikeTweetSocket,
    decNumberOfComments,
    deleteTweetSocket,
    incNumberOfComments,
    decNumberOfTweets,
} = bookmarksSlice.actions;
export { getBookmarks, getTweets };

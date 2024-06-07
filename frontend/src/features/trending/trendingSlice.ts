import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IComment, ITrending, ITweet, ITweetTrending } from '../../interfaces';
import { trendingService } from '../../services';
import { TrendingType } from '../../types';
import { getTrendingDTO, getTweetsDTO } from '../../utils';
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

interface TrendingState {
    trendingList: ITrending[];
    loading: boolean;
    page: number;
    pages: number;
    active: string | null;
    tweetActiveId: string | null;
}

const initialState: TrendingState = {
    trendingList: [],
    loading: false,
    page: 0,
    pages: -1,
    active: null,
    tweetActiveId: null,
};

export const getTrending = createAsyncThunk(
    'trending/getTrending',
    async ({ page, type }: { type: TrendingType; page: number }) => {
        const res = await trendingService.getTrending({ type, page });

        return res;
    },
);

export const countPages = createAsyncThunk(
    'trending/countPages',
    async ({ type }: { type: TrendingType }) => {
        const res = await trendingService.countTrendingPages({ type });

        return res;
    },
);

export const getTweetsByTrending = createAsyncThunk(
    'trending/getTweetsByTrending',
    async ({ page, trending }: { page: number; trending: string }) => {
        const res = await trendingService.getDetailTrending({
            id: trending,
            page,
            type: 'tweet',
        });

        return res;
    },
);

const trendingSlice = createSlice({
    name: 'trending',
    initialState,
    reducers: {
        setActiveTrending(state, { payload }) {
            state.active = payload;
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
            const trending = findById(state.trendingList, state.active!);
            if (!trending) return state;

            tweetHelper.reducers.setBlock({
                isBlock,
                tweetId,
                tweets: (trending as ITweetTrending).tweets,
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
            const trending = findById(state.trendingList, tweetOwner);
            if (!trending) return state;

            tweetHelper.reducers.toggleLikeTweetSocket({
                isLike,
                tweetId,
                tweets: (trending as ITweetTrending).tweets,
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
            const trending = findById(state.trendingList, tweetOwner);
            if (!trending) return state;

            tweetHelper.reducers.toggleLikeCommentSocket({
                commentId,
                isLike,
                tweetId,
                userId,
                tweets: (trending as ITweetTrending).tweets,
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
            const trending = findById(state.trendingList, payload.tweetOwner);
            if (!trending) return state;

            tweetHelper.reducers.addCommentSocket(
                (trending as ITweetTrending).tweets,
                payload.comment,
            );
        },
        setTweetActiveId: (state, { payload }) => {
            state.tweetActiveId = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTrending.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTrending.fulfilled, (state, { payload, meta }) => {
                state.trendingList.push(
                    ...payload.map((item: ITrending) =>
                        getTrendingDTO(item, meta.arg.type),
                    ),
                );
                state.page += 1;
                state.loading = false;
            })
            .addCase(getTrending.rejected, (state) => {
                state.loading = false;
            })
            .addCase(countPages.fulfilled, (state, { payload }) => {
                state.pages = payload;
            })
            .addCase(
                getTweetsByTrending.fulfilled,
                (state, { payload, meta }) => {
                    const trending = findById(
                        state.trendingList,
                        meta.arg.trending,
                    );

                    if (trending) {
                        const tweetTrending = trending as ITweetTrending;

                        tweetTrending.tweets.push(...getTweetsDTO(payload));
                        trending.page += 1;
                        trending.loading = false;
                    }
                },
            )
            .addCase(getTweetsByTrending.pending, (state, { meta }) => {
                const trending = findById(
                    state.trendingList,
                    meta.arg.trending,
                );

                if (trending) {
                    trending.loading = true;
                }
            })
            .addCase(getTweetsByTrending.rejected, (state, { meta }) => {
                const trending = findById(
                    state.trendingList,
                    meta.arg.trending,
                );

                if (trending) {
                    trending.loading = false;
                }
            });

        builder
            .addCase(getComments.fulfilled, (state, { payload, meta }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.getCommentsFulfilled({
                        comments: payload,
                        meta,
                        tweets,
                    });
                });
            })
            .addCase(toggleList.pending, (state, { meta }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.toggleListPending({
                        tweets,
                        meta,
                    });
                });
            })
            .addCase(toggleList.rejected, (state, { meta }) => {
                const { isAdd, userId } = meta.arg;

                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.toggleListRejected({
                        tweets,
                        isAdd,
                        userId,
                    });
                });
            })
            .addCase(toggleFollow.pending, (state, { meta }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.toggleFollowPending({
                        tweets,
                        meta,
                    });
                });
            })
            .addCase(toggleFollow.rejected, (state, { meta }) => {
                const { follow, userId } = meta.arg;

                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.toggleFollowRejected({
                        tweets,
                        follow,
                        userId,
                    });
                });
            })
            .addCase(deleteComment.pending, (state, { meta }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.deleteCommentPending({
                        tweets,
                        meta,
                    });
                });
            })
            .addCase(deleteComment.rejected, (state, { meta }) => {
                const { commentId, tweetId, parentCommentId } = meta.arg;
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.deleteCommentRejected({
                        tweets,
                        commentId,
                        tweetId,
                        parentCommentId,
                    });
                });
            })
            .addCase(deleteComment.fulfilled, (state, { meta }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.deleteCommentFulfilled({
                        tweets,
                        meta,
                    });
                });
            })
            .addCase(toggleLikeComment.pending, (state, { meta }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.toggleLikeCommentPending({
                        tweets,
                        meta,
                    });
                });
            })
            .addCase(toggleLikeComment.rejected, (state, { meta }) => {
                const { commentId, isLike, tweetId, userId } = meta.arg;
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.toggleLikeCommentRejected({
                        tweets,
                        commentId,
                        isLike,
                        tweetId,
                        userId,
                    });
                });
            })
            .addCase(toggleLikeTweet.pending, (state, { meta }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.toggleLikeTweetPending({
                        tweets,
                        meta,
                    });
                });
            })
            .addCase(toggleLikeTweet.rejected, (state, { meta }) => {
                const { isLike, tweetId, userId } = meta.arg;

                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.toggleLikeTweetRejected({
                        tweets,
                        isLike,
                        tweetId,
                        userId,
                    });
                });
            })
            .addCase(toggleInterested.pending, (state, { meta }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.toggleInterestedPending({
                        tweets,
                        meta,
                    });
                });
            })
            .addCase(toggleInterested.rejected, (state, { meta }) => {
                const { tweetId, interested } = meta.arg;

                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.toggleInterestedRejected({
                        tweets,
                        tweetId,
                        interested,
                    });
                });
            })
            .addCase(toggleReport.fulfilled, (state, { payload, meta }) => {
                const { isReport, tweetId } = payload;

                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.toggleReportFulfilled({
                        tweets,
                        isReport,
                        tweetId,
                    });
                });
            })
            .addCase(postComment.fulfilled, (state, { payload, meta }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.postCommentFulfilled({
                        tweets,
                        comment: payload,
                    });
                });
            })
            .addCase(
                getChildrenComments.fulfilled,
                (state, { payload, meta }) => {
                    updateData(state, (tweets) => {
                        tweetHelper.extraReducers.getChildrenCommentsFulfilled({
                            tweets,
                            comments: payload,
                            meta,
                        });
                    });
                },
            )
            .addCase(editComment.fulfilled, (state, { payload }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.editCommentFulfilled({
                        tweets,
                        comment: payload,
                    });
                });
            })
            .addCase(editComment.pending, (state, { meta }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.addViewerPending({
                        tweets,
                        tweetId: meta.arg.tweetId,
                    });
                });
            })
            .addCase(addViewer.rejected, (state, { meta }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.addViewerReject({
                        tweets,
                        tweetId: meta.arg.tweetId,
                    });
                });
            })
            .addCase(addViewer.pending, (state, { meta }) => {
                updateData(state, (tweets) => {
                    tweetHelper.extraReducers.addViewerPending({
                        tweets,
                        tweetId: meta.arg.tweetId,
                    });
                });
            });
    },
});

function findById(trendingList: ITrending[], trending: string) {
    return trendingList.find((item) => item._id === trending);
}

function updateData(state: TrendingState, cb: (tweets: ITweet[]) => void) {
    state.trendingList.forEach((item) => {
        if (item.type === 'tweet') cb((item as ITweetTrending).tweets);
    });
}

export default trendingSlice.reducer;
export const {
    setActiveTrending,
    addCommentSocket,
    setBlock,
    setTweetActiveId,
    toggleLikeCommentSocket,
    toggleLikeTweetSocket,
} = trendingSlice.actions;

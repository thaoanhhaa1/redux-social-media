import { createSlice } from '@reduxjs/toolkit';
import { tweets } from '../../constants';
import { IComment, ITweet } from '../../interfaces';
import { findTweetById, getTweetDTO, getTweetsDTO } from '../../utils';
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
} = tweetHelper.asyncThunk;

type FollowingTweet = {
    tweets: ITweet[];
    isLoading: boolean;
    followingPage: number;
    followingPages: number;
    myTweetPage: number;
    myTweetPages: number;
    tweetActiveId: string | null;
    deletedComment: IComment | null;
};

const initialState: FollowingTweet = {
    tweets: [],
    isLoading: false,
    followingPage: 0,
    followingPages: -1,
    myTweetPage: 0,
    myTweetPages: -1,
    tweetActiveId: null,
    deletedComment: null,
};

const tweetsSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        addNewTweet: (state, { payload }: { payload: ITweet }) => {
            tweetHelper.reducers.addNewTweet(state.tweets, payload);
        },
        updateTweet: (state, { payload }: { payload: ITweet }) => {
            tweetHelper.reducers.updateTweet(state.tweets, payload);
        },
        setTweetActiveId: (state, { payload }: { payload: string | null }) => {
            tweetHelper.reducers.setTweetActiveId(state, payload);
        },
        setBlock: (
            state,
            {
                payload: { isBlock, tweetId },
            }: {
                payload: {
                    isBlock: boolean;
                    tweetId: string;
                    tweetOwner: string;
                };
            },
        ) => {
            tweetHelper.reducers.setBlock({
                isBlock,
                tweetId,
                tweets: state.tweets,
            });
        },
        toggleLikeTweetSocket: (
            state,
            {
                payload: { isLike, tweetId, userId },
            }: {
                payload: {
                    isLike: boolean;
                    tweetId: string;
                    userId: string;
                    tweetOwner: string;
                };
            },
        ) => {
            tweetHelper.reducers.toggleLikeTweetSocket({
                isLike,
                tweetId,
                tweets: state.tweets,
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
            tweetHelper.reducers.incNumberOfComments(
                state.tweets,
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
            tweetHelper.reducers.decNumberOfComments(
                state.tweets,
                payload.tweetId,
            );
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
            .addCase(
                getTweets.fulfilled,
                (state, { payload }: { payload: ITweet[] }) => {
                    state.isLoading = false;
                    state.followingPage += 1;

                    const tweetIds = state.tweets.map(
                        (tweet: ITweet) => tweet._id,
                    );

                    const tweets = payload
                        .filter((tweet) => !tweetIds.includes(tweet._id))
                        .map(getTweetDTO);

                    state.tweets.push(...tweets);
                },
            )

            .addCase(getMyTweets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyTweets.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(
                getMyTweets.fulfilled,
                (
                    state,
                    {
                        payload,
                    }: {
                        payload: ITweet[];
                    },
                ) => {
                    if (payload.length) {
                        state.tweets.push(...getTweetsDTO(payload));
                        state.isLoading = false;
                        state.myTweetPage += 1;
                    }
                },
            )
            .addCase(
                countFollowingTweets.fulfilled,
                (state, { payload }: { payload: number }) => {
                    state.followingPages = Math.ceil(payload / 10);
                },
            )
            .addCase(
                countMyTweets.fulfilled,
                (state, { payload }: { payload: number }) => {
                    state.myTweetPages = Math.ceil(
                        payload / tweets.NUMBER_OF_PAGES,
                    );
                },
            )
            .addCase(
                getTweet.fulfilled,
                (state, { payload }: { payload: ITweet }) => {
                    state.tweets.push(getTweetDTO(payload));
                },
            );

        //
        builder
            .addCase(toggleList.pending, (state, { meta }) => {
                tweetHelper.extraReducers.toggleListPending({
                    tweets: state.tweets,
                    meta,
                });
            })
            .addCase(toggleList.rejected, (state, { meta }) => {
                const { isAdd, userId } = meta.arg;

                tweetHelper.extraReducers.toggleListRejected({
                    tweets: state.tweets,
                    isAdd,
                    userId,
                });
            })
            .addCase(toggleFollow.pending, (state, { meta }) => {
                tweetHelper.extraReducers.toggleFollowPending({
                    tweets: state.tweets,
                    meta,
                });
            })
            .addCase(toggleFollow.rejected, (state, { meta }) => {
                const { follow, userId } = meta.arg;

                tweetHelper.extraReducers.toggleFollowRejected({
                    tweets: state.tweets,
                    follow,
                    userId,
                });
            })
            .addCase(toggleLikeTweet.pending, (state, { meta }) => {
                tweetHelper.extraReducers.toggleLikeTweetPending({
                    tweets: state.tweets,
                    meta,
                });
            })
            .addCase(toggleLikeTweet.rejected, (state, { meta }) => {
                const { isLike, tweetId, userId } = meta.arg;

                tweetHelper.extraReducers.toggleLikeTweetRejected({
                    tweets: state.tweets,
                    isLike,
                    tweetId,
                    userId,
                });
            })
            .addCase(toggleInterested.pending, (state, { meta }) => {
                tweetHelper.extraReducers.toggleInterestedPending({
                    tweets: state.tweets,
                    meta,
                });
            })
            .addCase(toggleInterested.rejected, (state, { meta }) => {
                const { tweetId, interested } = meta.arg;

                tweetHelper.extraReducers.toggleInterestedRejected({
                    tweets: state.tweets,
                    tweetId,
                    interested,
                });
            })
            .addCase(toggleReport.fulfilled, (state, { payload }) => {
                const { isReport, tweetId } = payload;

                tweetHelper.extraReducers.toggleReportFulfilled({
                    tweets: state.tweets,
                    isReport,
                    tweetId,
                });
            })
            .addCase(addViewer.pending, (state, { meta }) => {
                tweetHelper.extraReducers.addViewerPending({
                    tweets: state.tweets,
                    tweetId: meta.arg.tweetId,
                });
            })
            .addCase(addViewer.rejected, (state, { meta }) => {
                tweetHelper.extraReducers.addViewerReject({
                    tweets: state.tweets,
                    tweetId: meta.arg.tweetId,
                });
            });

        // Comments
        builder
            .addCase(postComment.fulfilled, (state, { payload, meta }) => {
                const { parent } = payload;

                if (parent) return state;

                const tweet = findTweetById(state.tweets, meta.arg.tweetId);

                if (!tweet) return state;

                tweet.numberOfComments += 1;
            })
            .addCase(deleteComment.pending, (state, { meta }) => {
                const tweet = findTweetById(state.tweets, meta.arg.tweetId);

                if (!tweet) return state;

                tweet.numberOfComments -= 1;
            })
            .addCase(deleteComment.rejected, (state, { meta }) => {
                const tweet = findTweetById(state.tweets, meta.arg.tweetId);

                if (!tweet) return state;

                tweet.numberOfComments += 1;
            });
    },
});

export default tweetsSlice.reducer;
export const {
    addNewTweet,
    updateTweet,
    setTweetActiveId,
    setBlock,
    toggleLikeTweetSocket,
    decNumberOfComments,
    incNumberOfComments,
} = tweetsSlice.actions;

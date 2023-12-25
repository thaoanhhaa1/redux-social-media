import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { comments } from '../../constants';
import { IPerson, ITweet } from '../../interfaces';
import IComment from '../../interfaces/IComment';
import {
    getCommentDTO,
    getCommentsDTO,
    getNextLevelComment,
    getParentComment,
    getTweetDTO,
    getTweetsDTO,
} from '../../utils';

type FollowingTweet = {
    tweets: ITweet[];
    isLoading: boolean;
    followingPage: number;
    followingPages: number;
    myTweetPage: number;
    myTweetPages: number;
};

const NUMBER_MY_TWEET_OF_PAGE = 8;

const initialState: FollowingTweet = {
    tweets: [],
    isLoading: false,
    followingPage: 0,
    followingPages: -1,
    myTweetPage: 0,
    myTweetPages: -1,
};

const getMyTweets = createAsyncThunk(
    'followingTweets/getMyTweets',
    async (page: number) => {
        const skip = (page - 1) * NUMBER_MY_TWEET_OF_PAGE;
        const limit = NUMBER_MY_TWEET_OF_PAGE;

        const res = await axiosClient.get(api.getMyTweets(), {
            params: { skip, limit },
        });

        return res.data;
    },
);

const getTweets = createAsyncThunk(
    'followingTweets/getTweets',
    async (page: number) => {
        try {
            const res = await axiosClient.get(api.getFollowingTweets(), {
                params: { page },
            });

            return res.data;
        } catch (error) {
            throw error;
        }
    },
);

const countFollowingTweets = createAsyncThunk(
    'followingTweets/countFollowingTweets',
    async (): Promise<number> => {
        const res = await axiosClient.get(api.countFollowingTweets());

        return res.data;
    },
);

const countMyTweets = createAsyncThunk(
    'followingTweets/countMyTweets',
    async (): Promise<number> => {
        const res = await axiosClient.get(api.countTweet());

        return res.data;
    },
);

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

const getChildrenComments = createAsyncThunk(
    'followingTweets/getChildrenComments',
    async ({ commentId }: { commentId: String }): Promise<IComment[]> => {
        const res = await axiosClient.get(api.getChildComments(commentId));

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
            state.tweets.forEach((tweet) => {
                if (tweet.user._id === payload) {
                    tweet.user.isInList = !tweet.user.isInList;
                    return;
                }
            });
        },
        toggleUserFollow: (state, { payload }: { payload: string }) => {
            state.tweets.forEach((tweet) => {
                if (tweet.user._id === payload) {
                    tweet.user.follow = !tweet.user.follow;
                    return;
                }
            });
        },
        deleteComment: (
            state,
            {
                payload: { commentId, parentCommentId, tweetId },
            }: {
                payload: {
                    commentId: string;
                    parentCommentId?: string;
                    tweetId: string;
                };
            },
        ) => {
            const tweet = getTweet(state.tweets, tweetId);

            if (tweet) {
                let comments: IComment[] = [];

                if (parentCommentId) {
                    const commentParent = getParentComment(
                        tweet.comments,
                        parentCommentId,
                    );

                    if (commentParent) {
                        commentParent.numberOfComments -= 1;
                        comments = commentParent.comments;
                    }
                } else {
                    comments = tweet.comments;
                    tweet.numberOfComments -= 1;
                }

                const index = comments.findIndex(
                    (comment) => comment._id === commentId,
                );

                comments.splice(index, 1);
            }
        },
        toggleLikeComment: (
            state,
            {
                payload: { commentId, liked, tweetId },
            }: {
                payload: {
                    liked: boolean;
                    commentId: string;
                    tweetId: string;
                };
            },
        ) => {
            const tweet = getTweet(state.tweets, tweetId);

            if (tweet) {
                const comment = getParentComment(tweet.comments, commentId);

                if (comment) comment.numberOfLikes += liked ? 1 : -1;
            }
        },
        editComment: (
            state,
            {
                payload: { commentId, content, tweetId },
            }: {
                payload: {
                    content: string;
                    commentId: string;
                    tweetId: string;
                };
            },
        ) => {
            const tweet = getTweet(state.tweets, tweetId);

            if (tweet) {
                const comment = getParentComment(tweet.comments, commentId);

                if (comment) comment.content = content;
            }
        },
        addNewTweet: (state, { payload }: { payload: ITweet }) => {
            payload.isNewTweet = true;
            state.tweets.unshift(getTweetDTO(payload));
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
                (
                    state,
                    {
                        payload,
                    }: {
                        payload: ITweet[];
                    },
                ) => {
                    const data = getTweetsDTO(payload);

                    state.isLoading = false;
                    state.tweets.push(...data);
                    state.followingPage += 1;
                },
            )
            .addCase(
                getComments.fulfilled,
                (state, { payload }: { payload: IComment[] }) => {
                    if (payload.length) {
                        const tweetId = payload[0].post;
                        const comments = getCommentsDTO(payload, 0);
                        const tweet = getTweet(state.tweets, tweetId);

                        tweet?.comments.push(...comments);
                    }
                },
            )
            .addCase(
                postComment.fulfilled,
                (state, { payload }: { payload: IComment }) => {
                    payload.comments = [];
                    const tweetId = payload.post;
                    const tweet = getTweet(state.tweets, tweetId);

                    if (!tweet) return state;

                    const commentDTO = getCommentDTO(payload);

                    if (payload.parent) {
                        const comment = getParentComment(
                            tweet.comments,
                            payload.parent,
                        );

                        if (comment) {
                            comment.comments.push(commentDTO);
                            comment.numberOfComments += 1;
                        }

                        return state;
                    }

                    tweet.comments.unshift(commentDTO);
                    tweet.numberOfComments += 1;
                },
            )
            .addCase(
                getChildrenComments.fulfilled,
                (state, { payload }: { payload: IComment[] }) => {
                    if (payload.length) {
                        const commentId = payload[0].parent || '';
                        const tweetId = payload[0].post;
                        const tweet = getTweet(state.tweets, tweetId);

                        if (tweet && commentId) {
                            const comment = getParentComment(
                                tweet.comments,
                                commentId,
                            );

                            if (comment) {
                                const level = getNextLevelComment(
                                    comment.level,
                                );

                                comment.comments.push(
                                    ...getCommentsDTO(payload, level),
                                );

                                comment.comments.sort(
                                    (a, b) =>
                                        new Date(a.createdAt).getTime() -
                                        new Date(b.createdAt).getTime(),
                                );
                            }
                        }
                    }
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
                (state, { payload }: { payload: ITweet[] }) => {
                    if (payload.length) {
                        state.tweets.push(...getTweetsDTO(payload));
                        state.isLoading = false;
                        state.myTweetPage += 1;
                    }
                },
            )
            .addCase(countFollowingTweets.fulfilled, (state, { payload }) => {
                state.followingPages = Math.ceil(payload / 10);
            })
            .addCase(countMyTweets.fulfilled, (state, { payload }) => {
                state.myTweetPages = Math.ceil(
                    payload / NUMBER_MY_TWEET_OF_PAGE,
                );
            });
    },
});

function getTweet(tweets: ITweet[], tweetId: string): ITweet | undefined {
    const length = tweets.length;

    for (let index = 0; index < length; index++) {
        const tweet = tweets[index];

        if (tweet._id === tweetId) return tweet;
    }

    return undefined;
}

export default followingTweetsSlice.reducer;
export {
    getChildrenComments,
    getComments,
    getMyTweets,
    getTweets,
    postComment,
    toggleLike,
    toggleList,
    countFollowingTweets,
    countMyTweets,
};
export const {
    toggleUserList,
    toggleUserFollow,
    deleteComment,
    toggleLikeComment,
    editComment,
    addNewTweet,
} = followingTweetsSlice.actions;

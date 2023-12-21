import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { comments } from '../../constants';
import { IPerson, IPersonTweet, ITweet } from '../../interfaces';
import IComment from '../../interfaces/IComment';
import {
    getCommentDTO,
    getCommentsDTO,
    getNextLevelComment,
    getParentComment,
} from '../../utils';

type FollowingTweet = {
    data: Array<{
        user: IPersonTweet;
        tweets: Array<ITweet>;
    }>;
    isLoading: boolean;
};

const initialState: FollowingTweet = {
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
            const tweet = getTweet(state, tweetId);

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
            const tweet = getTweet(state, tweetId);

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
            const tweet = getTweet(state, tweetId);

            if (tweet) {
                const comment = getParentComment(tweet.comments, commentId);

                if (comment) comment.content = content;
            }
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
                        const comments = getCommentsDTO(payload, 0);
                        const tweet = getTweet(state, tweetId);

                        tweet?.comments.push(...comments);
                    }
                },
            )
            .addCase(
                postComment.fulfilled,
                (state, { payload }: { payload: IComment }) => {
                    payload.comments = [];
                    const tweetId = payload.post;
                    const tweet = getTweet(state, tweetId);

                    if (tweet) {
                        const commentDTO = getCommentDTO(payload);

                        if (payload.parent) {
                            const comment = getParentComment(
                                tweet.comments,
                                payload.parent,
                            );
                            comment?.comments.push(commentDTO);
                        } else {
                            tweet.comments.unshift(commentDTO);
                        }
                    }
                },
            )
            .addCase(
                getChildrenComments.fulfilled,
                (state, { payload }: { payload: IComment[] }) => {
                    if (payload.length) {
                        const commentId = payload[0].parent || '';
                        const tweetId = payload[0].post;
                        const tweet = getTweet(state, tweetId);

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
            );
    },
});

function getTweet(
    followingTweet: FollowingTweet,
    tweetId: string,
): ITweet | undefined {
    const length = followingTweet.data.length;

    for (let index = 0; index < length; index++) {
        const element = followingTweet.data[index];
        const length = element.tweets.length;

        for (let i = 0; i < length; ++i) {
            const tweet = element.tweets[i];

            if (tweet._id === tweetId) return tweet;
        }
    }

    return undefined;
}

export default followingTweetsSlice.reducer;
export {
    getChildrenComments,
    getComments,
    getTweets,
    postComment,
    toggleLike,
    toggleList,
};
export const {
    toggleUserList,
    toggleUserFollow,
    deleteComment,
    toggleLikeComment,
    editComment,
} = followingTweetsSlice.actions;

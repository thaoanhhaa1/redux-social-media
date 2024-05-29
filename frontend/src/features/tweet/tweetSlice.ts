import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { comments } from '../../constants';
import { IComment, IPerson, ITweet } from '../../interfaces';
import {
    getCommentDTO,
    getCommentsDTO,
    getNextLevelComment,
    getParentComment,
} from '../../utils';

const initialState: {
    tweet?: ITweet;
} = {};

const toggleLike = createAsyncThunk(
    'tweets/toggleLike',
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
    'tweets/toggleList',
    async ({ userId, isAdd }: { userId: string; isAdd: boolean }) => {
        const res = await axiosClient.post(api.toggleList(isAdd), {
            userId,
        });

        return res.data;
    },
);

const getComments = createAsyncThunk(
    'tweets/getComments',
    async ({
        tweetId,
        skip,
    }: {
        tweetId: String;
        skip: number;
    }): Promise<Array<IComment>> => {
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
    'tweets/getChildrenComments',
    async ({ commentId }: { commentId: String }): Promise<IComment[]> => {
        const res = await axiosClient.get(api.getChildComments(commentId));

        return res.data;
    },
);

const postComment = createAsyncThunk(
    'tweets/postComment',
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
    }): Promise<IComment> => {
        const res = await axiosClient.post(api.postComments(tweetId), {
            user,
            content,
            parent,
        });

        return res.data;
    },
);

const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {
        toggleUserList: (state) => {
            if (state.tweet)
                state.tweet.user.isInList = !state.tweet.user.isInList;
        },
        toggleUserFollow: (state) => {
            if (state.tweet) state.tweet.user.follow = !state.tweet.user.follow;
        },
        deleteComment: (
            state,
            {
                payload: { commentId, parentCommentId },
            }: {
                payload: {
                    commentId: string;
                    parentCommentId?: string;
                };
            },
        ) => {
            const tweet = state.tweet;

            if (!tweet) return state;

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
        },
        toggleLikeComment: (
            state,
            {
                payload: { commentId, liked },
            }: {
                payload: {
                    liked: boolean;
                    commentId: string;
                };
            },
        ) => {
            const tweet = state.tweet;

            if (!tweet) return state;

            const comment = getParentComment(tweet.comments, commentId);

            if (comment) comment.numberOfLikes += liked ? 1 : -1;
        },
        editComment: (
            state,
            {
                payload: { commentId, content },
            }: {
                payload: {
                    content: string;
                    commentId: string;
                };
            },
        ) => {
            const tweet = state.tweet;

            if (!tweet) return state;

            const comment = getParentComment(tweet.comments, commentId);

            if (comment) comment.content = content;
        },
        toggleLikeTweet: (
            state,
            {
                payload,
            }: {
                payload: {
                    tweetId: string;
                    userId: string;
                };
            },
        ) => {
            const tweet = state.tweet;

            if (!tweet || !tweet.likes) return state;

            const index = tweet.likes.findIndex(
                (userId) => userId === payload.userId,
            );

            if (index === -1) tweet.likes.push(payload.userId);
            else tweet.likes.splice(index, 1);
        },
        toggleNotInterested: (state) => {
            if (state.tweet)
                state.tweet.notInterested = !state.tweet.notInterested;
        },
        setTweet: (state, { payload }: { payload: ITweet }) => {
            state.tweet = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComments.fulfilled, (state, { payload }) => {
                if (payload.length) {
                    const comments = getCommentsDTO(payload, 0);
                    const tweet = state.tweet;
                    if (!tweet) return state;

                    tweet.skip += 1;
                    tweet.comments.push(...comments);
                }
            })
            .addCase(postComment.fulfilled, (state, { payload }) => {
                payload.comments = [];
                const tweet = state.tweet;
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
            })
            .addCase(getChildrenComments.fulfilled, (state, { payload }) => {
                if (payload.length) {
                    const commentId = payload[0].parent || '';
                    const tweet = state.tweet;
                    if (!tweet || !commentId) return state;

                    const comment = getParentComment(tweet.comments, commentId);
                    if (!comment) return state;

                    const level = getNextLevelComment(comment.level);
                    comment.comments.push(...getCommentsDTO(payload, level));
                    comment.comments.sort(
                        (a, b) =>
                            new Date(a.createdAt).getTime() -
                            new Date(b.createdAt).getTime(),
                    );
                }
            });
    },
});

export default tweetSlice.reducer;
export const {
    // toggleUserList,
    // toggleUserFollow,
    // deleteComment,
    // toggleLikeComment,
    // editComment,
    // toggleLikeTweet,
    // toggleNotInterested,
    // setTweet,
} = tweetSlice.actions;
export // toggleLike,
// toggleList,
// getComments,
// getChildrenComments,
// postComment,
 {};

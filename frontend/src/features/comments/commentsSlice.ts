import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { comments } from '../../constants';
import { IComment, IPerson } from '../../interfaces';
import { getComment, getCommentDTO, getCommentsDTO } from '../../utils';

interface CommentsState {
    [postId: string]: {
        comments: Array<IComment>;
    };
}

const initialState: CommentsState = {};

export const getComments = createAsyncThunk(
    'tweets/getComments',
    async ({
        tweetId,
        skip,
    }: {
        tweetOwner: string;
        tweetId: string;
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

export const postComment = createAsyncThunk(
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
        tweetOwner: string;
    }): Promise<IComment> => {
        const res = await axiosClient.post(api.postComments(tweetId), {
            user,
            content,
            parent,
        });

        return res.data;
    },
);

export const getChildrenComments = createAsyncThunk(
    'tweets/getChildrenComments',
    async ({
        commentId,
    }: {
        commentId: string;
        tweetOwner: string;
    }): Promise<IComment[]> => {
        const res = await axiosClient.get(api.getChildComments(commentId));

        return res.data;
    },
);

export const editComment = createAsyncThunk(
    'tweets/editComment',
    async (payload: {
        tweetId: string;
        commentId: string;
        content: string;
        tweetOwner: string;
    }) => {
        const { commentId, content, tweetId } = payload;

        const res = await axiosClient.patch(
            api.editComment(tweetId, commentId),
            {
                content,
            },
        );

        return res.data;
    },
);

export const deleteComment = createAsyncThunk<
    any,
    {
        commentId: string;
        tweetId: string;
        parentCommentId?: string;
        tweetOwner: string;
    },
    {
        rejectValue: {
            commentId: string;
            tweetId: string;
            parentCommentId?: string;
            tweetOwner: string;
        };
    }
>('tweets/deleteComment', async (data, { rejectWithValue }) => {
    const { commentId, tweetId } = data;

    try {
        await axiosClient.delete(api.deleteComment(tweetId, commentId));
    } catch (error) {
        return rejectWithValue(data);
    }
});

export const toggleLikeComment = createAsyncThunk<
    any,
    {
        userId: string;
        tweetId: string;
        commentId: string;
        isLike: boolean;
        tweetOwner: string;
    },
    {
        rejectValue: {
            userId: string;
            tweetId: string;
            commentId: string;
            isLike: boolean;
            tweetOwner: string;
        };
    }
>('tweets/toggleLikeComment', async (data, { rejectWithValue }) => {
    try {
        const { isLike, commentId } = data;

        await axiosClient.post(api.toggleLikeComment(commentId), {
            isLike,
        });
    } catch (error) {
        return rejectWithValue(data);
    }
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
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
            const { comment } = payload;
            const commentDTO = getCommentDTO(comment);

            const tweet = state[comment.post];

            if (!tweet) {
                state[comment.post] = {
                    comments: [commentDTO],
                };

                return state;
            }

            if (comment.parent) {
                const commentParent = getComment(
                    tweet.comments,
                    comment.parent,
                );

                if (!commentParent) return state;

                commentParent.comments.push(commentDTO);
                commentParent.numberOfComments += 1;

                return state;
            }

            tweet.comments.unshift(commentDTO);
        },
        toggleLikeCommentSocket: (
            state,
            {
                payload,
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
            const { commentId, isLike, tweetId, userId } = payload;

            const tweet = state[tweetId];

            if (!tweet) return state;

            const comment = getComment(tweet.comments, commentId);

            if (!comment) return state;

            if (isLike) comment.likes.push(userId);
            else {
                const index = comment.likes.findIndex((id) => id === userId);

                comment.likes.splice(index, 1);
            }
            comment.numberOfLikes += isLike ? 1 : -1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getComments.fulfilled, (state, { payload, meta }) => {
            const { tweetId } = meta.arg;

            const commentsDTO = getCommentsDTO(payload, 0);

            const tweet = state[tweetId];
            if (!tweet) {
                state[tweetId] = {
                    comments: commentsDTO,
                };

                return state;
            }

            tweet.comments.push(...commentsDTO);
        });

        builder.addCase(postComment.fulfilled, (state, { payload, meta }) => {
            const { tweetId } = meta.arg;

            const tweet = state[tweetId];
            if (!tweet) {
                state[tweetId] = {
                    comments: [payload],
                };
            }

            const commentDTO = getCommentDTO(payload);
            if (payload.parent) {
                const commentParent = getComment(
                    tweet.comments,
                    payload.parent,
                );

                if (!commentParent) return state;

                commentDTO.level = commentParent.level + 1;
                commentParent.comments.push(commentDTO);
                commentParent.numberOfComments += 1;

                return state;
            }

            tweet.comments.unshift(commentDTO);
        });

        builder.addCase(getChildrenComments.fulfilled, (state, { payload }) => {
            if (!payload.length) return state;

            const tweetId = payload[0].post;
            const tweet = state[tweetId];

            const comment = getComment(tweet.comments, payload[0].parent!);

            if (!comment) return state;

            comment.comments = getCommentsDTO(payload, comment.level + 1);
        });

        builder.addCase(editComment.fulfilled, (state, { payload, meta }) => {
            const tweet = state[meta.arg.tweetId];

            if (!tweet) return state;

            const commentOld = getComment(tweet.comments, payload._id);

            if (!commentOld) return state;

            commentOld.content = payload.content;
        });

        builder.addCase(deleteComment.pending, (state, { meta }) => {
            const { commentId, tweetId, parentCommentId } = meta.arg;

            const tweet = state[tweetId];

            if (!tweet) return state;

            const comment = getComment(tweet.comments, commentId)!;
            comment.deleted = true;

            if (parentCommentId) {
                const commentParent = getComment(
                    tweet.comments,
                    parentCommentId,
                );

                if (!commentParent) return state;

                commentParent.numberOfComments -= 1;
            }
        });

        builder.addCase(deleteComment.rejected, (state, { meta }) => {
            const { commentId, tweetId, parentCommentId } = meta.arg;

            const tweet = state[tweetId];

            if (!tweet) return state;

            const comment = getComment(tweet.comments, commentId)!;
            comment.deleted = false;

            if (parentCommentId) {
                const commentParent = getComment(
                    tweet.comments,
                    parentCommentId,
                );

                if (!commentParent) return state;

                commentParent.numberOfComments += 1;
            }
        });

        builder.addCase(toggleLikeComment.pending, (state, { meta }) => {
            const { commentId, isLike, userId } = meta.arg;

            const tweet = state[meta.arg.tweetId];

            if (!tweet) return state;

            const comment = getComment(tweet.comments, commentId)!;

            if (!comment) return state;

            if (isLike) comment.likes.push(userId);
            else {
                const index = comment.likes.findIndex((id) => id === userId);

                comment.likes.splice(index, 1);
            }
            comment.numberOfLikes += isLike ? 1 : -1;
        });

        builder.addCase(toggleLikeComment.rejected, (state, { meta }) => {
            const { commentId, isLike, userId } = meta.arg;

            const tweet = state[meta.arg.tweetId];

            if (!tweet) return state;

            const comment = getComment(tweet.comments, commentId)!;

            if (!comment) return state;

            if (isLike) {
                const index = comment.likes.findIndex((id) => id === userId);
                comment.likes.splice(index, 1);
            } else comment.likes.push(userId);

            comment.numberOfLikes += isLike ? -1 : 1;
        });
    },
});

export default commentsSlice.reducer;
export const { addCommentSocket, toggleLikeCommentSocket } =
    commentsSlice.actions;

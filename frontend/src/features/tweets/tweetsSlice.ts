import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { comments } from '../../constants';
import { IComment, IPerson, ITweet } from '../../interfaces';
import {
    getCommentDTO,
    getCommentsDTO,
    getParentComment,
    getTweetDTO,
    getTweetsDTO,
} from '../../utils';
import getComment from '../../utils/getComment';

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

const NUMBER_MY_TWEET_OF_PAGE = 8;

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

const getMyTweets = createAsyncThunk(
    'tweets/getMyTweets',
    async (page: number): Promise<Array<ITweet>> => {
        const skip = (page - 1) * NUMBER_MY_TWEET_OF_PAGE;
        const limit = NUMBER_MY_TWEET_OF_PAGE;

        const res = await axiosClient.get(api.getMyTweets(), {
            params: { skip, limit },
        });

        return res.data;
    },
);

const getTweets = createAsyncThunk(
    'tweets/getTweets',
    async (page: number): Promise<Array<ITweet>> => {
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
    'tweets/countFollowingTweets',
    async (): Promise<number> => {
        const res = await axiosClient.get(api.countFollowingTweets());

        return res.data;
    },
);

const getTweet = createAsyncThunk(
    'tweets/getTweet',
    async ({ tweetId }: { tweetId: string }): Promise<ITweet> => {
        const res = await axiosClient.get(api.getTweet(tweetId));

        return res.data;
    },
);

const countMyTweets = createAsyncThunk(
    'tweets/countMyTweets',
    async (): Promise<number> => {
        const res = await axiosClient.get(api.countTweet());

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

const getChildrenComments = createAsyncThunk(
    'tweets/getChildrenComments',
    async ({ commentId }: { commentId: String }): Promise<IComment[]> => {
        const res = await axiosClient.get(api.getChildComments(commentId));

        return res.data;
    },
);

const toggleInterested = createAsyncThunk<
    any,
    {
        interested: boolean;
        tweetId: string;
    },
    {
        rejectValue: {
            interested: boolean;
            tweetId: string;
        };
    }
>(
    'tweets/toggleInterested',
    async ({ interested, tweetId }, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post(
                api[`${interested ? 'i' : 'notI'}nterestedTweet`](tweetId),
            );

            return res.data;
        } catch (error) {
            return rejectWithValue({
                interested,
                tweetId,
            });
        }
    },
);

const toggleFollow = createAsyncThunk<
    any,
    {
        userId: string;
        follow: boolean;
    },
    {
        rejectValue: {
            userId: string;
            follow: boolean;
        };
    }
>('tweets/toggleFollow', async ({ userId, follow }, { rejectWithValue }) => {
    try {
        const res = await axiosClient.post(
            follow ? api.unfollow() : api.follow(),
            {
                userId,
            },
        );

        return res.data;
    } catch (error) {
        return rejectWithValue({ userId, follow });
    }
});

const toggleList = createAsyncThunk<
    any,
    { userId: string; isAdd: boolean },
    {
        rejectValue: { userId: string; isAdd: boolean };
    }
>('tweets/toggleList', async ({ userId, isAdd }, { rejectWithValue }) => {
    try {
        const res = await axiosClient.post(api.toggleList(isAdd), {
            userId,
        });

        return res.data;
    } catch (error) {
        return rejectWithValue({ userId, isAdd });
    }
});

const toggleLikeComment = createAsyncThunk<
    any,
    {
        userId: string;
        tweetId: string;
        commentId: string;
        isLike: boolean;
    },
    {
        rejectValue: {
            userId: string;
            tweetId: string;
            commentId: string;
            isLike: boolean;
        };
    }
>('tweets/toggleLikeComment', async (payload, { rejectWithValue }) => {
    try {
        const { isLike, commentId } = payload;

        await axiosClient.post(api.toggleLikeComment(commentId), {
            isLike,
        });
    } catch (error) {
        return rejectWithValue(payload);
    }
});

const deleteComment = createAsyncThunk<
    any,
    {
        commentId: string;
        tweetId: string;
        index: number;
    },
    {
        rejectValue: {
            commentId: string;
            tweetId: string;
            index: number;
        };
    }
>('tweets/deleteComment', async (payload, { rejectWithValue }) => {
    const { commentId, tweetId } = payload;

    try {
        await axiosClient.delete(api.deleteComment(tweetId, commentId));
    } catch (error) {
        return rejectWithValue(payload);
    }
});

const editComment = createAsyncThunk(
    'tweets/editComment',
    async (payload: {
        tweetId: string;
        commentId: string;
        content: string;
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

const tweetsSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        addNewTweet: (state, { payload }: { payload: ITweet }) => {
            payload.isNewTweet = true;
            state.tweets.unshift(getTweetDTO(payload));
        },
        updateTweet: (state, { payload }: { payload: ITweet }) => {
            const index = findIndexTweet(state.tweets, payload._id);

            if (index === -1) return state;

            state.tweets[index] = payload;
        },
        setTweetActiveId: (state, { payload }: { payload: string | null }) => {
            state.tweetActiveId = payload;
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
                state.followingPage += 1;

                const tweetIds = state.tweets.map((tweet) => tweet._id);

                const tweets = payload
                    .filter((tweet) => !tweetIds.includes(tweet._id))
                    .map(getTweetDTO);

                state.tweets.push(...tweets);
            })
            .addCase(getMyTweets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyTweets.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getMyTweets.fulfilled, (state, { payload }) => {
                if (payload.length) {
                    state.tweets.push(...getTweetsDTO(payload));
                    state.isLoading = false;
                    state.myTweetPage += 1;
                }
            })
            .addCase(countFollowingTweets.fulfilled, (state, { payload }) => {
                state.followingPages = Math.ceil(payload / 10);
            })
            .addCase(countMyTweets.fulfilled, (state, { payload }) => {
                state.myTweetPages = Math.ceil(
                    payload / NUMBER_MY_TWEET_OF_PAGE,
                );
            })
            .addCase(getTweet.fulfilled, (state, { payload }) => {
                state.tweets.push(getTweetDTO(payload));
            })
            .addCase(getComments.fulfilled, (state, { payload }) => {
                if (!payload.length) return state;

                const tweetId = payload[0].post;
                const tweet = findById(state.tweets, tweetId);
                if (!tweet) return state;

                const comments = getCommentsDTO(payload, 0);

                tweet.skip += 1;
                tweet.comments.push(...comments);
            })
            .addCase(postComment.fulfilled, (state, { payload }) => {
                payload.comments = [];
                const tweet = findById(state.tweets, payload.post);
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
            .addCase(toggleInterested.pending, (state, { meta }) => {
                const { interested, tweetId } = meta.arg;

                const tweet = findById(state.tweets, tweetId);
                if (!tweet) return state;

                tweet.notInterested = !interested;
            })
            .addCase(toggleInterested.rejected, (state, { payload }) => {
                if (!payload) return state;

                const tweet = findById(state.tweets, payload.tweetId);
                if (!tweet) return state;

                tweet.notInterested = payload.interested;
            })
            .addCase(toggleFollow.pending, (state, { meta }) => {
                const { userId, follow } = meta.arg;

                state.tweets.forEach((tweet) => {
                    if (tweet.user._id === userId) tweet.user.follow = follow;
                });
            })
            .addCase(toggleFollow.rejected, (state, { payload }) => {
                if (!payload) return state;

                state.tweets.forEach((tweet) => {
                    if (tweet.user._id === payload.userId)
                        tweet.user.follow = !payload.follow;
                });
            })
            .addCase(toggleList.pending, (state, { meta }) => {
                const { userId, isAdd } = meta.arg;

                state.tweets.forEach((tweet) => {
                    if (tweet.user._id === userId) tweet.user.isInList = isAdd;
                });
            })
            .addCase(toggleList.rejected, (state, { payload }) => {
                if (!payload) return state;

                state.tweets.forEach((tweet) => {
                    if (tweet.user._id === payload.userId)
                        tweet.user.isInList = !payload.isAdd;
                });
            })
            .addCase(toggleLikeComment.pending, (state, { meta }) => {
                const { tweetId, userId, commentId, isLike } = meta.arg;

                const tweet = findById(state.tweets, tweetId);

                if (!tweet) return state;

                const comment = getComment(tweet, commentId);

                if (!comment) return state;

                if (isLike) comment.likes.push(userId);
                else {
                    const index = comment.likes.findIndex(
                        (id) => id === userId,
                    );

                    comment.likes.splice(index, 1);
                }
                comment.numberOfLikes += isLike ? 1 : -1;
            })
            .addCase(toggleLikeComment.rejected, (state, { payload }) => {
                if (!payload) return state;

                const tweet = findById(state.tweets, payload.tweetId);
                if (!tweet) return state;

                const comment = getParentComment(
                    tweet.comments,
                    payload.commentId,
                );
                if (!comment) return state;

                const index = comment.likes.findIndex(
                    (userId) => userId === payload.userId,
                );

                if (index === -1) comment.likes.push(payload.userId);
                else comment.likes.splice(index, 1);
            })
            .addCase(deleteComment.pending, (state, { meta }) => {
                const { commentId, tweetId, index } = meta.arg;

                const tweet = findById(state.tweets, tweetId);
                if (!tweet) return state;

                const comment = getParentComment(tweet.comments, commentId);

                const deletedComments = (comment || tweet).comments.splice(
                    index,
                    1,
                );
                state.deletedComment = deletedComments[0];
            })
            .addCase(deleteComment.rejected, (state, { payload }) => {
                if (!payload) return state;

                const { commentId, tweetId, index } = payload;

                const tweet = findById(state.tweets, tweetId);
                if (!tweet) return state;

                const comment = getParentComment(tweet.comments, commentId);

                if (!state.deletedComment) return state;

                (comment || tweet).comments.splice(
                    index,
                    0,
                    state.deletedComment,
                );
                state.deletedComment = null;
            })
            .addCase(deleteComment.fulfilled, (state) => {
                state.deletedComment = null;
            })
            .addCase(getChildrenComments.fulfilled, (state, { payload }) => {
                if (!payload.length) return state;

                const tweetId = payload[0].post;
                const tweet = findById(state.tweets, tweetId);
                if (!tweet) return state;

                const comment = getComment(tweet, payload[0].parent!);

                if (!comment) return state;

                comment.comments.push(
                    ...getCommentsDTO(payload, comment.level + 1),
                );
            })
            .addCase(editComment.fulfilled, (state, { payload }) => {
                const tweet = findById(state.tweets, payload.post);
                if (!tweet) return state;

                const comment = getComment(tweet, payload._id);

                if (!comment) return state;

                comment.content = payload.content;
            });
    },
});

function findIndexTweet(tweets: ITweet[], tweetId: string): number {
    const length = tweets.length;

    for (let index = 0; index < length; index++) {
        const tweet = tweets[index];

        if (tweet._id === tweetId) return index;
    }

    return -1;
}

function findById(tweets: ITweet[], tweetId: string): ITweet | undefined {
    return tweets.find((tweet) => tweet._id === tweetId);
}

export default tweetsSlice.reducer;
export {
    countFollowingTweets,
    countMyTweets,
    getComments,
    getMyTweets,
    getTweet,
    getTweets,
    postComment,
    toggleFollow,
    toggleInterested,
    toggleLikeComment,
    toggleList,
    deleteComment,
    getChildrenComments,
    editComment,
};
export const { addNewTweet, updateTweet, setTweetActiveId } =
    tweetsSlice.actions;

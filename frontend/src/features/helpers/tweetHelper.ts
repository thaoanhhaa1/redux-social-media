import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { comments, tweets } from '../../constants';
import { IComment, IPerson, ITweet } from '../../interfaces';
import { tweetService } from '../../services';
import {
    getComment,
    getCommentDTO,
    getCommentsDTO,
    getTweetDTO,
    getTweetsDTO,
} from '../../utils';

const getMyTweets = createAsyncThunk(
    'tweets/getMyTweets',
    async (page: number): Promise<Array<ITweet>> => {
        const skip = (page - 1) * tweets.NUMBER_OF_PAGES;
        const limit = tweets.NUMBER_OF_PAGES;

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
    async ({
        tweetId,
        userId,
    }: {
        tweetId: string;
        userId: string;
    }): Promise<ITweet> => {
        const res = await axiosClient.get(api.getTweet(userId, tweetId));

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

const getChildrenComments = createAsyncThunk(
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

const toggleLikeTweet = createAsyncThunk<
    any,
    {
        tweetId: string;
        isLike: boolean;
        userId: string;
        tweetOwner: string;
    },
    {
        rejectValue: {
            tweetId: string;
            isLike: boolean;
            userId: string;
            tweetOwner: string;
        };
    }
>('tweets/toggleLikeTweet', async (data, { rejectWithValue }) => {
    const { isLike, tweetId } = data;

    try {
        const res = await axiosClient.post(api.toggleLike(), {
            isLike,
            tweetId,
        });

        return res.data;
    } catch (error) {
        return rejectWithValue(data);
    }
});

const toggleInterested = createAsyncThunk<
    any,
    {
        interested: boolean;
        tweetId: string;
        tweetOwner: string;
    },
    {
        rejectValue: {
            interested: boolean;
            tweetId: string;
            tweetOwner: string;
        };
    }
>('tweets/toggleInterested', async (data, { rejectWithValue }) => {
    const { interested, tweetId } = data;

    try {
        const res = await axiosClient.post(
            api[`${interested ? 'i' : 'notI'}nterestedTweet`](tweetId),
        );

        return res.data;
    } catch (error) {
        return rejectWithValue(data);
    }
});

const toggleFollow = createAsyncThunk<
    any,
    {
        userId: string;
        follow: boolean;
        tweetOwner: string;
    },
    {
        rejectValue: {
            userId: string;
            follow: boolean;
            tweetOwner: string;
        };
    }
>('tweets/toggleFollow', async (data, { rejectWithValue }) => {
    const { userId, follow } = data;

    try {
        const res = await axiosClient.post(
            follow ? api.follow() : api.unfollow(),
            {
                userId,
            },
        );

        return res.data;
    } catch (error) {
        return rejectWithValue(data);
    }
});

const toggleList = createAsyncThunk<
    any,
    { userId: string; isAdd: boolean; tweetOwner: string },
    {
        rejectValue: { userId: string; isAdd: boolean; tweetOwner: string };
    }
>('tweets/toggleList', async (data, { rejectWithValue }) => {
    const { userId, isAdd } = data;

    try {
        const res = await axiosClient.post(api.toggleList(isAdd), {
            userId,
        });

        return res.data;
    } catch (error) {
        return rejectWithValue(data);
    }
});

const toggleLikeComment = createAsyncThunk<
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

const deleteComment = createAsyncThunk<
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

const editComment = createAsyncThunk(
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

const toggleReport = createAsyncThunk(
    'toggleReport',
    async ({
        isReport,
        tweetId,
    }: {
        tweetId: string;
        isReport: boolean;
        tweetOwner: string;
    }) => {
        await tweetService[isReport ? 'report' : 'unReport'](tweetId);

        return {
            tweetId,
            isReport,
        };
    },
);

const getTweetsByUserId = createAsyncThunk(
    'bookmarks/getTweets',
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

const countTweetsByUserId = createAsyncThunk(
    'tweets/countTweetsByUserId',
    async (userId: string) => {
        const res = await tweetService.countTweetsByUserId(userId);

        return res;
    },
);

const addViewer = createAsyncThunk(
    'tweets/addViewer',
    async ({ tweetId }: { tweetId: string; tweetOwner: string }) => {
        await tweetService.addViewer(tweetId);

        return tweetId;
    },
);

const tweetHelper = {
    asyncThunk: {
        getMyTweets,
        getTweets,
        countFollowingTweets,
        getTweet,
        countMyTweets,
        getComments,
        postComment,
        getChildrenComments,
        toggleLikeTweet,
        toggleInterested,
        toggleFollow,
        toggleList,
        toggleLikeComment,
        deleteComment,
        editComment,
        toggleReport,
        getTweetsByUserId,
        countTweetsByUserId,
        addViewer,
    },
    reducers: {
        addNewTweet: (tweets: ITweet[], tweet: ITweet) => {
            tweet.isNewTweet = true;
            tweet.notInterested = false;
            tweets.unshift(getTweetDTO(tweet));
        },
        updateTweet: (tweets: ITweet[], tweet: ITweet) => {
            const index = findIndexTweet(tweets, tweet._id);

            if (index === -1) return;

            tweets[index] = tweet;
        },
        setTweetActiveId: (state: any, value: string | null) => {
            state.tweetActiveId = value;
        },
        toggleLikeTweetSocket: ({
            isLike,
            tweetId,
            tweets,
            userId,
        }: {
            tweets: ITweet[];
            tweetId: string;
            userId: string;
            isLike: boolean;
        }) => {
            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            if (isLike) {
                if (!tweet.likes.includes(userId)) tweet.likes.push(userId);

                return;
            }

            const index = tweet.likes.findIndex((id) => id === userId);

            tweet.likes.splice(index, 1);
        },
        toggleLikeCommentSocket: ({
            commentId,
            isLike,
            tweetId,
            userId,
            tweets,
        }: {
            tweetId: string;
            commentId: string;
            userId: string;
            isLike: boolean;
            tweets: ITweet[];
        }) => {
            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            const comment = getComment(tweet.comments, commentId);

            if (!comment) return;

            if (isLike) {
                if (!comment.likes.includes(userId)) {
                    comment.likes.push(userId);
                    comment.numberOfLikes += 1;
                }

                return;
            }

            const index = comment.likes.findIndex((id) => id === userId);

            if (index === -1) return;
            comment.likes.splice(index, 1);
            comment.numberOfLikes -= 1;
        },
        addCommentSocket: addComment,
        setBlock: ({
            isBlock,
            tweetId,
            tweets,
        }: {
            tweetId: string;
            isBlock: boolean;
            tweets: ITweet[];
        }) => {
            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            tweet.blocked = isBlock;
        },
    },
    extraReducers: {
        getCommentsFulfilled: ({
            meta,
            comments,
            tweets,
        }: {
            tweets: ITweet[];
            comments: IComment[];
            meta: any;
        }) => {
            const { tweetId } = meta.arg;

            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            const commentsDTO = getCommentsDTO(comments, 0);

            tweet.skip += 1;
            tweet.comments.push(...commentsDTO);
        },
        postCommentFulfilled: ({
            tweets,
            comment,
        }: {
            tweets: ITweet[];
            comment: IComment;
        }) => {
            addComment(tweets, comment);
        },
        toggleLikeTweetPending: ({
            meta,
            tweets,
        }: {
            tweets: ITweet[];
            meta: any;
        }) => {
            const { tweetId, isLike, userId } = meta.arg;

            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            if (isLike) tweet.likes.push(userId);
            else tweet.likes.pop();
        },
        toggleLikeTweetRejected: ({
            tweets,
            isLike,
            tweetId,
            userId,
        }: {
            tweets: ITweet[];
            tweetId: string;
            isLike: boolean;
            userId: string;
        }) => {
            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            if (isLike) tweet.likes.pop();
            else tweet.likes.push(userId);
        },
        toggleInterestedPending: ({
            meta,
            tweets,
        }: {
            tweets: ITweet[];
            meta: any;
        }) => {
            const { interested, tweetId } = meta.arg;

            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            tweet.notInterested = !interested;
        },
        toggleInterestedRejected: ({
            tweets,
            interested,
            tweetId,
        }: {
            tweets: ITweet[];
            interested: boolean;
            tweetId: string;
        }) => {
            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            tweet.notInterested = interested;
        },
        toggleFollowPending: ({
            meta,
            tweets,
        }: {
            tweets: ITweet[];
            meta: any;
        }) => {
            const { userId, follow } = meta.arg;

            tweets.forEach((tweet) => {
                if (tweet.user._id === userId) tweet.user.follow = follow;
            });
        },
        toggleFollowRejected: ({
            tweets,
            userId,
            follow,
        }: {
            tweets: ITweet[];
            userId: string;
            follow: boolean;
        }) => {
            const tweet = findById(tweets, userId);
            if (!tweet) return;

            tweet.user.follow = !follow;
        },
        toggleListPending: ({
            meta,
            tweets,
        }: {
            tweets: ITweet[];
            meta: any;
        }) => {
            const { userId, isAdd } = meta.arg;

            tweets.forEach((tweet) => {
                if (tweet.user._id === userId) tweet.user.isInList = isAdd;
            });
        },
        toggleListRejected: ({
            tweets,
            userId,
            isAdd,
        }: {
            tweets: ITweet[];
            userId: string;
            isAdd: boolean;
        }) => {
            const tweet = findById(tweets, userId);
            if (!tweet) return;

            tweet.user.isInList = !isAdd;
        },
        toggleLikeCommentPending: ({
            meta,
            tweets,
        }: {
            tweets: ITweet[];
            meta: any;
        }) => {
            const { tweetId, userId, commentId, isLike } = meta.arg;

            const tweet = findById(tweets, tweetId);

            if (!tweet) return;

            const comment = getComment(tweet.comments, commentId);

            if (!comment) return;

            if (isLike) comment.likes.push(userId);
            else {
                const index = comment.likes.findIndex((id) => id === userId);

                comment.likes.splice(index, 1);
            }
            comment.numberOfLikes += isLike ? 1 : -1;
        },
        toggleLikeCommentRejected: ({
            tweets,
            userId,
            tweetId,
            commentId,
            isLike,
        }: {
            tweets: ITweet[];
            userId: string;
            tweetId: string;
            commentId: string;
            isLike: boolean;
        }) => {
            const tweet = findById(tweets, tweetId);

            if (!tweet) return;

            const comment = getComment(tweet.comments, commentId);

            if (!comment) return;

            if (isLike) comment.likes.pop();
            else comment.likes.push(userId);
            comment.numberOfLikes += isLike ? -1 : 1;
        },
        deleteCommentPending: ({
            meta,
            tweets,
        }: {
            tweets: ITweet[];
            meta: any;
        }) => {
            const { tweetId, parentCommentId, commentId } = meta.arg;

            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            const comment = getComment(tweet.comments, commentId);
            if (!comment) return;

            comment.deleted = true;
            if (parentCommentId)
                getComment(
                    tweet.comments,
                    parentCommentId,
                )!.numberOfComments -= 1;
            else tweet.numberOfComments -= 1;
        },
        deleteCommentRejected: ({
            tweets,
            tweetId,
            parentCommentId,
            commentId,
        }: {
            tweets: ITweet[];
            commentId: string;
            tweetId: string;
            parentCommentId?: string;
        }) => {
            const tweet = findById(tweets, tweetId);
            if (!tweet) return;

            const comment = getComment(tweet.comments, commentId);

            if (!comment) return;

            comment.deleted = false;
            if (parentCommentId)
                getComment(
                    tweet.comments,
                    parentCommentId,
                )!.numberOfComments += 1;
            else tweet.numberOfComments += 1;
        },
        deleteCommentFulfilled: (state: any) => {
            state.deletedComment = null;
        },
        getChildrenCommentsFulfilled: ({
            tweets,
            comments,
        }: {
            tweets: ITweet[];
            comments: IComment[];
            meta: any;
        }) => {
            const tweetId = comments[0].post;
            const tweet = findById(tweets, tweetId);

            if (!tweet) return;

            const comment = getComment(tweet.comments, comments[0].parent!);

            if (!comment) return;

            comment.comments = getCommentsDTO(comments, comment.level + 1);
        },
        editCommentFulfilled: ({
            tweets,
            comment,
        }: {
            tweets: ITweet[];
            comment: IComment;
        }) => {
            const tweet = findById(tweets, comment.post);

            if (!tweet) return;

            const commentOld = getComment(tweet.comments, comment._id);

            if (!commentOld) return;

            commentOld.content = comment.content;
        },
        toggleReportFulfilled: ({
            isReport,
            tweetId,
            tweets,
        }: {
            tweets: ITweet[];
            tweetId: string;
            isReport: boolean;
        }) => {
            const tweet = findById(tweets, tweetId);

            if (!tweet) return;

            tweet.report = isReport;
        },
        getTweetsByUserIdFulfilled: ({
            tweets,
            tweetsResults,
        }: {
            tweets: ITweet[];
            tweetsResults: ITweet[];
        }) => {
            tweets.push(...getTweetsDTO(tweetsResults));
        },
        addViewerPending: ({
            tweets,
            tweetId,
        }: {
            tweets: ITweet[];
            tweetId: string;
        }) => {
            const tweet = findById(tweets, tweetId);

            if (!tweet) return;

            tweet.viewed = true;
        },
        addViewerReject: ({
            tweets,
            tweetId,
        }: {
            tweets: ITweet[];
            tweetId: string;
        }) => {
            const tweet = findById(tweets, tweetId);

            if (!tweet) return;

            tweet.viewed = false;
        },
    },
};

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

function addComment(tweets: ITweet[], comment: IComment) {
    const tweet = findById(tweets, comment.post);
    if (!tweet) return;

    const commentDTO = getCommentDTO(comment);
    if (comment.parent) {
        const commentParent = getComment(tweet.comments, comment.parent);

        if (!commentParent) return;

        commentDTO.level = commentParent.level + 1;
        commentParent.comments.push(commentDTO);
        commentParent.numberOfComments += 1;

        return;
    }

    tweet.comments.unshift(commentDTO);
    tweet.numberOfComments += 1;
}

export default tweetHelper;

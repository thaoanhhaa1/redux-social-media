import { ReactElement, useEffect, useState } from 'react';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import CardProvider from '../../contexts/CardContext';
import { IComment, IPerson, ITweet } from '../../interfaces';
import { getParentComment } from '../../utils';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

type Props = {
    tweet: ITweet;
    children: ReactElement;
    updateTweet: (tweet: ITweet) => void;
};

export const toggleLike = async ({
    userId,
    tweetId,
    isLike,
}: {
    userId: string;
    tweetId: string;
    isLike: boolean;
}) => {
    const res = await axiosClient.post(api.toggleLike(), {
        _id: userId,
        tweetId,
        isLike,
    });

    return res.data;
};

export const toggleList = async ({
    userId,
    isAdd,
}: {
    userId: string;
    isAdd: boolean;
}) => {
    const res = await axiosClient.post(api.toggleList(isAdd), {
        userId,
    });

    return res.data;
};

export const getComments = async ({
    tweetId,
    skip,
}: {
    tweetId: String;
    skip: number;
}): Promise<Array<IComment>> => {
    const res = await axiosClient.get(api.getComments(tweetId), {
        params: {
            skip,
            limit: process.env.REACT_APP_NUMBER_COMMENTS_OF_PAGE,
        },
    });

    return res.data;
};

export const getChildrenComments = async ({
    commentId,
}: {
    commentId: String;
}): Promise<IComment[]> => {
    const res = await axiosClient.get(api.getChildComments(commentId));

    return res.data;
};

export const postComment = async ({
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
};

const CardWrapper = ({ tweet: tw, children, updateTweet }: Props) => {
    const [tweet, setTweet] = useState(tw);
    const user = useAppSelector((state: RootState) => state.user);

    useEffect(() => {
        return () => updateTweet(tweet);
    }, [tweet, updateTweet]);

    const toggleUserList = () => {
        tweet.user.isInList = !tweet.user.isInList;
    };

    const toggleUserFollow = () => {
        tweet.user.follow = !tweet.user.follow;
    };

    const deleteComment = (commentId: string, parentCommentId?: string) => {
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
    };

    const toggleLikeComment = (liked: boolean, commentId: string) => {
        const comment = getParentComment(tweet.comments, commentId);

        if (comment) comment.numberOfLikes += liked ? 1 : -1;
    };

    const editComment = (content: string, commentId: string) => {
        const comment = getParentComment(tweet.comments, commentId);

        if (comment) comment.content = content;
    };

    const toggleLikeTweet = () => {
        const newTweet = { ...tweet };

        const index = newTweet.likes.findIndex((id) => id === user._id);

        if (index === -1) newTweet.likes.push(user._id);
        else {
            if (newTweet.likes.length === 1) newTweet.likes = [];
            else newTweet.likes.splice(index, 1);
        }

        setTweet({ ...newTweet });
    };

    const toggleNotInterested = () => {
        tweet.notInterested = !tweet.notInterested;
    };

    const addComments = (comments: IComment[]) => {};
    const postComment = (comment: IComment) => {};
    const addChildrenComments = (comments: IComment[]) => {};

    return (
        <CardProvider
            value={{
                tweet,
                setTweet,
                deleteComment,
                editComment,
                toggleLikeComment,
                toggleLikeTweet,
                toggleNotInterested,
                toggleUserFollow,
                toggleUserList,
                addComments,
                postComment,
                addChildrenComments,
            }}
        >
            {children}
        </CardProvider>
    );
};

export default CardWrapper;

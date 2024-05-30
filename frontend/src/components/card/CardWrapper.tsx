import { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import CardProvider from '../../contexts/CardContext';
import {
    toggleFollow,
    toggleInterested,
    toggleLikeTweet,
} from '../../features/tweets';
import { IComment, ITweet } from '../../interfaces';
import { getParentComment } from '../../utils';

type Props = {
    tweet: ITweet;
    children: ReactElement;
};

const CardWrapper = ({ tweet, children }: Props) => {
    const user = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const toggleUserList = () => {
        tweet.user.isInList = !tweet.user.isInList;
    };

    const toggleUserFollow = () =>
        dispatch(
            toggleFollow({
                follow: !tweet.user.follow,
                userId: tweet.user._id,
            }),
        );

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

    const handleToggleLikeTweet = () => {
        dispatch(
            toggleLikeTweet({
                tweetId: tweet._id,
                userId: user._id,
                isLike: !tweet.likes.includes(user._id),
            }),
        );
    };

    const toggleNotInterested = () =>
        dispatch(
            toggleInterested({
                tweetId: tweet._id,
                interested: tweet.notInterested,
            }),
        );

    const addComments = (comments: IComment[]) => {};
    const postComment = (comment: IComment) => {};
    const addChildrenComments = (comments: IComment[]) => {};

    return (
        <CardProvider
            value={{
                tweet,
                deleteComment,
                editComment,
                toggleLikeComment,
                toggleLikeTweet: handleToggleLikeTweet,
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

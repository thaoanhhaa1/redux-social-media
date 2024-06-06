import { ReactElement, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import CardProvider from '../../contexts/CardContext';
import * as bookmarks from '../../features/bookmarks';
import * as lists from '../../features/lists';
import * as tweets from '../../features/tweets';
import { ITweet } from '../../interfaces';
import { BlockedTweetModalType, TweetRenderType } from '../../types';
import { isBlock } from '../../utils';

type Props = {
    tweet: ITweet;
    children: ReactElement;
    type?: TweetRenderType;
};

const CardWrapper = ({ tweet, children, type = 'TWEETS' }: Props) => {
    const action = useMemo(() => {
        if (type === 'LISTS') return lists;
        if (type === 'BOOKMARKS') return bookmarks;
        return tweets;
    }, [type]);
    const [reportLoading, setReportLoading] = useState<boolean>(false);
    const user = useAppSelector((state: RootState) => state.user);
    const { beenBlocked, blocked } = useAppSelector(
        (state: RootState) => state.userRelations,
    );
    const [blockedType, setBlockedType] =
        useState<BlockedTweetModalType>('NONE');
    const dispatch = useAppDispatch();
    const isBlockedUser = useMemo(
        () => isBlock(blocked, beenBlocked, tweet.user._id),
        [blocked, beenBlocked, tweet.user._id],
    );
    const loadedComments = tweet.comments.length;

    const toggleUserList = () => {
        dispatch(
            action.toggleList({
                userId: tweet.user._id,
                isAdd: !tweet.user.isInList,
                tweetOwner: tweet.user._id,
            }),
        );
    };

    const toggleUserFollow = () => {
        dispatch(
            action.toggleFollow({
                follow: !tweet.user.follow,
                userId: tweet.user._id,
                tweetOwner: tweet.user._id,
            }),
        );
    };

    const handleDeleteComment = (
        commentId: string,
        parentCommentId?: string,
    ) => {
        dispatch(
            action.deleteComment({
                commentId,
                parentCommentId,
                tweetId: tweet._id,
                tweetOwner: tweet.user._id,
            }),
        );
    };

    const handleLikeComment = (liked: boolean, commentId: string) => {
        if (isBlockedUser) return setBlockedType('LIKE_COMMENT');

        dispatch(
            action.toggleLikeComment({
                userId: user._id,
                commentId,
                isLike: liked,
                tweetId: tweet._id,
                tweetOwner: tweet.user._id,
            }),
        );
    };

    const handleToggleLikeTweet = () => {
        if (isBlockedUser) return setBlockedType('LIKE_TWEET');

        dispatch(
            action.toggleLikeTweet({
                tweetId: tweet._id,
                userId: user._id,
                isLike: !tweet.likes.includes(user._id),
                tweetOwner: tweet.user._id,
            }),
        );
    };

    const toggleNotInterested = () => {
        dispatch(
            action.toggleInterested({
                tweetId: tweet._id,
                interested: tweet.notInterested,
                tweetOwner: tweet.user._id,
            }),
        );
    };

    const handleToggleReport = async () => {
        setReportLoading(true);

        try {
            await dispatch(
                action.toggleReport({
                    tweetId: tweet._id,
                    isReport: !tweet.report,
                    tweetOwner: tweet.user._id,
                }),
            ).unwrap();
        } catch (error) {
            toast.error('An error occurred while reporting the tweet.');
        } finally {
            setReportLoading(false);
        }
    };

    const loadMoreComment = () =>
        dispatch(
            action.getComments({
                tweetId: tweet._id,
                skip: loadedComments,
                tweetOwner: tweet.user._id,
            }),
        );

    const handlePostComment = ({
        content,
        parent,
    }: {
        content: string;
        parent?: string;
    }) =>
        dispatch(
            action.postComment({
                user,
                content,
                tweetId: tweet._id,
                parent,
                tweetOwner: tweet.user._id,
            }),
        ).unwrap();

    const getAllChildComments = (commentId: string) =>
        dispatch(
            action.getChildrenComments({
                commentId,
                tweetOwner: tweet.user._id,
            }),
        ).unwrap();

    const updateComment = ({
        content,
        commentId,
    }: {
        content: string;
        commentId: string;
    }) =>
        dispatch(
            action.editComment({
                content,
                commentId,
                tweetId: tweet._id,
                tweetOwner: tweet.user._id,
            }),
        ).unwrap();

    return (
        <CardProvider
            value={{
                tweet,
                blockedType,
                action,
                reportLoading,
                setBlockedType,
                deleteComment: handleDeleteComment,
                toggleLikeComment: handleLikeComment,
                toggleLikeTweet: handleToggleLikeTweet,
                toggleNotInterested,
                toggleUserFollow,
                toggleUserList,
                toggleReport: handleToggleReport,
                loadMoreComment,
                postComment: handlePostComment,
                getAllChildComments,
                updateComment,
            }}
        >
            {children}
        </CardProvider>
    );
};

export default CardWrapper;

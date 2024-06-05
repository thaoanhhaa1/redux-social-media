import { ReactElement, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import CardProvider from '../../contexts/CardContext';
import {
    deleteComment,
    toggleFollow,
    toggleInterested,
    toggleLikeComment,
    toggleLikeTweet,
    toggleList,
    toggleReport,
} from '../../features/tweets';
import { ITweet } from '../../interfaces';
import { BlockedTweetModalType } from '../../types';
import { isBlock } from '../../utils';

type Props = {
    tweet: ITweet;
    children: ReactElement;
};

const CardWrapper = ({ tweet, children }: Props) => {
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

    const toggleUserList = () => {
        dispatch(
            toggleList({
                userId: tweet.user._id,
                isAdd: !tweet.user.isInList,
            }),
        );
    };

    const toggleUserFollow = () => {
        dispatch(
            toggleFollow({
                follow: !tweet.user.follow,
                userId: tweet.user._id,
            }),
        );
    };

    const handleDeleteComment = (
        commentId: string,
        parentCommentId?: string,
    ) => {
        dispatch(
            deleteComment({
                commentId,
                parentCommentId,
                tweetId: tweet._id,
                index: tweet.comments.findIndex((c) => c._id === commentId),
            }),
        );
    };

    const handleLikeComment = (liked: boolean, commentId: string) => {
        if (isBlockedUser) return setBlockedType('LIKE_COMMENT');

        dispatch(
            toggleLikeComment({
                userId: user._id,
                commentId,
                isLike: liked,
                tweetId: tweet._id,
            }),
        );
    };

    const handleToggleLikeTweet = () => {
        if (isBlockedUser) return setBlockedType('LIKE_TWEET');

        dispatch(
            toggleLikeTweet({
                tweetId: tweet._id,
                userId: user._id,
                isLike: !tweet.likes.includes(user._id),
            }),
        );
    };

    const toggleNotInterested = () => {
        dispatch(
            toggleInterested({
                tweetId: tweet._id,
                interested: tweet.notInterested,
            }),
        );
    };

    const handleToggleReport = async () => {
        setReportLoading(true);

        try {
            await dispatch(
                toggleReport({
                    tweetId: tweet._id,
                    isReport: !tweet.report,
                }),
            ).unwrap();
        } catch (error) {
            toast.error('An error occurred while reporting the tweet.');
        } finally {
            setReportLoading(false);
        }
    };

    return (
        <CardProvider
            value={{
                tweet,
                blockedType,
                reportLoading,
                setBlockedType,
                deleteComment: handleDeleteComment,
                toggleLikeComment: handleLikeComment,
                toggleLikeTweet: handleToggleLikeTweet,
                toggleNotInterested,
                toggleUserFollow,
                toggleUserList,
                toggleReport: handleToggleReport,
            }}
        >
            {children}
        </CardProvider>
    );
};

export default CardWrapper;

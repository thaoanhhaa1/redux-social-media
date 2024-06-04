import { Dispatch, SetStateAction } from 'react';
import { BlockedTweetModalType } from '../types';
import ITweet from './ITweet';

interface ICardContext {
    tweet: ITweet;
    blockedType: BlockedTweetModalType;
    reportLoading: boolean;
    setBlockedType: Dispatch<SetStateAction<BlockedTweetModalType>>;
    toggleUserList: () => void;
    toggleUserFollow: () => void;
    deleteComment: (commentId: string, parentCommentId?: string) => void;
    toggleLikeComment: (liked: boolean, commentId: string) => void;
    toggleLikeTweet: () => void;
    toggleNotInterested: () => void;
    toggleReport: () => void;
}

export default ICardContext;

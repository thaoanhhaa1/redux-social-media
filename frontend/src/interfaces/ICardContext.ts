import { Dispatch, SetStateAction } from 'react';
import * as bookmarks from '../features/bookmarks';
import * as lists from '../features/lists';
import * as tweets from '../features/tweets';
import { BlockedTweetModalType } from '../types';
import IComment from './IComment';
import ITweet from './ITweet';

interface ICardContext {
    tweet: ITweet;
    blockedType: BlockedTweetModalType;
    reportLoading: boolean;
    action: typeof bookmarks | typeof tweets | typeof lists;
    setBlockedType: Dispatch<SetStateAction<BlockedTweetModalType>>;
    toggleUserList: () => void;
    toggleUserFollow: () => void;
    deleteComment: (commentId: string, parentCommentId?: string) => void;
    toggleLikeComment: (liked: boolean, commentId: string) => void;
    toggleLikeTweet: () => void;
    toggleNotInterested: () => void;
    toggleReport: () => void;
    loadMoreComment: () => void;
    postComment: ({
        content,
        parent,
    }: {
        content: string;
        parent?: string;
    }) => Promise<IComment>;
    getAllChildComments: (commentId: string) => Promise<IComment[]>;
    updateComment: ({
        commentId,
        content,
    }: {
        content: string;
        commentId: string;
    }) => Promise<any>;
}

export default ICardContext;

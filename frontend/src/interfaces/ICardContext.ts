import IComment from './IComment';
import ITweet from './ITweet';

interface ICardContext {
    tweet: ITweet;
    toggleUserList: () => void;
    toggleUserFollow: () => void;
    deleteComment: (commentId: string, parentCommentId?: string) => void;
    toggleLikeComment: (liked: boolean, commentId: string) => void;
    editComment: (content: string, commentId: string) => void;
    toggleLikeTweet: () => void;
    toggleNotInterested: () => void;
    addComments: (comments: IComment[]) => void;
    postComment: (Comment: IComment) => void;
    addChildrenComments: (comments: IComment[]) => void;
}

export default ICardContext;

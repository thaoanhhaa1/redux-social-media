import { IComment, ITweet } from '../interfaces';
import getParentComment from './getParentComment';

const getComment = (tweet: ITweet, commentId: string): IComment | undefined => {
    const parentComment = getParentComment(tweet.comments, commentId);

    if (parentComment)
        return parentComment.comments.find(
            (comment) => comment._id === commentId,
        );

    const comment = tweet.comments.find((comment) => comment._id === commentId);

    if (comment) return comment;

    return undefined;
};

export default getComment;

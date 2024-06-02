import { IComment } from '../interfaces';

const getComment = (
    comments: IComment[],
    commentId: string,
): IComment | undefined => {
    const length = comments.length;

    for (let i = 0; i < length; i++) {
        const comment = comments[i];

        if (comment._id === commentId) return comment;

        const commentInChild = getComment(comment.comments, commentId);

        if (commentInChild) return commentInChild;
    }

    return undefined;
};

export default getComment;

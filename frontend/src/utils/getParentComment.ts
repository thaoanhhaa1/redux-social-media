import IComment from '../interfaces/IComment';

function getParentComment(
    comments: IComment[],
    commentId: string,
): IComment | undefined {
    const length = comments.length;

    for (let index = 0; index < length; index++) {
        const comment = comments[index];

        if (comment._id === commentId) return comment;
        if (comment.comments?.length) {
            const commentChild = getParentComment(comment.comments, commentId);

            if (commentChild) return commentChild;
        }
    }

    return undefined;
}

export default getParentComment;

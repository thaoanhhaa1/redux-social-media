import IComment from '../interfaces/IComment';

function getParentComment(
    comments: IComment[],
    commentId: string,
): IComment | undefined {
    const length = comments.length;

    for (let index = 0; index < length; index++) {
        const comment = comments[index];

        if (comment._id === commentId)
            if (comment.parent) return comment;
            else return undefined;
        if (comment.comments?.length) {
            const commentChild = getParentComment(comment.comments, commentId);

            if (commentChild) return comment;
        }
    }

    return undefined;
}

export default getParentComment;

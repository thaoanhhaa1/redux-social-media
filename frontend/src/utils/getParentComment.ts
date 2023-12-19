import IComment from '../interfaces/IComment';

function getParentComment(
    comments: IComment[],
    commentId: string,
): IComment | undefined {
    console.log('🚀 ~ commentId:', commentId);
    console.log('🚀 ~ comments:', comments);
    const length = comments.length;

    for (let index = 0; index < length; index++) {
        const comment = comments[index];

        if (comment._id === commentId) return comment;
        if (comment.comments?.length)
            return getParentComment(comment.comments, commentId);
    }

    return undefined;
}

export default getParentComment;

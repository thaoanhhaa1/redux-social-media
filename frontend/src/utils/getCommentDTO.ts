import IComment from '../interfaces/IComment';

function getCommentDTO(comment: IComment, level: number = 0): IComment {
    const commentNew = { ...comment };

    commentNew.comments = [];
    commentNew.level = level;
    commentNew.deleted = false;

    return commentNew;
}

export default getCommentDTO;

import IComment from '../interfaces/IComment';
import getCommentDTO from './getCommentDTO';

function getCommentsDTO(comments: IComment[], level: number = 0): IComment[] {
    return comments.map((comment) => getCommentDTO(comment, level));
}

export default getCommentsDTO;

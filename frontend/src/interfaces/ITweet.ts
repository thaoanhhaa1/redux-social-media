import IComment from './IComment';
import ITweetPost from './ITweetPost';

interface ITweet extends ITweetPost {
    _id: string;
    likes: string[];
    numberOfComments: number;
    comments: IComment[];
    skip: number;
    isNewTweet?: boolean;
    createdAt: string;
    notInterested: boolean;
}

export default ITweet;

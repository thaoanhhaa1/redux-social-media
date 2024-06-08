import ITweetPost from './ITweetPost';

interface ITweet extends ITweetPost {
    _id: string;
    likes: string[];
    numberOfComments: number;
    skip: number;
    isNewTweet?: boolean;
    createdAt: string;
    notInterested: boolean;
    blocked: boolean;
    report: boolean;
    viewed?: boolean;
    deleted?: boolean;
}

export default ITweet;

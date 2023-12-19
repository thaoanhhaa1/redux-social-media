import IComment from './IComment';
import ILocation from './ILocation';
import IUserTweet from './IPerson';

interface ITweet {
    _id?: string;
    content?: string;
    images?: string[];
    videos?: string[];
    createdAt?: string;
    likes?: string[];
    group?: string;
    feeling?: {
        title: string;
        image: string;
    };
    location?: ILocation;
    tagPeople?: IUserTweet[];
    gif?: {
        title: string;
        url: string;
    };
    numberOfComments?: number;
    comments: IComment[];
    skip: number;
}

export default ITweet;

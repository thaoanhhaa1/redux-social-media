import ILocation from './ILocation';
import IUserTweet from './IUserTweet';

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
}

export default ITweet;

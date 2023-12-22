import IFeeling from './IFeeling';
import ILocation from './ILocation';
import IPersonTweet from './IPersonTweet';
import IUserTweet from './IPerson';
import IGif from './IGif';

interface ITweetPost {
    user: IPersonTweet;
    content?: string;
    images?: string[];
    videos?: string[];
    group?: string;
    feeling?: IFeeling;
    location?: ILocation;
    tagPeople?: IUserTweet[];
    gif?: IGif;
}

export default ITweetPost;

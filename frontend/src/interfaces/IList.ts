import IPerson from './IPerson';
import ITweet from './ITweet';

interface IList extends IPerson {
    background: string;
    followers: number;
    following: number;
    isFollowing: boolean;
    isPin: boolean;
    tweets: ITweet[];
    page: number;
    pages: number;
}

export default IList;

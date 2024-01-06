import IPerson from './IPerson';
import ITweet from './ITweet';

interface IBookmark extends IPerson {
    numberOfTweets: number;
    tweets: Array<ITweet>;
    page: number;
    pages: number;
}

export default IBookmark;

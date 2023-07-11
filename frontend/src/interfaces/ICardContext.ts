import ITweet from './ITweet';
import IUserTweet from './IUserTweet';

interface ICardContext {
    user: IUserTweet;
    tweet: ITweet;
}

export default ICardContext;

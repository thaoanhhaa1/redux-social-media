import IPersonTweet from './IPersonTweet';
import ITweet from './ITweet';

interface ICardContext {
    user: IPersonTweet;
    tweet: ITweet;
}

export default ICardContext;

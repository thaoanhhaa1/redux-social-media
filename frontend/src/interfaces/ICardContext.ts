import ITweet from './ITweet';

interface ICardContext extends ITweet {
    isPopup: boolean;
    updateTweet: (tweet: ITweet) => void;
}

export default ICardContext;

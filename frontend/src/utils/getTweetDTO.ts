import { ITweet } from '../interfaces';

function getTweetDTO(tweet: ITweet): ITweet {
    const tweetNew = { ...tweet };

    tweetNew.skip = 0;
    tweetNew.comments = [];
    tweetNew.blocked = false;

    return tweetNew;
}

export default getTweetDTO;

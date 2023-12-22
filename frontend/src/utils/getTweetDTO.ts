import { ITweet } from '../interfaces';

function getTweetDTO(tweet: ITweet): ITweet {
    const tweetNew = { ...tweet };

    tweetNew.skip = 0;
    tweetNew.comments = [];

    return tweetNew;
}

export default getTweetDTO;

import { ITweet } from '../interfaces';

function getNewTweets(tweets: ITweet[]) {
    return tweets.filter((tweet) => tweet.isNewTweet);
}

export default getNewTweets;

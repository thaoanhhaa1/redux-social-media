import { ITweet } from '../interfaces';

const findTweetById = (tweets: ITweet[], id: string) => {
    return tweets.find((tweet) => tweet._id === id);
};

export default findTweetById;

import { ITweet } from '../interfaces';
import getTweetDTO from './getTweetDTO';

function getTweetsDTO(tweets: ITweet[]): ITweet[] {
    return tweets.map(getTweetDTO);
}

export default getTweetsDTO;

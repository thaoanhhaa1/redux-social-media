import { TrendingType } from '../types';
import ITweet from './ITweet';

interface ITrending {
    _id: string;
    quantity: number;
    type: TrendingType;
    page: number;
    pages: number;
    loading: boolean;
}

export interface ITweetTrending extends ITrending {
    tweets: ITweet[];
}

export default ITrending;

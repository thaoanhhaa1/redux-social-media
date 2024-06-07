import { ITrending } from '../interfaces';
import { TrendingType } from '../types';

const getTrendingDTO = (trending: ITrending, type: TrendingType) => {
    return {
        ...trending,
        page: 0,
        pages: -1,
        loading: false,
        type,
        tweets: [],
    };
};

export default getTrendingDTO;

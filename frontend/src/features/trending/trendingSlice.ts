import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITrending, ITweetTrending } from '../../interfaces';
import { trendingService } from '../../services';
import { TrendingType } from '../../types';
import { getTrendingDTO, getTweetsDTO } from '../../utils';

interface TrendingState {
    trendingList: ITrending[];
    loading: boolean;
    page: number;
    pages: number;
}

const initialState: TrendingState = {
    trendingList: [],
    loading: false,
    page: 0,
    pages: -1,
};

export const getTrending = createAsyncThunk(
    'trending/getTrending',
    async ({ page, type }: { type: TrendingType; page: number }) => {
        const res = await trendingService.getTrending({ type, page });

        return res;
    },
);

export const countPages = createAsyncThunk(
    'trending/countPages',
    async ({ type }: { type: TrendingType }) => {
        const res = await trendingService.countTrendingPages({ type });

        return res;
    },
);

export const getTweetsByTrending = createAsyncThunk(
    'trending/getTweetsByTrending',
    async ({ page, trending }: { page: number; trending: string }) => {
        const res = await trendingService.getDetailTrending({
            id: trending,
            page,
            type: 'tweet',
        });

        return res;
    },
);

const trendingSlice = createSlice({
    name: 'trending',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTrending.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTrending.fulfilled, (state, { payload, meta }) => {
                state.trendingList.push(
                    ...payload.map((item: ITrending) =>
                        getTrendingDTO(item, meta.arg.type),
                    ),
                );
                state.page += 1;
                state.loading = false;
            })
            .addCase(getTrending.rejected, (state) => {
                state.loading = false;
            })
            .addCase(countPages.fulfilled, (state, { payload }) => {
                state.pages = payload;
            })
            .addCase(
                getTweetsByTrending.fulfilled,
                (state, { payload, meta }) => {
                    const trending = findById(
                        state.trendingList,
                        meta.arg.trending,
                    );

                    if (trending) {
                        const tweetTrending = trending as ITweetTrending;

                        tweetTrending.tweets.push(...getTweetsDTO(payload));
                        trending.page += 1;
                        trending.loading = false;
                    }
                },
            )
            .addCase(getTweetsByTrending.pending, (state, { meta }) => {
                const trending = findById(
                    state.trendingList,
                    meta.arg.trending,
                );

                if (trending) {
                    trending.loading = true;
                }
            })
            .addCase(getTweetsByTrending.rejected, (state, { meta }) => {
                const trending = findById(
                    state.trendingList,
                    meta.arg.trending,
                );

                if (trending) {
                    trending.loading = false;
                }
            });
    },
});

function findById(trendingList: ITrending[], trending: string) {
    return trendingList.find((item) => item._id === trending);
}

export default trendingSlice.reducer;

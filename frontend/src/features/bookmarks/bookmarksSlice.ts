import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { IBookmark, ITweet } from '../../interfaces';
import { getBookmarksDTO, getTweetsDTO } from '../../utils';

interface IBookmarks {
    bookmarks: Array<IBookmark>;
    loading: boolean;
}

const initialState: IBookmarks = {
    bookmarks: [],
    loading: false,
};

const getBookmarks = createAsyncThunk(
    'bookmarks/getBookmarks',
    async (): Promise<Array<IBookmark>> => {
        const res = await axiosClient.get(api.getBookmarks());

        return res.data;
    },
);

const getTweets = createAsyncThunk(
    'bookmarks/getTweets',
    async ({
        userId,
        page,
    }: {
        userId: string;
        page: number;
    }): Promise<Array<ITweet>> => {
        const res = await axiosClient.get(api.getTweetsByUserId(userId), {
            params: {
                page,
            },
        });

        return res.data;
    },
);

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        updateTweet: (state, { payload }: { payload: ITweet }) => {
            const userId = payload.user._id;

            const bookmark = state.bookmarks.find(
                (bookmark) => bookmark._id === userId,
            );

            if (!bookmark) return state;

            const indexTweet = bookmark.tweets.findIndex(
                (tweet) => tweet._id === payload._id,
            );

            bookmark.tweets[indexTweet] = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookmarks.fulfilled, (state, { payload }) => {
                state.bookmarks.push(...getBookmarksDTO(payload));
                state.loading = false;
            })
            .addCase(getBookmarks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBookmarks.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getTweets.fulfilled, (state, { payload }) => {
                if (!payload.length) return state;

                const userId = payload[0].user._id;

                const index = state.bookmarks.findIndex(
                    (bookmark) => bookmark._id === userId,
                );

                if (index === -1) return state;

                state.bookmarks[index].tweets.push(...getTweetsDTO(payload));
                state.bookmarks[index].page += 1;
            });
    },
});

export default bookmarksSlice.reducer;
export const { updateTweet } = bookmarksSlice.actions;
export { getBookmarks, getTweets };

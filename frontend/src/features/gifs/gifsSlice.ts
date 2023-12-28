import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IGif } from '../../interfaces';
import axiosClient from '../../api/axiosClient';
import api from '../../api';

const NUMBER_OF_PAGE = 5;

const initialState: {
    data: Array<IGif>;
    page: number;
    loading: boolean;
} = {
    data: [],
    page: 0,
    loading: true,
};

const getGifs = createAsyncThunk(
    'gifs/getGifs',
    async ({
        q = '',
        page,
    }: {
        q?: string;
        page: number;
    }): Promise<Array<IGif>> => {
        const offset = (page - 1) * NUMBER_OF_PAGE;
        const limit = NUMBER_OF_PAGE;

        const res = await axiosClient.get(api.getGifs(), {
            params: {
                q,
                limit,
                offset,
            },
        });

        return res.data;
    },
);

const gifsSlice = createSlice({
    name: 'gifs',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGifs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGifs.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getGifs.fulfilled, (state, { payload }) => {
                state.data.push(...payload);
                state.page += 1;
                state.loading = false;
            });
    },
});

export default gifsSlice.reducer;
export { getGifs };
export const { reset } = gifsSlice.actions;

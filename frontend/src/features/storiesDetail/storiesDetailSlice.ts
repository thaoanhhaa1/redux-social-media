import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IStoriesDetail } from '../../interfaces';
import axiosClient from '../../api/axiosClient';
import api from '../../api';

const initialState: {
    data: Array<IStoriesDetail>;
    loading: boolean;
} = {
    data: [],
    loading: false,
};

const getStories = createAsyncThunk(
    'storiesDetail/getStories',
    async (): Promise<Array<IStoriesDetail>> => {
        const result = await axiosClient.get(api.getStoriesDetail());

        return result.data;
    },
);

const storiesDetailSlice = createSlice({
    name: 'storiesDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStories.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getStories.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data.push(...payload);
            });
    },
});

export default storiesDetailSlice.reducer;
export { getStories };

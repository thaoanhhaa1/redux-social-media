import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { ISearch } from '../../interfaces';

const initialState: ISearch = {
    count: 0,
    results: [],
    isLoading: false,
};

const search = createAsyncThunk('search/search', async (param: string) => {
    const res = await axiosClient.get(api.search(param), {
        params: {
            limit: 8,
        },
    });

    return res.data;
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        init: (state) => {
            Object.assign(state, initialState);
        },
        remove: (state, { payload }) => {
            state.results = state.results.filter(
                (result) => result._id !== payload,
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(search.fulfilled, (state, { payload }) => {
                state.results = payload;
                state.isLoading = false;
                state.count += 1;
            })
            .addCase(search.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(search.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

const { init, remove } = searchSlice.actions;

export default searchSlice.reducer;
export { init, remove, search };

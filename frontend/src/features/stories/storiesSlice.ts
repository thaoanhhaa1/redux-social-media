import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { IStories } from '../../interfaces';

const initialState: IStories = {
    stories: [],
    isLoading: true,
};

const createStory = createAsyncThunk(
    'stories/createStory',
    async (url: string) => {
        try {
            const res = await axiosClient.post(api.createStory(), {
                url,
            });

            return res.data;
        } catch (error) {
            throw error;
        }
    },
);

const getStories = createAsyncThunk('stories/getStories', async () => {
    return (await axiosClient.get(api.getStories())).data;
});

const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createStory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createStory.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(createStory.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.stories.unshift(payload);
            })
            .addCase(getStories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStories.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getStories.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.stories = payload;
            });
    },
});

export default storiesSlice.reducer;
export { createStory, getStories };

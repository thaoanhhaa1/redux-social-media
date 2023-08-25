import { createSlice } from '@reduxjs/toolkit';

const initialState: {
    isLoading: boolean;
} = {
    isLoading: true,
};

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setLoading: (state, { payload }: { payload: boolean }) => {
            state.isLoading = payload;
        },
    },
});

export default pageSlice.reducer;
export const { setLoading } = pageSlice.actions;

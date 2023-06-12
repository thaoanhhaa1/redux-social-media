import { createSlice } from '@reduxjs/toolkit';
import { ITheme } from '../../interfaces';

const initialState: ITheme = {
    isDark: false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

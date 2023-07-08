import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import IContact from '../../interfaces/IContact';
import axiosClient from '../../api/axiosClient';
import api from '../../api';

const initialState: {
    contacts: IContact[];
    pageCount: number;
    isLoading: boolean;
} = {
    pageCount: 0,
    contacts: [],
    isLoading: false,
};

const getContacts = createAsyncThunk(
    'contacts/getContacts',
    async (pageCount: number) => {
        try {
            const res = await axiosClient.get(api.getUsersOnline(), {
                params: {
                    limit: 25,
                    skip: 25 * pageCount,
                },
            });

            return res.data;
        } catch (error) {
            console.error('🚀 ~ error:', error);
            throw error;
        }
    },
);

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getContacts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getContacts.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getContacts.fulfilled, (state, { payload }) => {
                state.contacts.push(...payload);
                state.isLoading = false;
                state.pageCount += 1;
            });
    },
});

export { getContacts };

export default contactsSlice.reducer;

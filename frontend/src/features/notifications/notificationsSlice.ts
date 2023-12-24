import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { INotification } from '../../interfaces';

const initialState: {
    notifications: INotification[];
    loading: boolean;
    page: number;
    numberOfPages: number;
} = {
    notifications: [],
    loading: false,
    page: 0,
    numberOfPages: 0,
};

const getNotifications = createAsyncThunk(
    'notificationsSlice/getNotifications',
    async ({
        page,
        pages = 1,
    }: {
        page: number;
        pages?: number;
    }): Promise<{
        notifications: INotification[];
        numberOfPages: number;
    }> => {
        const result = await axiosClient.get(api.getNotifications(), {
            params: {
                page,
                pages,
            },
        });

        return {
            notifications: result.data.data,
            numberOfPages: result.data.numberOfPages,
        };
    },
);

const deleteNotification = createAsyncThunk(
    'notificationsSlice/deleteNotification',
    async (notificationId: number) => {
        const result = await axiosClient.delete(
            api.deleteNotification(notificationId),
        );

        return result.data;
    },
);

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        removeNotification: (state, { payload }: { payload: number }) => {
            const index = state.notifications.findIndex(
                (item) => item._id === payload,
            );

            state.notifications.splice(index, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                // if (!state.page)
                state.loading = true;
            })
            .addCase(getNotifications.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getNotifications.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.notifications.push(...payload.notifications);
                state.page += 1;

                if (!state.numberOfPages)
                    state.numberOfPages = payload.numberOfPages;
            });
    },
});

export default notificationsSlice.reducer;
export const { removeNotification } = notificationsSlice.actions;
export { deleteNotification, getNotifications };

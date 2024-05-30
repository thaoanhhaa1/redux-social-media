import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { INotification } from '../../interfaces';
import { NotificationType } from '../../types';

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
        skip,
        pages = 1,
    }: {
        skip: number;
        pages?: number;
    }): Promise<{
        notifications: INotification[];
        numberOfPages: number;
    }> => {
        const result = await axiosClient.get(api.getNotifications(), {
            params: {
                skip,
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
        addNotificationSocket: (
            state,
            { payload }: { payload: INotification },
        ) => {
            state.notifications.unshift(payload);
        },
        deleteNotificationSocket: (
            state,
            {
                payload,
            }: {
                payload: {
                    userId: string;
                    document: string;
                    type: NotificationType;
                };
            },
        ) => {
            const { userId, document, type } = payload;

            const index = state.notifications.findIndex(
                (item) =>
                    item.user._id === userId &&
                    item.document === document &&
                    item.type === type,
            );

            state.notifications.splice(index, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
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
                    state.numberOfPages = Math.ceil(payload.numberOfPages / 10);
            });
    },
});

export default notificationsSlice.reducer;
export const {
    removeNotification,
    addNotificationSocket,
    deleteNotificationSocket,
} = notificationsSlice.actions;
export { deleteNotification, getNotifications };

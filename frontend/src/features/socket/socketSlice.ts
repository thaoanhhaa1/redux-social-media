import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';

interface ISocket {
    socket: any;
}

const initialState: ISocket = {
    socket: null,
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        connect: (state, { payload }) => {
            state.socket = io('http://localhost:8080', {
                auth: {
                    _id: payload,
                },
            });
        },
        disconnect: (state) => {
            if (!state.socket) return;
            state.socket.disconnect().close();
        },
    },
});

export const { connect, disconnect } = socketSlice.actions;
export default socketSlice.reducer;

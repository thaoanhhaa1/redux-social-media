import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import axiosClient from '../../api/axiosClient';
import { IUser } from '../../interfaces';
import { SignUpType } from '../../types';

const initialState: IUser = {
    _id: '',
    username: '',
    email: '',
};

const signUp = createAsyncThunk('user/signUp', async (data: SignUpType) => {
    try {
        const res = await axiosClient.post('/users/sign-up', data);

        return res.data;
    } catch (error) {
        console.log('🚀 ~ signUp ~ error:', error);
        const status = (error as AxiosError).request.status;
        let message = '';

        switch (status) {
            case 400:
                message = 'Username, email and password are required';
                break;
            case 409:
                message = 'Username or email already used';
                break;
            default:
                message = 'Server is down';
        }

        toast.error(message, {
            pauseOnHover: true,
        });

        throw error;
    }
});

const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    try {
        const res = await axiosClient.get('/users/get-user');

        return res.data;
    } catch (error) {
        console.error(error);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state._id = payload._id;
            state.email = payload.email;
            state.username = payload.username;
        },
    },
});

const { setUser } = userSlice.actions;

export { fetchUser, setUser, signUp };
export default userSlice.reducer;

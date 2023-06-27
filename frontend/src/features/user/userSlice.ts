import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { IUser } from '../../interfaces';
import { SignInType, SignUpType } from '../../types';

const initialState: IUser = {
    _id: '',
    username: '',
    email: '',
    avatar: '',
    background: '',
    name: '',
    bio: '',
    website: '',
    birthday: '',
    createdAt: new Date(),
};

const signUp = createAsyncThunk('user/signUp', async (data: SignUpType) => {
    try {
        const res = await axiosClient.post(api.signUp(), data);

        return res.data;
    } catch (error) {
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

const signIn = createAsyncThunk('user/signIn', async (data: SignInType) => {
    try {
        const res = await axiosClient.post(api.signIn(), data);

        return res.data;
    } catch (error) {
        toast.error('Email or password is incorrect');

        throw error;
    }
});

const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    try {
        const res = await axiosClient.get(api.getUser());

        return res.data;
    } catch (error) {
        throw error;
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, { payload }) => {
                const createdAt = new Date(payload.createdAt);

                Object.assign(state, {
                    ...payload,
                    createdAt,
                });
            })
            .addCase(fetchUser.rejected, (state) => {});
    },
});

export { fetchUser, signIn, signUp };
export default userSlice.reducer;

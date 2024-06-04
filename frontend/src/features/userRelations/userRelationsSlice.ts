import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPerson } from '../../interfaces';
import { followService } from '../../services';

interface UserRelationsState {
    followers: IPerson[];
    following: IPerson[];
    blocked: IPerson[];
    beenBlocked: IPerson[];
}

type ActionType = {
    payload: {
        user: IPerson;
        type: UserRelationType;
    };
};

export type UserRelationType = keyof UserRelationsState;

const initialState: UserRelationsState = {
    followers: [],
    following: [],
    blocked: [],
    beenBlocked: [],
};

const getBlockedUsers = createAsyncThunk(
    'handleUnblock',
    followService.getBlockedUsers,
);

const userRelationsSlice = createSlice({
    name: 'userRelations',
    initialState,
    reducers: {
        addUser: (state, { payload }: ActionType) => {
            state[payload.type].push(payload.user);
        },
        removeUser: (state, { payload }: ActionType) => {
            state[payload.type] = state[payload.type].filter(
                (person) => person._id !== payload.user._id,
            );
        },
        removeUserById: (
            state,
            {
                payload,
            }: {
                payload: {
                    type: UserRelationType;
                    userId: string;
                };
            },
        ) => {
            state[payload.type] = state[payload.type].filter(
                (person) => person._id !== payload.userId,
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getBlockedUsers.fulfilled, (state, { payload }) => {
            state.blocked = payload;
        });
    },
});

export default userRelationsSlice.reducer;
export const { addUser, removeUser, removeUserById } =
    userRelationsSlice.actions;
export { getBlockedUsers };

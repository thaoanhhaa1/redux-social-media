import { createSlice } from '@reduxjs/toolkit';
import { IPerson } from '../../interfaces';

interface UserRelationsState {
    followers: IPerson[];
    following: IPerson[];
    blocked: IPerson[];
}

export type UserRelationType = keyof UserRelationsState;

const initialState: UserRelationsState = {
    followers: [],
    following: [],
    blocked: [],
};

const userRelationsSlice = createSlice({
    name: 'userRelations',
    initialState,
    reducers: {
        addUser: (
            state,
            {
                payload,
            }: {
                payload: {
                    user: IPerson;
                    type: UserRelationType;
                };
            },
        ) => {
            state[payload.type].push(payload.user);
        },
    },
});

export default userRelationsSlice.reducer;
export const { addUser } = userRelationsSlice.actions;

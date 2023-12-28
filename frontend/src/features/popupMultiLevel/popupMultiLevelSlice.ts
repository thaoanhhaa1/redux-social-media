import { createSlice } from '@reduxjs/toolkit';
import { SubProps } from '../../types';

interface IPopupMultiLevel {
    subs: SubProps[];
    height: number;
    updateHeightPopup: () => void;
}

const initialState: IPopupMultiLevel = {
    subs: [],
    height: 0,
    updateHeightPopup: () => {},
};

const popupMultiLevelSlice = createSlice({
    name: 'popupMultiLevel',
    initialState,
    reducers: {
        addSub: (state, { payload }: { payload: SubProps }) => {
            state.subs.push(payload);
        },
        resetSubs: (state) => {
            state.subs = [];
        },
        popSub: (state) => {
            state.subs.pop();
        },
        setHeight: (state, { payload }: { payload: number }) => {
            state.height = payload;
        },
        setUpdateHeightPopup: (state, { payload }: { payload: () => void }) => {
            state.updateHeightPopup = payload;
        },
    },
});

export default popupMultiLevelSlice.reducer;
export const { addSub, resetSubs, popSub, setHeight, setUpdateHeightPopup } =
    popupMultiLevelSlice.actions;

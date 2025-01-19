
// @ts-ignore
import {Crop} from './/src/models/Crop.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initialState : Crop[] = [];

const cropSlice  = createSlice({
    name: 'crop',
    initialState,
    reducers: {
        saveCrop: (state, action : PayloadAction<Crop>) => {
            state.push(action.payload)
        },
        deleteCrop: (state, action) => {
            // @ts-ignore
            return state.filter(crop => crop.cropCode !== action.payload);
        },
        updateCrop: (state, action) => {
            const index = state.findIndex((cropItem : Crop) => cropItem.cropCode === action.payload.cropCode);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const {saveCrop, updateCrop, deleteCrop} = cropSlice.actions;
export default cropSlice.reducer;

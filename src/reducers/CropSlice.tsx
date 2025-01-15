// @ts-ignore
import {CropPage} from "../pages/CropPage.tsx";
import {createSlice} from '@reduxjs/toolkit';

export const initialState= [];

const cropSlice  = createSlice({
    name: 'crop',
    initialState,
    reducers: {
        addCrop: (state, action) => {
            state.push(action.payload)
        },
        deleteCrop: (state, action) => {
            // @ts-ignore
            return state.filter(crop => crop.cropCode !== action.payload);
        },
        updateCrop: (state, action) => {
            const index = state.findIndex(crop => crop.cropCode === action.payload.cropCode);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    }
})

export const {addCrop, updateCrop, deleteCrop} = cropSlice.actions;
export default cropSlice.reducer;

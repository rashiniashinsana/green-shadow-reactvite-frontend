import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Crop} from "../models/Crop.ts";

export const initialState : Crop[] = [{
    cropCode: 'CRP001',
    cropName: 'Rice',
    cropScientificName: 'Oryza sativa',
    cropSeason: 'Kharif',
    cropType: 'Cereal',
    cropImage: null,
    fieldCode: 'FLD001',

}];

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

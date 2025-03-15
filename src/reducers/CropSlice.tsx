import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Crop } from "../models/Crop.ts";

export const initialState: Crop[] = [{
    cropCode: 'CRP001',
    cropName: 'Rice',
    cropScientificName: 'Oryza sativa',
    cropSeason: 'Kharif',
    cropType: 'Cereal',
    cropImage: null,
    fieldCode: 'FLD001',
},
{
    cropCode: 'CRP002',
    cropName: 'Wheat',
    cropScientificName: 'Triticum aestivum',
    cropSeason: 'Rabi',
    cropType: 'Cereal',
    cropImage: null,
    fieldCode: 'FLD002',
},
{
    cropCode: 'CRP003',
    cropName: 'Maize',
    cropScientificName: 'Zea mays',
    cropSeason: 'Kharif',
    cropType: 'Cereal',
    cropImage: null,
    fieldCode: 'FLD003',
},
{
    cropCode: 'CRP004',
    cropName: 'Sugarcane',
    cropScientificName: 'Saccharum officinarum',
    cropSeason: 'Kharif',
    cropType: 'Cash',
    cropImage: null,
    fieldCode: 'FLD004',
},
{
    cropCode: 'CRP005',
    cropName: 'Cotton',
    cropScientificName: 'Gossypium hirsutum',
    cropSeason: 'Kharif',
    cropType: 'Fiber',
    cropImage: null,
    fieldCode: 'FLD005',
},
{
    cropCode: 'CRP006',
    cropName: 'Barley',
    cropScientificName: 'Hordeum vulgare',
    cropSeason: 'Rabi',
    cropType: 'Cereal',
    cropImage: null,
    fieldCode: 'FLD006',
},
{
    cropCode: 'CRP007',
    cropName: 'Soybean',
    cropScientificName: 'Glycine max',
    cropSeason: 'Kharif',
    cropType: 'Oilseed',
    cropImage: null,
    fieldCode: 'FLD007',
},
{
    cropCode: 'CRP008',
    cropName: 'Peanut',
    cropScientificName: 'Arachis hypogaea',
    cropSeason: 'Kharif',
    cropType: 'Oilseed',
    cropImage: null,
    fieldCode: 'FLD008',
},
{
    cropCode: 'CRP009',
    cropName: 'Sunflower',
    cropScientificName: 'Helianthus annuus',
    cropSeason: 'Kharif',
    cropType: 'Oilseed',
    cropImage: null,
    fieldCode: 'FLD009',
},
];

const cropSlice = createSlice({
    name: 'crop',
    initialState,
    reducers: {
        saveCrop: (state, action: PayloadAction<Crop>) => {
            state.push(action.payload);
            alert("Crop saved successfully");
        },
        deleteCrop: (state, action) => {
            return state.filter(crop => crop.cropCode !== action.payload);
        },
        updateCrop: (state, action) => {
            const index = state.findIndex((cropItem: Crop) => cropItem.cropCode === action.payload.cropCode);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const { saveCrop, updateCrop, deleteCrop } = cropSlice.actions;
export default cropSlice.reducer;

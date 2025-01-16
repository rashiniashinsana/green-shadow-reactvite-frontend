// @ts-ignore
import { createSlice } from "@reduxjs/toolkit";

export const initialState = [];

const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        addField: (state, action) => {
            state.push(action.payload);
        },
        deleteField: (state, action) => {
            return state.filter(field => field.fieldCode !== action.payload);
        },
        updateField: (state, action) => {
            const index = state.findIndex(field => field.fieldCode === action.payload.fieldCode);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const { addField, deleteField, updateField } = fieldSlice.actions;
export default fieldSlice.reducer;

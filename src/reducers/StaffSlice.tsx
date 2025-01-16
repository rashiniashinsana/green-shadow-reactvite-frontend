// @ts-ignore
import { createSlice } from "@reduxjs/toolkit";

export const initialState = [];

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        addStaff: (state, action) => {
            state.push(action.payload);
        },
        deleteStaff: (state, action) => {
            return state.filter(staff => staff.id !== action.payload);
        },
        updateStaff: (state, action) => {
            const index = state.findIndex(staff => staff.id === action.payload.id);
            if (index > -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const { addStaff, deleteStaff, updateStaff } = staffSlice.actions;
export default staffSlice.reducer;

// @ts-ignore
import { createSlice } from "@reduxjs/toolkit";

export const initialState = [];

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        addVehicle: (state, action) => {
            state.push(action.payload);
        },
        deleteVehicle: (state, action) => {
            return state.filter(vehicle => vehicle.vehicleCode !== action.payload);
        },
        updateVehicle: (state, action) => {
            const index = state.findIndex(vehicle => vehicle.vehicleCode === action.payload.vehicleCode);
            if (index > -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const { addVehicle, deleteVehicle, updateVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;

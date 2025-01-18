// @ts-ignore
import { createSlice } from "@reduxjs/toolkit";

export const initialState = [];

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        saveVehicle: (state, action) => {
            // @ts-ignore
            state.push(action.payload);
        },
        deleteVehicle: (state, action) => {
            // @ts-ignore
            return state.filter(vehicle => !(vehicle.vehicleCode === action.payload));
        },
        updateVehicle: (state, action) => {
            // @ts-ignore
            const index = state.findIndex(vehicle => vehicle.vehicleCode === action.payload.vehicleCode);
            if (index !== -1) {
                // @ts-ignore
                state[index] = action.payload;
            }
        },
    },
});

export const { saveVehicle, deleteVehicle, updateVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;

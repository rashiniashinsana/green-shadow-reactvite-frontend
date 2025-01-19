import {Vehicle} from "../models/Vehicle";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Vehicle[] = [
    {
        vehicleCode: "VHL001",
        licensePlateNumber: "WP-1234",
        vehicleCategory: "Lorry",
        fuelType: "Diesel",
        remarks: "Good Condition",
        staffId: "STF001",
    }
]

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        saveVehicle: (state, action) => {
            state.push(action.payload);
        },
        updateVehicle: (state, action) => {
            return state.map((vehicle: Vehicle) => vehicle.vehicleCode === action.payload.vehicleCode
                ? action.payload
                : vehicle
            );
        },
        deleteVehicle: (state, action : PayloadAction<string>) => {
            return state.filter((vehicle: Vehicle) => vehicle.vehicleCode !== action.payload );
        }
    }
})

export const {saveVehicle, updateVehicle, deleteVehicle} = vehicleSlice.actions;
export default vehicleSlice.reducer;
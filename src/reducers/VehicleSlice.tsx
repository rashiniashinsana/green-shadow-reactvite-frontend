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
    },
    {
        vehicleCode: "VHL002",
        licensePlateNumber: "WP-5678",
        vehicleCategory: "Van",
        fuelType: "Petrol",
        remarks: "Good Condition",
        staffId: "STF002",
    },
    {
        vehicleCode: "VHL003",
        licensePlateNumber: "WP-9876",
        vehicleCategory: "Lorry",
        fuelType: "Diesel",
        remarks: "Good Condition",
        staffId: "STF003",
    },
    {
        vehicleCode: "VHL004",
        licensePlateNumber: "WP-5432",
        vehicleCategory: "Van",
        fuelType: "Petrol",
        remarks: "Good Condition",
        staffId: "STF004",
    },
    {
        vehicleCode: "VHL005",
        licensePlateNumber: "WP-2468",
        vehicleCategory: "Lorry",
        fuelType: "Diesel",
        remarks: "Good Condition",
        staffId: "STF005",
    },
    {
        vehicleCode: "VHL006",
        licensePlateNumber: "WP-1357",
        vehicleCategory: "Van",
        fuelType: "Petrol",
        remarks: "Good Condition",
        staffId: "STF006",
    },
    {
        vehicleCode: "VHL007",
        licensePlateNumber: "WP-8642",
        vehicleCategory: "Lorry",
        fuelType: "Diesel",
        remarks: "Good Condition",
        staffId: "STF007",
    },
    {
        vehicleCode: "VHL008",
        licensePlateNumber: "WP-9753",
        vehicleCategory: "Van",
        fuelType: "Petrol",
        remarks: "Good Condition",
        staffId: "STF008",
    },
    {
        vehicleCode: "VHL009",
        licensePlateNumber: "WP-7531",
        vehicleCategory: "Lorry",
        fuelType: "Diesel",
        remarks: "Good Condition",
        staffId: "STF009",
    },
    {
        vehicleCode: "VHL010",
        licensePlateNumber: "WP-2468",
        vehicleCategory: "Van",
        fuelType: "Petrol",
        remarks: "Good Condition",
        staffId: "STF010",
    },
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
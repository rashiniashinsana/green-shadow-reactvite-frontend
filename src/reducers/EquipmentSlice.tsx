import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Equipment} from "../models/Equipment.ts";

const initialState: Equipment[] = [{
    equipmentId: "EQU001",
    equipmentName: "Tractor",
    equipmentType: "Farm Equipment",
    fieldId: "FLD001",
    staffId: "STF001",
}];

const EquipmentSlice = createSlice({
    name: "equipment",
    initialState,
    reducers: {
        saveEquipment: (state, action: PayloadAction<Equipment>) => {
            console.log("Equipment Saved Successfully",action.payload);
            state.push(action.payload);
        },
        deleteEquipment: (state, action: PayloadAction<string>) => {
            return state.filter((equipment) => equipment.equipmentId !== action.payload);
        },
        updateEquipment: (state, action: PayloadAction<Equipment>) => {
            const index = state.findIndex((equipment) => equipment.equipmentId === action.payload.equipmentId);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
    },
});

export const { saveEquipment, deleteEquipment, updateEquipment } = EquipmentSlice.actions;
export default EquipmentSlice.reducer;
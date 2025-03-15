import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Equipment} from "../models/Equipment.ts";

const initialState: Equipment[] = [{
    equipmentId: "EQU001",
    equipmentName: "Tractor",
    equipmentType: "Farm Equipment",
    fieldId: "F006",
    staffId: "STF001",
},
{
    equipmentId: "EQU002",
    equipmentName: "Harvester",
    equipmentType: "Farm Equipment",
    fieldId: "F007",
    staffId: "STF002",
},
{
    equipmentId: "EQU003",
    equipmentName: "Plough",
    equipmentType: "Farm Equipment",
    fieldId: "F004",
    staffId: "STF003",
},
{
    equipmentId: "EQU004",
    equipmentName: "Seeder",
    equipmentType: "Farm Equipment",
    fieldId: "F007",
    staffId: "STF004",
},
{
    equipmentId: "EQU005",
    equipmentName: "Sprinkler",
    equipmentType: "Farm Equipment",
    fieldId: "F002",
    staffId: "STF005",
},
{
    equipmentId: "EQU006",
    equipmentName: "Harrow",
    equipmentType: "Farm Equipment",
    fieldId: "F004",
    staffId: "STF006",
},
{
    equipmentId: "EQU007",
    equipmentName: "Cultivator",
    equipmentType: "Farm Equipment",
    fieldId: "F003",
    staffId: "STF007",
},
{
    equipmentId: "EQU008",
    equipmentName: "Fertilizer Spreader",
    equipmentType: "Farm Equipment",
    fieldId: "F005",
    staffId: "STF008",
},
{
    equipmentId: "EQU009",
    equipmentName: "Rotary Tiller",
    equipmentType: "Farm Equipment",
    fieldId: "F007",
    staffId: "STF009",
},
{
    equipmentId: "EQU010",
    equipmentName: "Baler",
    equipmentType: "Farm Equipment",
    fieldId: "F001",
    staffId: "STF010",
},
{
    equipmentId: "EQU011",
    equipmentName: "Mower",
    equipmentType: "Farm Equipment",
    fieldId: "F002",
    staffId: "STF011",
},
{
    equipmentId: "EQU012",
    equipmentName: "Tedder",
    equipmentType: "Farm Equipment",
    fieldId: "F007",
    staffId: "STF012",
},
];

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
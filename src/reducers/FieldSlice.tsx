import {Field} from "../models/Field";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Field[] = [{
    fieldCode: "F001",
    fieldName: "Field 1",
    fieldSize: "10",
    fieldImage1: new File([""], "field1.jpg"),
    fieldImage2: new File([""], "field2.jpg"),
    location: {
        longitude: 0,
        latitude: 0,
    },
    assignStaffs: ["S001", "S002"]
}]

const fieldSlice = createSlice({
    name: "field",
    initialState,
    reducers: {
        saveField: (state, action : PayloadAction<Field>) => {
            state.push(action.payload)
        },
        updateField: (state, action : PayloadAction<Field>) => {
            return state.map((field: Field) => field.fieldCode === action.payload.fieldCode
                ? action.payload
                 : field
            );
        },
        deleteField: (state, action : PayloadAction<string>) => {
            console.log(action.payload)
            return state.filter((field: Field) => field.fieldCode !== action.payload)
        }
    }
})

export const {saveField, updateField, deleteField} = fieldSlice.actions
export default fieldSlice.reducer
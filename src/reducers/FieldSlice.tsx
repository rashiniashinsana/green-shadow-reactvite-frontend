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
},
    {
        fieldCode: "F002",
        fieldName: "Field 2",
        fieldSize: "20",
        fieldImage1: new File([""], "field1.jpg"),
        fieldImage2: new File([""], "field2.jpg"),
        location: {
            longitude: 0,
            latitude: 0,
        },
        assignStaffs: ["S003", "S004"]
    },
    {
        fieldCode: "F003",
        fieldName: "Field 3",
        fieldSize: "30",
        fieldImage1: new File([""], "field1.jpg"),
        fieldImage2: new File([""], "field2.jpg"),
        location: {
            longitude: 0,
            latitude: 0,
        },
        assignStaffs: ["S005", "S006"]
    },
    {
        fieldCode: "F004",
        fieldName: "Field 4",
        fieldSize: "40",
        fieldImage1: new File([""], "field1.jpg"),
        fieldImage2: new File([""], "field2.jpg"),
        location: {
            longitude: 0,
            latitude: 0,
        },
        assignStaffs: ["S007", "S008"]
    },
    {
        fieldCode: "F005",
        fieldName: "Field 5",
        fieldSize: "50",
        fieldImage1: new File([""], "field1.jpg"),
        fieldImage2: new File([""], "field2.jpg"),
        location: {
            longitude: 0,
            latitude: 0,
        },
        assignStaffs: ["S009", "S010"]
    },
    {
        fieldCode: "F006",
        fieldName: "Field 6",
        fieldSize: "60",
        fieldImage1: new File([""], "field1.jpg"),
        fieldImage2: new File([""], "field2.jpg"),
        location: {
            longitude: 0,
            latitude: 0,
        },
        assignStaffs: ["S011", "S012"]
    },
    {
        fieldCode: "F007",
        fieldName: "Field 7",
        fieldSize: "70",
        fieldImage1: new File([""], "field1.jpg"),
        fieldImage2: new File([""], "field2.jpg"),
        location: {
            longitude: 0,
            latitude: 0,
        },
        assignStaffs: ["S013", "S014"]
    },
]

const fieldSlice = createSlice({
    name: "field",
    initialState,
    reducers: {
        saveField: (state, action : PayloadAction<Field>) => {
            state.push(action.payload)
            alert("Filed Saved Successfully")
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
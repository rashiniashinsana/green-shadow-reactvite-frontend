import {Log} from "../models/Log";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState : Log[] = [{
    logCode: "LOG001",
    logDate: "2021-10-01",
    observedImage: null,
    logDetail: "Log Detail",
    fieldCodes: ["FLD001"],
    cropCodes: ["CRP001"],
    staffIds: ["STF001"]

}]

const LogSlice = createSlice({
    name: 'log',
    initialState: initialState,
    reducers: {
        addLog: (state, action: PayloadAction<Log>) => {
            state.push(action.payload);
        },
        deleteLog: (state, action: PayloadAction<string>) => {
            return state.filter((log) => log.logCode !== action.payload);
        },
        updateLog: (state, action: PayloadAction<Log>) => {
            const index = state.findIndex((log) => log.logCode === action.payload.logCode);
            state[index] = action.payload;
        }
    }
})

export const {addLog, deleteLog, updateLog} = LogSlice.actions;
export default LogSlice.reducer;
    import {Staff} from "../models/Staff";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState : Staff[] = [{
    staffId: "STF001",
    firstName: "John",
    lastName : "Doe",
    designation: "Manager",
    joinDate: "2021-10-01",
    dob: "1990-01-01",
    gender: "MALE",
    contactNo: "1234567890",
    email: "John@gmail.com",
    Address: "123, Main Street, New York",
    role: "MANAGER"
},
    {
        staffId: "STF002",
        firstName: "Jane",
        lastName : "Doe",
        designation: "Scientist",
        joinDate: "2021-10-01",
        dob: "1990-01-01",
        gender: "FEMALE",
        contactNo: "1234567890",
        email: "Jane@gmail.com",
        Address: " New York",
        role: "SCIENTIST"
    },
    {
        staffId: "STF003",
        firstName: "Alice",
        lastName : "Doe",
        designation: "Administrative",
        joinDate: "2021-10-01",
        dob: "1990-01-01",
        gender: "Female",
        contactNo: "1234567890",
        email: "Alice@gmail.com",
        Address: "Colombo",
        role: "ADMINISTRATIVE"
    },
]

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        saveStaff(state, action : PayloadAction<Staff>){
            state.push(action.payload)
        } ,
        updateStaff(state, action: PayloadAction<Staff>) {
            const index = state.findIndex(staff => staff.staffId === action.payload.staffId);
            if (index !== -1) {
                state[index] = action.payload; // ✅ Mutate state directly (Immer handles immutability)
            }
        }
        ,
        deleteStaff(state, action : PayloadAction<string>){
            return state.filter((staff: Staff) => staff.staffId !== action.payload)
        }
    }
})

export const {saveStaff , updateStaff , deleteStaff} = staffSlice.actions
export default staffSlice.reducer
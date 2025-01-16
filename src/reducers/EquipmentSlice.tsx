// @ts-ignore
import {createSlice} from "@reduxjs/toolkit";

export const initialState=[];

const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {
        addEquipment: (state, action) => {
            state.push(action.payload)
        },
        deleteEquipment: (state, action) => {
            return state.filter(equipment=> equipment.equipmentId !== action.payload);
        },
        updateEquipment:(state,action)=>{
            const index = state.findIndex(equipment=> equipment.equipmentId === action.payload.equipmentId);
            if(index !== -1){
                state[index] = action.payload;
            }
        },
    },
});

export const {addEquipment, deleteEquipment,updateEquipment} = equipmentSlice.actions;
export default equipmentSlice.reducer;

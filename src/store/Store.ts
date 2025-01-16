import { configureStore } from "@reduxjs/toolkit";
import CropSlice from "../reducers/CropSlice.tsx";
import EquipmentSlice from "../reducers/EquipmentSlice.tsx";
import FieldSlice from "../reducers/FieldSlice.tsx";
import StaffSlice from "../reducers/StaffSlice.tsx";
import VehicleSlice from "../reducers/VehicleSlice.tsx";

const store = configureStore({
    reducer: {
        field: FieldSlice,
        crop: CropSlice,
        equipment: EquipmentSlice,
        vehicle: VehicleSlice,
        staff: StaffSlice,
    },
});


export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

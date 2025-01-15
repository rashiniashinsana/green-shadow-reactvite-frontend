import CropSlice from "../reducers/CropSlice.tsx";
import {configureStore} from "@reduxjs/toolkit";




const store = configureStore({
    reducer: {
        crop: CropSlice
    }
});

export default store;
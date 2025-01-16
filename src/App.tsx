import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {Dashboard} from "./pages/Dashboard";

import {RootLayout} from "./components/RootLayout";
import {CropPage} from "./pages/CropPage.tsx";
import {EquipmentPage} from "./pages/EquipmentPage.tsx";
import {StaffPage} from "./pages/StaffPage.tsx";
import {VehiclePage} from "./pages/VehiclePage.tsx";
import {FieldPage} from "./pages/FieldPage.tsx";
import {NotFoundPage} from "./pages/NotFoundPage.tsx";
// @ts-ignore
import React from "react";


function App() {

    const routes = createBrowserRouter([
        {
            path: '',
            element: <RootLayout/>,
            children: [
                {path: '', element: <Dashboard/>},
                {path: '/field', element:<FieldPage/>},
                {path: '/crop', element: <CropPage/>},
                {path: '/equipment', element: <EquipmentPage/>},
                {path: '/vehicle',element:<VehiclePage/>},
                {path: '/staff',element: <StaffPage/>},
            ]
        },
        {
            path: "*",
            element:<NotFoundPage/>
        }
    ])

    return (
        <>
            <RouterProvider router={routes}/>

        </>
    );
}

export default App

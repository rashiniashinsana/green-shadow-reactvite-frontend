import './App.css'
// import {ToastContainer} from "react-toastify";
import { createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import CropWall from "./components/Wall/CropWall.tsx";
import {NotFoundPage} from "./pages/NotFoundPage.tsx";
import StaffWall from "./components/Wall/StaffWall.tsx";
import VehicleWall from "./components/Wall/VehicleWall.tsx";
import FieldWall from "./components/Wall/FieldWall.tsx";
import EquipmentWall from "./components/Wall/EquipmentWall.tsx";
import CropDataWall from "./components/Wall/CropDataWall.tsx";

function App() {

    const routes = createBrowserRouter([
        {
            path: '',
            element: <RootLayout/>,
            children: [
                {path: '', element: <Dashboard/>},
                {path: '/field', element:<FieldWall/>},
                {path: '/crop', element: <CropWall/>},
                {path: '/equipment', element: <EquipmentWall/>},
                {path: '/vehicle',element:<VehicleWall/>},
                {path: '/staff',element: <StaffWall/>},
                {path: '/cropdetails',element: <CropDataWall/>}
            ]
        },
        {
            path: "*",
            element:<NotFoundPage/>
        }
    ])

    return (
        <>
            <>
                <RouterProvider router={routes}/>

            </>

            {/*<ToastContainer />*/}
            {/*<BrowserRouter>*/}
            {/*    <Routes>*/}
            {/*        /!*<Route path="/" element={<LoginPage/>} />*!/*/}
            {/*        /!*<Route path="/register" element={<RegisterPage />} />*!/*/}

            {/*        <Route path="/dashboard" element={ <RootLayout /> } >*/}
            {/*            <Route path="home" element={ <Dashboard /> } />*/}
            {/*            <Route path="staff_management" element={ <StaffWall /> } />*/}
            {/*            <Route path="vehicle_management" element={ <VehicleWall /> } />*/}
            {/*            <Route path="field_management" element={ <FieldWall /> } />*/}
            {/*            <Route path="equ_management" element={ <EquipmentWall /> } />*/}
            {/*            <Route path="crop_management" element={ <CropWall /> } />*/}
            {/*            <Route path="monitor_log" element={ <CropDataWall /> } />*/}
            {/*            <Route path="*" element={ <NotFoundPage /> } />*/}
            {/*        </Route>*/}
            {/*    </Routes>*/}
            {/*</BrowserRouter>*/}
        </>
    );
}

export default App

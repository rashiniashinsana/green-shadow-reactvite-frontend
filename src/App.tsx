import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {Dashboard} from "./pages/Dashboard";
import {CropPage} from "./pages/CropPage.tsx";
//
// import {EquipmentPage} from "./pages/EquipmentPage.tsx";
// import {Staff} from "./pages/Staff.tsx";
// import {FeildPage} from "./pages/FeildPage.tsx";
import {RootLayout} from "./components/RootLayout";
import {EquipmentPage} from "./pages/EquipmentPage.tsx";

function App() {

    const routes = createBrowserRouter([
        {
            path: '',
            element: <RootLayout/>,
            children: [
                {path: '', element: <Dashboard/>},
                {path: '/crop', element: <CropPage/>},
                {path: '/equipment', element: <EquipmentPage/>}

            ]
        },
    ])

    return (
        <>
            <RouterProvider router={routes}/>

        </>
    );
}

export default App

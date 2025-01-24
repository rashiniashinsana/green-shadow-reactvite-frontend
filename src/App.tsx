import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./components/RootLayout.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import CropWall from "./components/Wall/CropWall.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import StaffWall from "./components/Wall/StaffWall.tsx";
import VehicleWall from "./components/Wall/VehicleWall.tsx";
import FieldWall from "./components/Wall/FieldWall.tsx";
import EquipmentWall from "./components/Wall/EquipmentWall.tsx";
import CropDataWall from "./components/Wall/CropDataWall.tsx";
import LogInPage from "./pages/LogInPage.tsx";
import RegisterPage from "./pages/SignUpPage.tsx";

function App() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <LogInPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
        {
            path: "/home",
            element: <RootLayout />,
            children: [
                { path: "dashboard", element: <Dashboard /> },
                { path: "field", element: <FieldWall /> },
                { path: "crop", element: <CropWall /> },
                { path: "equipment", element: <EquipmentWall /> },
                { path: "vehicle", element: <VehicleWall /> },
                { path: "staff", element: <StaffWall /> },
                { path: "cropdetails", element: <CropDataWall /> },
                { path: "logout", element: <LogInPage /> },
            ],
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ]);

    return <RouterProvider router={routes} />;
}

export default App;

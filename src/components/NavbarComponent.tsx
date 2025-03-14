import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/UserSlice";

export function NavbarComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());  // Clear user data
        navigate("/");  // Navigate to the login page
    };

    return (
        <header className="bg-gradient-to-r from-green-600 to-emerald-300 shadow-lg w-56 fixed h-screen">
            <div className="flex flex-col items-center">
                <img
                    src="/src/assets/logowithoutbg.png"
                    alt="Green Shadow Logo"
                    className="w-16 h-16"
                />
                <h1 className="text-white font-bold mt-4">Green Shadow</h1>
                <div className="bg-white w-full py-4 mt-6 text-center rounded-lg">
                    <h2 className="text-green-600">Rashini Vithanage</h2>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="text-sm font-medium">Manager</p>
                </div>
            </div>
            <nav className="container mx-auto p-4 -mt-2.5">
                <ul className="mt-5">
                    <li className="px-4 mt-5">
                        <Link
                            to="dashboard"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="field"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl"
                        >
                            Field
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="crop"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl"
                        >
                            Crop
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="equipment"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl"
                        >
                            Equipment
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="vehicle"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl"
                        >
                            Vehicle
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="staff"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl"
                        >
                            Staff
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="cropdetails"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl"
                        >
                            Crop Details
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <button
                            onClick={handleLogout}
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl"
                        >
                            Log Out
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

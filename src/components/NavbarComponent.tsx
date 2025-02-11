import { Link } from "react-router-dom";

export function NavbarComponent() {
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
                    <h2 className=" text-green-600 ">Rashini Vithanage</h2>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="text-sm font-medium">Manager</p>
                </div>
            </div>
            <nav className="container mx-auto p-4 -mt-2.5">
                <ul className="mt-5">
                    <li className="px-4 mt-5">
                        <Link
                            to="dashboard"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-100 font-medium text-m  text-center me-2 mb-2 "
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="field"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-100 font-medium text-m  text-center me-2 mb-2 "  >
                            Field
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="crop"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-100 font-medium text-m  text-center me-2 mb-2 "  >
                            Crop
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="equipment"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-100 font-medium text-m  text-center me-2 mb-2 "  >
                            Equipment
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="vehicle"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-100 font-medium text-m  text-center me-2 mb-2 ">
                            Vehicle
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="staff"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-100 font-medium text-m  text-center me-2 mb-2 " >
                            Staff
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="cropdetails"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-100 font-medium text-m  text-center me-2 mb-2 " >
                            Crop Details
                        </Link>
                    </li>
                    <li className="px-4 mt-5">
                        <Link
                            to="logout"
                            className="text-slate-50 flex px-4 py-2 w-40 rounded hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-100 font-medium text-m  text-center me-2 mb-2 ">
                            Log Out
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

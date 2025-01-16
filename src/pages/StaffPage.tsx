import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {addStaff, deleteStaff, updateStaff} from "../reducers/StaffSlice.tsx";

export const StaffPage = () => {

        const [id, setId] = useState<number>(0);
        const [firstName, setFirstName] = useState<string>("");
        const [lastName, setLastName] = useState<string>("");
        const [designation, setDesignation] = useState<string>("");
        const [gender, setGender] = useState<string>("");
        const [joinDate, setJoinDate] = useState<string>("");
        const [DOB, setDOB] = useState<string>("");
        const [addressLine1, setAddressLine1] = useState<string>("");
        const [addressLine2, setAddressLine2] = useState<string>("");
        const [addressLine3, setAddressLine3] = useState<string>("");
        const [addressLine4, setAddressLine4] = useState<string>("");
        const [addressLine5, setAddressLine5] = useState<string>("");
        const [contactNo, setContactNo] = useState<string>("");
        const [email, setEmail] = useState<string>("");
        const [role, setRole] = useState<string>("");

        const [showSaveModal, setShowSaveModal] = useState(false);
        const [showUpdateModal, setShowUpdateModal] = useState(false);
        const [showDeleteModal, setShowDeleteModal] = useState(false);
        const [showViewModal, setShowViewModal] = useState(false);

        const dispatch = useDispatch();
        const navigate = useNavigate();

        // Save Staff
        function handleSaveSubmit() {
            const newStaff = {
                id, firstName, lastName, designation, gender, joinDate, DOB,
                addressLine1, addressLine2, addressLine3, addressLine4, addressLine5,
                contactNo, email, role
            };
            dispatch(addStaff(newStaff));
            window.alert("Staff saved successfully!");
            setShowSaveModal(false);
            resetForm();
            navigate('/staff');
        }

        // Update Staff
        function handleUpdateSubmit() {
            const updatedStaff = {
                id, firstName, lastName, designation, gender, joinDate, DOB,
                addressLine1, addressLine2, addressLine3, addressLine4, addressLine5,
                contactNo, email, role
            };
            dispatch(updateStaff(updatedStaff)); // Dispatching action to update staff
            setShowUpdateModal(false);
            resetForm();
            navigate('/staff'); // Navigate to staff list page after updating
        }

        // Delete Staff
        function handleDeleteSubmit() {
            if (window.confirm('Are you sure you want to delete this staff?')) {
                dispatch(deleteStaff(id)); // Dispatching action to delete staff
                setShowDeleteModal(false);
                navigate('/staff'); // Navigate to staff list page after deletion
            }
        }

        function resetForm() {
            setId(0);
            setFirstName("");
            setLastName("");
            setDesignation("");
            setGender("");
            setJoinDate("");
            setDOB("");
            setAddressLine1("");
            setAddressLine2("");
            setAddressLine3("");
            setAddressLine4("");
            setAddressLine5("");
            setContactNo("");
            setEmail("");
            setRole("");
        }
        function popUpSave() {
            setShowSaveModal(true);
        }

        function closeSaveModal() {
            setShowSaveModal(false);
        }

        function popUpUpdate() {
            setShowUpdateModal(true);
        }

        function closeUpdateModal() {
            setShowUpdateModal(false);
        }

        function popUpDelete() {
            setShowDeleteModal(true);
        }

        function closeDeleteModal() {
            setShowDeleteModal(false);
        }

        function popUpView() {
            setShowViewModal(true);
        }

        function closeViewModal() {
            setShowViewModal(false);
        }

        return (
            <>
                <header>
                    <h2 className="font-sans text-4xl text-lime-700 mb-6">Staff
                        Management</h2>
                </header>

                <button
                    className="bg-gradient-to-r from-lime-500 to-emerald-700 hover:from-emerald-800 hover:to-lime-500 mb-6 p-3 rounded"
                    onClick={popUpSave}
                >
                    Add Staff
                </button>

                {/* Save Staff Modal */}
                {showSaveModal && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                            <h3 className="text-2xl font-bold text-green-600 mb-6">Add Staff</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium text-gray-700">Staff ID</label>
                                    <input
                                        type="number"
                                        value={id}
                                        onChange={(e) => setId(Number(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                        placeholder="Enter Staff ID"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                        placeholder="Enter First Name"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                        placeholder="Enter Last Name"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700">Designation</label>
                                    <input
                                        type="text"
                                        value={designation}
                                        onChange={(e) => setDesignation(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                        placeholder="Enter Designation"
                                    />
                                </div>

                                {/* Gender */}
                                <fieldset className="w-full px-4 py-3 border border-gray-300 rounded-md focus-within:ring focus-within:ring-green-500">
                                    <legend className="font-medium text-gray-700 px-2">Gender</legend>

                                    <div className="flex items-center space-x-4 mt-2">
                                        <div className="flex items-center">
                                            <input
                                                id="male"
                                                className="hidden peer"
                                                type="radio"
                                                name="gender"
                                                defaultChecked
                                            />
                                            <label
                                                htmlFor="male"
                                                className="cursor-pointer px-3 py-2 border border-gray-300 rounded-md text-gray-700 peer-checked:bg-green-100 peer-checked:border-green-500 peer-checked:text-green-700"
                                            >
                                                Male
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                id="female"
                                                className="hidden peer"
                                                type="radio"
                                                name="gender"
                                            />
                                            <label
                                                htmlFor="female"
                                                className="cursor-pointer px-3 py-2 border border-gray-300 rounded-md text-gray-700 peer-checked:bg-green-100 peer-checked:border-green-500 peer-checked:text-green-700"
                                            >
                                                Female
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                id="other"
                                                className="hidden peer"
                                                type="radio"
                                                name="gender"
                                            />
                                            <label
                                                htmlFor="other"
                                                className="cursor-pointer px-3 py-2 border border-gray-300 rounded-md text-gray-700 peer-checked:bg-green-100 peer-checked:border-green-500 peer-checked:text-green-700"
                                            >
                                                Other
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>

                                <div>
                                    <label className="block font-medium text-gray-700">Join Date</label>
                                    <input
                                        type="date"
                                        value={joinDate}
                                        onChange={(e) => setJoinDate(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={DOB}
                                        onChange={(e) => setDOB(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    />
                                </div>
                                {/* More fields as necessary */}
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                                    onClick={closeSaveModal}>
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                    onClick={handleSaveSubmit}>
                                Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Update Staff Input Component */}
                {showUpdateModal && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                            <h3 className="text-2xl font-bold text-green-600 mb-6">Update Staff</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium text-gray-700">ID</label>
                                    <input
                                        type="number"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700">FirstName</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700">LastName</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Designation</label>
                                <input
                                    type="text"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Gender</label>
                                <input
                                    type="text"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Joined Date</label>
                                <input
                                    type="datetime-local"
                                    value={joinDate}
                                    onChange={(e) => setJoinDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">DOB</label>
                                <input
                                    type="date"
                                    value={DOB}
                                    onChange={(e) => setDOB(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">AddressLine1</label>
                                <input
                                    type="text"
                                    value={addressLine1}
                                    onChange={(e) => setAddressLine1(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">AddressLine2</label>
                                <input
                                    type="text"
                                    value={addressLine2}
                                    onChange={(e) => setAddressLine2(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">AddressLine3</label>
                                <input
                                    type="text"
                                    value={addressLine3}
                                    onChange={(e) => setAddressLine3(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">AddressLine4</label>
                                <input
                                    type="text"
                                    value={addressLine4}
                                    onChange={(e) => setAddressLine4(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">AddressLine5</label>
                                <input
                                    type="text"
                                    value={addressLine5}
                                    onChange={(e) => setAddressLine5(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">ContactNo</label>
                                <input
                                    type="number"
                                    value={contactNo}
                                    onChange={(e) => setContactNo(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Role</label>
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>

                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                                onClick={closeUpdateModal}>
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handleUpdateSubmit}>
                            Update
                            </button>
                        </div>
                    </div>

                )}

                {/* Delete Staff Input Component */
                }
                {
                    showDeleteModal && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                                <h3 className="text-2xl font-bold text-red-600 mb-6">Delete Staff</h3>
                                <p className="text-lg mb-6">Are you sure you want to delete this staff member?</p>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                        onClick={closeDeleteModal}>
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={handleDeleteSubmit}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

                {/* Staff View Modal */}
                {showViewModal && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl mx-4">
                            {/* Staff View Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-green-600">View Staff</h3>
                                <button
                                    className="text-green-600 hover:text-red-500 text-xl font-bold"
                                    onClick={closeViewModal}
                                >
                                    ×
                                </button>
                            </div>

                            {/* Staff Details Content */}
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block font-medium text-gray-700">Staff ID</label>
                                    <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                        {id || "N/A"}
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700">Full Name</label>
                                    <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                        {firstName && lastName ? `${firstName} ${lastName}` : "N/A"}
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700">Designation</label>
                                    <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                        {designation || "N/A"}
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700">Gender</label>
                                    <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                        {gender || "N/A"}
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700">Join Date</label>
                                    <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                        {joinDate || "N/A"}
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700">Date of Birth (DOB)</label>
                                    <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                        {DOB || "N/A"}
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700">Address</label>
                                    <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                        {addressLine1 || "N/A"}, {addressLine2 || "N/A"}, {addressLine3 || "N/A"},
                                        {addressLine4 || "N/A"}, {addressLine5 || "N/A"}
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700">Contact Number</label>
                                    <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                        {contactNo || "N/A"}
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700">Email</label>
                                    <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                        {email || "N/A"}
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700">Role</label>
                                    <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                        {role || "N/A"}
                                    </div>
                                </div>
                            </div>

                            {/* Close Button */}
                            <div className="flex justify-end">
                                <button
                                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
                                    onClick={closeViewModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                        <thead className="bg-h14 bg-gradient-to-r from-green-600 to-cyan-600 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Staff Code</th>
                            <th className="px-4 py-2 text-left">Staff Name</th>
                            <th className="px-4 py-2 text-left">Position</th>
                            <th className="px-4 py-2 text-left">Gender</th>
                            <th className="px-4 py-2 text-left">Date of Birth</th>
                            <th className="px-4 py-2 text-left">Join Date</th>
                            <th className="px-4 py-2 text-left">Contact</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* Example Staff Row */}
                        <tr className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{id || "S001"}</td>
                            <td className="border px-4 py-2">{`${firstName || "John"} ${lastName || "Doe"}`}</td>
                            <td className="border px-4 py-2">{designation || "Manager"}</td>
                            <td className="border px-4 py-2">{gender || "Male"}</td>
                            <td className="border px-4 py-2">{DOB || "01/01/1990"}</td>
                            <td className="border px-4 py-2">{joinDate || "01/01/2020"}</td>
                            <td className="border px-4 py-2">{contactNo || "+1 555-1234"}</td>
                            <td className="border px-4 py-2">{email || "john.doe@example.com"}</td>
                            <td className="border px-4 py-2">{role || "Admin"}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 size-10"
                                    onClick={popUpView} // Ensure you pass staff data to the popup
                                >
                                    View
                                </button>
                                <button
                                    className="text-xs px-1 py-1 bg-green-500 text-white rounded hover:bg-green-600 ml-2 size-10"
                                    onClick={popUpUpdate} // Ensure you pass staff data to the update popup
                                >
                                    Update
                                </button>
                                <button
                                    className="text-xs px-1 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2 size-10"
                                    onClick={popUpDelete} // Ensure you pass staff data to the delete function
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>


            </>
        );
};
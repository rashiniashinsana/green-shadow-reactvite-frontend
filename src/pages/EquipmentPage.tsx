import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Equipment} from "../models/Equipment.ts";
// @ts-ignore
import {CropInputComponent} from "../components/crop/CropInputComponent.tsx";
import {addEquipment,updateEquipment,deleteEquipment} from "../reducers/EquipmentSlice.tsx";


export function EquipmentPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [equipmentId, setEquipmentId] = useState("");
    const [equipmentName, setEquipmentName] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [status, setStatus] = useState("");
    const [fieldCode, setFieldCode] = useState("");
    const [staffId, setStaffId] = useState("");


    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModel, setShowViewModel] = useState(false);

    // Save Equipment
    function handleSaveSubmit(){
        const newEquipment = new Equipment(equipmentId,equipmentName,equipmentType,status,fieldCode,staffId);
        dispatch(addEquipment(newEquipment));
        window.alert("Equipment saved successfully.");
        setShowSaveModal(false);
        navigate('/equipment');
    }

    //Update Equipment
    function handleUpdateSubmit(){
        const updatedEquipment = new Equipment(equipmentId,equipmentName,equipmentType,status,fieldCode,staffId);
        dispatch(updateEquipment(updatedEquipment));
        window.alert("Equipment updated successfully");
        setShowSaveModal(false);
        navigate('/equipment');
    }

    //Delete Equipment
    function handleDeleteSubmit(){
        if (window.confirm("Are you sure you want to delete this Equip?")){
            dispatch(deleteEquipment(equipmentId));
            setShowDeleteModal(false);
            navigate('/equipment');
        }
    }


    // CropInputComponent Show/Hide Functions
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
        setShowViewModel(true);
    }

    function closeViewModal() {
        setShowViewModel(false);
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <header>
                <h2 className="font-sans text-4xl text-lime-700 mb-6">Equipment Management</h2>
            </header>

            <button
                className="bg-gradient-to-r from-lime-500 to-emerald-700 hover:from-emerald-800 hover:to-lime-500 mb-6 p-3 rounded p-3 rounded"
                onClick={popUpSave}
            >
                Add Equipment
            </button>

            {/* Save CropInputComponent */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                        <h3 className="text-2xl font-bold text-green-600 mb-6">Add Equipment</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-gray-700">Equipment ID</label>
                                <input
                                    type="text"
                                    value={equipmentId}
                                    onChange={(e) => setEquipmentId(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Equipment ID"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Equipment Name</label>
                                <input
                                    type="text"
                                    value={equipmentName}
                                    onChange={(e) => setEquipmentName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Equipment Name"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Equipment Type</label>
                                <input
                                    type="text"
                                    value={equipmentType}
                                    onChange={(e) => setEquipmentType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Equipment Type"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Status</label>
                                <input
                                    type="text"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Status"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Field Code</label>
                                <input
                                    type="text"
                                    value={fieldCode}
                                    onChange={(e) => setFieldCode(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Field Code"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Staff ID</label>
                                <input
                                    type="text"
                                    value={staffId}
                                    onChange={(e) => setStaffId(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter StaffPage ID"
                                />
                            </div>
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

            {/* Update CropInputComponent */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                        <h3 className="text-2xl font-bold text-green-600 mb-6">Update Equipment</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-gray-700">Equipment ID</label>
                                <input
                                    type="text"
                                    value={equipmentId}
                                    onChange={(e) => setEquipmentId(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Equipment Name</label>
                                <input
                                    type="text"
                                    value={equipmentName}
                                    onChange={(e) => setEquipmentName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Equipment Type</label>
                                <input
                                    type="text"
                                    value={equipmentType}
                                    onChange={(e) => setEquipmentType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Status</label>
                                <input
                                    type="text"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Field Code</label>
                                <input
                                    type="text"
                                    value={fieldCode}
                                    onChange={(e) => setFieldCode(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">StaffPage ID</label>
                                <input
                                    type="text"
                                    value={staffId}
                                    onChange={(e) => setStaffId(e.target.value)}
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
                </div>
            )}

            {/* Delete CropInputComponent */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                        <h3 className="text-2xl font-bold text-red-600 mb-6">Delete Equipment</h3>
                        <p className="text-lg mb-6">Are you sure you want to delete this equipment?</p>
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
            )}


            {/* Equipment View CropInputComponent */}
            {showViewModel && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl mx-4">
                        {/* CropInputComponent Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-green-600">View Equipment</h3>
                            <button
                                className="text-green-600 hover:text-red-500 text-xl font-bold"
                                onClick={closeViewModal}
                            >
                                ×
                            </button>
                        </div>

                        {/* CropInputComponent Content */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block font-medium text-gray-700">Equipment ID</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {equipmentId || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Equipment Name</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {equipmentName || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Equipment Type</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {equipmentType || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Status</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {status || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Field Code</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {fieldCode || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">StaffPage ID</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {staffId || "N/A"}
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
                    <thead className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Equipment ID</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Field Code</th>
                        <th className="px-4 py-2 text-left">Staff ID</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100" key={equipmentId}>
                            <td className="border px-4 py-2">{equipmentId}</td>
                            <td className="border px-4 py-2">{equipmentName}</td>
                            <td className="border px-4 py-2">{equipmentType}</td>
                            <td className="border px-4 py-2">{status}</td>
                            <td className="border px-4 py-2">{fieldCode}</td>
                            <td className="border px-4 py-2">{staffId}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="px-5 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => {
                                        popUpView();
                                    }}
                                >
                                    View
                                </button>
                                <button
                                    className="px-5 py-1 bg-green-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => {
                                        popUpUpdate();
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="px-5 py-1 bg-red-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => {
                                        popUpDelete();
                                    }}
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

}
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addVehicle, updateVehicle, deleteVehicle } from '../reducers/VehicleSlice.tsx'; // Adjust imports for actions

export function VehiclePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [vehicleCode, setVehicleCode] = useState("");
    const [licensePlateNumber, setLicensePlateNumber] = useState("");
    const [vehicleCategory, setVehicleCategory] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");
    const [staffId, setStaffId] = useState("");

    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    // @ts-ignore
    const vehicles = useSelector((state) => state.vehicle); // Adjust the state for vehicles

    // Save Vehicle
    function handleSaveSubmit() {
        const newVehicle = {
            vehicleCode,
            licensePlateNumber,
            vehicleCategory,
            fuelType,
            status,
            remarks,
            staffId
        };
        dispatch(addVehicle(newVehicle)); // Dispatch action to save vehicle
        window.alert("Vehicle saved successfully!");
        setShowSaveModal(false);
        resetForm();
        navigate('/vehicle'); // Navigate to vehicle list page after saving
    }

    // Update Vehicle
    function handleUpdateSubmit() {
        const updatedVehicle = {
            vehicleCode,
            licensePlateNumber,
            vehicleCategory,
            fuelType,
            status,
            remarks,
            staffId
        };
        dispatch(updateVehicle(updatedVehicle)); // Dispatch action to update vehicle
        setShowUpdateModal(false);
        resetForm();
        navigate('/vehicle'); // Navigate to vehicle list page after updating
    }

    // Delete Vehicle
    function handleDeleteSubmit() {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            dispatch(deleteVehicle(vehicleCode)); // Dispatch action to delete vehicle
            setShowDeleteModal(false);
            navigate('/vehicle'); // Navigate to vehicle list page after deletion
        }
    }

    // Reset Form Fields
    function resetForm() {
        setVehicleCode("");
        setLicensePlateNumber("");
        setVehicleCategory("");
        setFuelType("");
        setStatus("");
        setRemarks("");
        setStaffId("");
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
        setShowViewModal(true);
    }

    function closeViewModal() {
        setShowViewModal(false);
    }

    return (
        <>
            <header>
                <h2 className="font-sans text-4xl text-lime-700 mb-6">Vehicle
                    Management</h2>
            </header>

            <button
                className="bg-gradient-to-r from-lime-500 to-emerald-700 hover:from-emerald-800 hover:to-lime-500 mb-6 p-3 rounded"
                onClick={popUpSave}
            >
                Add Vehicle
            </button>

            {/* Save Vehicle Modal */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                        <h3 className="text-2xl font-bold text-green-600 mb-6">Add Vehicle</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-gray-700">Vehicle Code</label>
                                <input
                                    type="text"
                                    value={vehicleCode}
                                    onChange={(e) => setVehicleCode(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Vehicle Code"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">License Plate Number</label>
                                <input
                                    type="text"
                                    value={licensePlateNumber}
                                    onChange={(e) => setLicensePlateNumber(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter License Plate Number"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Vehicle Category</label>
                                <input
                                    type="text"
                                    value={vehicleCategory}
                                    onChange={(e) => setVehicleCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Vehicle Category"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Fuel Type</label>
                                <input
                                    type="text"
                                    value={fuelType}
                                    onChange={(e) => setFuelType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Fuel Type"
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
                                <label className="block font-medium text-gray-700">Remarks</label>
                                <textarea
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Remarks"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Staff ID</label>
                                <input
                                    type="text"
                                    value={staffId}
                                    onChange={(e) => setStaffId(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Staff ID"
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

            {/* Update Vehicle Modal */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                        <h3 className="text-2xl font-bold text-blue-600 mb-6">Update Vehicle</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-gray-700">Vehicle Code</label>
                                <input
                                    type="text"
                                    value={vehicleCode}
                                    onChange={(e) => setVehicleCode(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">License Plate Number</label>
                                <input
                                    type="text"
                                    value={licensePlateNumber}
                                    onChange={(e) => setLicensePlateNumber(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Vehicle Category</label>
                                <input
                                    type="text"
                                    value={vehicleCategory}
                                    onChange={(e) => setVehicleCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Fuel Type</label>
                                <input
                                    type="text"
                                    value={fuelType}
                                    onChange={(e) => setFuelType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Status</label>
                                <input
                                    type="text"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Remarks</label>
                                <textarea
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Staff ID</label>
                                <input
                                    type="text"
                                    value={staffId}
                                    onChange={(e) => setStaffId(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
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

            {/* Delete Vehicle Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                        <h3 className="text-2xl font-bold text-red-600 mb-6">Delete Vehicle</h3>
                        <p className="text-lg mb-6">Are you sure you want to delete this vehicle?</p>
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
            {/* View Vehicle Modal */}
            {showViewModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl mx-4">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-green-600">View Vehicle</h3>
                            <button
                                className="text-green-600 hover:text-red-500 text-xl font-bold"
                                onClick={closeViewModal}
                            >
                                ×
                            </button>
                        </div>

                        {/* Vehicle Details */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block font-medium text-gray-700">Vehicle Code</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {vehicleCode || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">License Plate Number</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {licensePlateNumber || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Vehicle Category</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {vehicleCategory || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Fuel Type</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {fuelType || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Status</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {status || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Remarks</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {remarks || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Staff ID</label>
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
                    <thead className="bg-gradient-to-r from-green-600 to-cyan-600 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Vehicle Code</th>
                        <th className="px-4 py-2 text-left">License Plate</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Fuel Type</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="hover:bg-gray-100">
                        <td className="border px-4 py-2">V1234</td>
                        <td className="border px-4 py-2">ABC-123</td>
                        <td className="border px-4 py-2">Truck</td>
                        <td className="border px-4 py-2">Diesel</td>
                        <td className="border px-4 py-2">Active</td>
                        <td className="border px-4 py-2">
                            <button
                                className="px-5 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={popUpView}
                            >
                                View
                            </button>
                            <button
                                className="px-5 py-1 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
                                onClick={popUpUpdate}
                            >
                                Update
                            </button>
                            <button
                                className="px-5 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                                onClick={popUpDelete}
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
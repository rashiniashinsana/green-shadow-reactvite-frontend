import { useNavigate } from "react-router";
import { useState } from "react";
import { Crop } from "../models/Crop.ts";
import { addCrop, updateCrop, deleteCrop } from "../reducers/CropSlice.tsx";
import { useDispatch, useSelector } from "react-redux";
import {CropInputComponent} from "../components/crop/CropInputComponent.tsx";
import {CropTableComponent} from "../components/crop/CropTableComponent.tsx";

export function CropPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [cropCode, setCropCode] = useState("");
    const [cropCommonName, setCropCommonName] = useState("");
    const [cropScientificName, setCropScientificName] = useState("");
    const [cropImage, setCropImage] = useState("");
    const [category, setCategory] = useState("");
    const [cropSeason, setCropSeason] = useState("");
    const [fieldCode, setFieldCode] = useState("");

    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);


    // @ts-ignore
    const crops = useSelector((state) => state.crop);

        // Save Crop
    function handleSaveSubmit() {
        const newCrop = new Crop(cropCode, cropCommonName, cropScientificName, cropImage, category, cropSeason, fieldCode);
        dispatch(addCrop(newCrop));
        window.alert("Crop saved successfully!");
        setShowSaveModal(false);
        resetForm();
        navigate('/crop');
    }

    // Update Crop
    function handleUpdateSubmit() {
        const updatedCrop = new Crop(cropCode, cropCommonName, cropScientificName, cropImage, category, cropSeason, fieldCode);
        dispatch(updateCrop(updatedCrop)); // Dispatching action to update crop
        setShowUpdateModal(false);
        resetForm();
        navigate('/crop'); // Navigate to crop list page after updating
    }

    // Delete Crop
    function handleDeleteSubmit() {
        if (window.confirm('Are you sure you want to delete this crop?')) {
            dispatch(deleteCrop(cropCode)); // Dispatching action to delete crop
            setShowDeleteModal(false);
            navigate('/crop'); // Navigate to crop list page after deletion
        }
    }

    function resetForm() {
        setCropCode("");
        setCropCommonName("");
        setCropScientificName("");
        setCropImage("");
        setCategory("");
        setCropSeason("")
        setFieldCode("");
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
                <h2 className="font-sans text-4xl  mb-6 text-transparent bg-clip-text bg-gradient-to-r to-cyan-200 from-lime-700">Crop Management</h2>
            </header>

            <button
                className="bg-gradient-to-r from-lime-500 to-emerald-700 hover:from-emerald-800 hover:to-lime-500 mb-6 p-3 rounded"
                onClick={popUpSave}
            >
                Add Crop
            </button>

            {/* Save CropInputComponent */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                        <h3 className="text-2xl font-bold text-green-600 mb-6">Add Crop</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium text-gray-700">Crop Code</label>
                                    <input
                                        type="text"
                                        value={cropCode}
                                        onChange={(e) => setCropCode(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                        placeholder="Enter Crop Code"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700">Crop Common Name</label>
                                    <input
                                        type="text"
                                        value={cropCommonName}
                                        onChange={(e) => setCropCommonName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                        placeholder="Enter Crop Common Name"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700">Crop Scientific Name</label>
                                    <input
                                        type="text"
                                        value={cropScientificName}
                                        onChange={(e) => setCropScientificName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                        placeholder="Enter Crop Scientific Name"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700">Crop Image (PNG or JPEG)</label>
                                    <input
                                        type="file"
                                        accept=".png, .jpeg, .jpg"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                setCropImage(e.target.files[0]); // Correctly accessing the first file
                                            }
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700">Crop Category</label>
                                    <input
                                        type="text"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                        placeholder="Enter Crop Category"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700">Crop Season</label>
                                    <input
                                        type="text"
                                        value={cropSeason}
                                        onChange={(e) => setCropSeason(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                        placeholder="Enter Crop Season"
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
                        <h3 className="text-2xl font-bold text-green-600 mb-6">Update Crop</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-gray-700">Crop Code</label>
                                <input
                                    type="text"
                                    value={cropCode}
                                    onChange={(e) => setCropCode(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Crop Common Name</label>
                                <input
                                    type="text"
                                    value={cropCommonName}
                                    onChange={(e) => setCropCommonName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Crop Scientific Name</label>
                                <input
                                    type="text"
                                    value={cropScientificName}
                                    onChange={(e) => setCropScientificName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Crop Image (PNG or JPEG)</label>
                                <input
                                    type="file"
                                    accept=".png, .jpeg, .jpg"
                                    onChange={(e) => setCropImage(e.target.files[0])}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Crop Category</label>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Crop Season</label>
                                <input
                                    type="text"
                                    value={cropSeason}
                                    onChange={(e) => setCropSeason(e.target.value)}
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
                        <h3 className="text-2xl font-bold text-red-600 mb-6">Delete Crop</h3>
                        <p className="text-lg mb-6">Are you sure you want to delete this crop?</p>
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
            {/* Crop View CropInputComponent */}
            {showViewModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl mx-4">
                        {/* CropInputComponent Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-green-600">View Crop</h3>
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
                                <label className="block font-medium text-gray-700">Crop Code</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {cropCode || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Crop Scientific Name</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {cropScientificName || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Crop Common Name</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {cropCommonName || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Crop Season</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {cropSeason || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Crop Category</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {category || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Field ID</label>
                                <div className="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                    {fieldCode || "N/A"}
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="flex justify-center mb-6">
                            {cropImage ? (
                                <img
                                    src={cropImage}
                                    alt={cropCommonName || "Crop Image"}
                                    className="w-full h-56 object-cover rounded-lg shadow-lg border"
                                />
                            ) : (
                                <p className="text-gray-500 text-center">No image available</p>
                            )}
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
                        <th className="px-4 py-2 text-left">Code</th>
                        <th className="px-4 py-2 text-left">Common Name</th>
                        <th className="px-4 py-2 text-left">Scientific Name</th>
                        <th className="px-4 py-2 text-left">Image</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Crop Season</th>
                        <th className="px-4 py-2 text-left">Field Code</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="hover:bg-gray-100">
                        <td className="border px-4 py-2">C001</td>
                        <td className="border px-4 py-2">Wheat</td>
                        <td className="border px-4 py-2">Triticum aestivum</td>
                        <td className="border px-4 py-2">
                            <img src="/src/assets/golden-wheat-fields-glow-sunset-generated-by-ai.jpg" alt="Wheat" className="h-10 w-10 rounded-full"/>
                        </td>
                        <td className="border px-4 py-2">Cereal</td>
                        <td className="border px-4 py-2">Winter</td>
                        <td className="border px-4 py-2">F001</td>
                        <td className="border px-4 py-2">
                            <button className="px-5 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={popUpView}>
                                View
                            </button>
                            <button className="px-5 py-1 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
                                    onClick={popUpUpdate}>
                                Update
                            </button>
                            <button className="px-5 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                                    onClick={popUpDelete}>
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

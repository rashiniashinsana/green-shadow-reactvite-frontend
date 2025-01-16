import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {addField, deleteField, updateField} from "../reducers/FieldSlice.tsx";
import {Field} from "../models/Field.ts";

export function FieldPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fieldCode,setFieldCode] = useState<string>("");
    const [fieldName, setFieldName] = useState<string>("");
    const [fieldLocation, setFieldLocation] = useState<string>("");
    const [fieldSize, setFieldSize] = useState<string>("");
    const [image1, setImage1] = useState<string>("");
    const [image2, setImage2] = useState<string>("");
    const [staffId, setStaffId] = useState<string>("");


    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    // Save Field
    function handleSaveFieldSubmit(){
        const newField = new Field(fieldCode, fieldName, fieldLocation, fieldSize, image1,image2, staffId);
        dispatch(addField(newField));
        window.alert("Field saved successfully.");
        setShowSaveModal(false);
        navigate('/fields');
    }

// Update Field
    function handleUpdateFieldSubmit(){
        const updatedField = new Field(fieldCode, fieldName, fieldLocation, fieldSize, image1,image2, staffId);
        dispatch(updateField(updatedField));
        window.alert("Field updated successfully.");
        setShowSaveModal(false);
        navigate('/fields');
    }

// Delete Field
    function handleDeleteFieldSubmit(){
        if (window.confirm("Are you sure you want to delete this field?")){
            dispatch(deleteField(fieldCode));
            setShowDeleteModal(false);
            navigate('/fields');
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
        setShowViewModal(true);
    }

    function closeViewModal() {
        setShowViewModal(false);
    }


    // @ts-ignore
    return (
        <>
            <header>
                <h2 className="font-sans text-4xl text-lime-700 mb-6">Field Management</h2>
            </header>

            <button
                className="bg-gradient-to-r from-lime-500 to-emerald-700 hover:from-emerald-800 hover:to-lime-500 mb-6 p-3 rounded p-3 rounded"
                onClick={popUpSave}
            >
                Add Field
            </button>

            {/* Save FieldInputComponent */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                        <h3 className="text-2xl font-bold text-green-600 mb-6">Add Field</h3>
                        <div className="grid grid-cols-2 gap-4">
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
                                <label className="block font-medium text-gray-700">Field Name</label>
                                <input
                                    type="text"
                                    value={fieldName}
                                    onChange={(e) => setFieldName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Field Name"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    value={fieldLocation}
                                    onChange={(e) => setFieldLocation(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Location"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Field Size</label>
                                <input
                                    type="text"
                                    value={fieldSize}
                                    onChange={(e) => setFieldSize(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Field Size"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Image 1 (PNG or JPEG)</label>
                                <input
                                    type="file"
                                    accept=".png, .jpeg, .jpg"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setImage1(e.target.files[0]); // Correctly accessing the first file
                                        }
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Image 2 (PNG or JPEG)</label>
                                <input
                                    type="file"
                                    accept=".png, .jpeg, .jpg"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setImage2(e.target.files[0]); // Correctly accessing the first file
                                        }
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
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
                                onClick={handleSaveFieldSubmit}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update FieldInputComponent */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                        <h3 className="text-2xl font-bold text-blue-600 mb-6">Update Field</h3>
                        <div className="grid grid-cols-2 gap-4">
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
                                <label className="block font-medium text-gray-700">Field Name</label>
                                <input
                                    type="text"
                                    value={fieldName}
                                    onChange={(e) => setFieldName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Field Name"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    value={fieldLocation}
                                    onChange={(e) => setFieldLocation(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Location"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Field Size</label>
                                <input
                                    type="text"
                                    value={fieldSize}
                                    onChange={(e) => setFieldSize(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                    placeholder="Enter Field Size"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Image 1 (PNG or JPEG)</label>
                                <input
                                    type="file"
                                    accept=".png, .jpeg, .jpg"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setImage1(e.target.files[0]); // Correctly accessing the first file
                                        }
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Image 2 (PNG or JPEG)</label>
                                <input
                                    type="file"
                                    accept=".png, .jpeg, .jpg"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setImage2(e.target.files[0]); // Correctly accessing the first file
                                        }
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
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
                                onClick={closeUpdateModal}>
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handleUpdateFieldSubmit}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Delete Field Confirmation */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
                        <h3 className="text-2xl font-bold text-red-600 mb-6">Delete Field</h3>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to delete the field with code <strong>{fieldCode}</strong>? This
                            action cannot be undone.
                        </p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                                onClick={closeDeleteModal}>
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={handleDeleteFieldSubmit}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Field Details */}
            {showViewModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                        <h3 className="text-2xl font-bold text-green-600 mb-6">Field Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-gray-700">Field Code</label>
                                <input
                                    type="text"
                                    value={fieldCode}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Field Name</label>
                                <input
                                    type="text"
                                    value={fieldName}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    value={fieldLocation}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Field Size</label>
                                <input
                                    type="text"
                                    value={fieldSize}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Staff ID</label>
                                <input
                                    type="text"
                                    value={staffId}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Image 1</label>
                                {image1 && (
                                    <img
                                        src={URL.createObjectURL(image1)}
                                        alt="Field Image 1"
                                        className="w-full h-auto border border-gray-300 rounded-md"
                                    />
                                )}
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Image 2</label>
                                {image2 && (
                                    <img
                                        src={URL.createObjectURL(image2)}
                                        alt="Field Image 2"
                                        className="w-full h-auto border border-gray-300 rounded-md"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                                onClick={closeViewModal}>
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
                        <th className="px-4 py-2 text-left">Field Code</th>
                        <th className="px-4 py-2 text-left">Field Name</th>
                        <th className="px-4 py-2 text-left">Location</th>
                        <th className="px-4 py-2 text-left">Size</th>
                        <th className="px-4 py-2 text-left">Image 1</th>
                        <th className="px-4 py-2 text-left">Image 2</th>
                        <th className="px-4 py-2 text-left">Staff ID</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{fieldCode}</td>
                            <td className="border px-4 py-2">{fieldName}</td>
                            <td className="border px-4 py-2">{fieldLocation}</td>
                            <td className="border px-4 py-2">{fieldSize}</td>
                            <td className="border px-4 py-2">
                                {image1 && (
                                    <img
                                        src={URL.createObjectURL(image1)}
                                        alt="Field Image 1"
                                        className="h-10 w-10 rounded-full"
                                    />
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                {image2 && (
                                    <img
                                        src={URL.createObjectURL(image2)}
                                        alt="Field Image 2"
                                        className="h-10 w-10 rounded-full"
                                    />
                                )}
                            </td>
                            <td className="border px-4 py-2">{staffId}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="px-5 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => popUpView()}>
                                    View
                                </button>
                                <button
                                    className="px-5 py-1 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
                                    onClick={() => popUpUpdate()}>
                                    Update
                                </button>
                                <button
                                    className="px-5 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                                    onClick={() => popUpDelete()}>
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
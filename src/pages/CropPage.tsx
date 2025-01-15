import { useNavigate } from "react-router";
import { useState } from "react";
import { Crop } from "../models/Crop.ts";
import { addCrop } from "../reducers/CropSlice.tsx";
import { updateCrop} from "../reducers/CropSlice.tsx";
import { deleteCrop} from "../reducers/CropSlice.tsx";
import { useDispatch } from "react-redux";

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
    const [showDeleteModal , setShowDeleteModal]= useState(false);
    const [showViewModel, setShowViewModel] = useState(false);


    /*save*/
    function handleSaveSubmit() {
        const newCrop = new Crop(cropCode, cropCommonName, cropScientificName, cropImage, category, cropSeason, fieldCode);
        dispatch(addCrop(newCrop));
        navigate('/crop');
    }

    /*update*/
    function handleUpdateSubmit(){
        const updatedCrop = new Crop(cropCode, cropCommonName, cropScientificName, cropImage, category, cropSeason, fieldCode);
        dispatch(updateCrop(updatedCrop)); // Dispatching action to update crop
        navigate('/crop'); // Navigate to crop list page after updating
    }

    /*delete*/
    function handleDeleteSubmit(){
        if (window.confirm('Are you sure you want to delete this crop?')) {
            dispatch(deleteCrop(cropCode)); // Dispatching action to delete crop
            navigate('/crop'); // Navigate to crop list page after deletion
        }
    }

    // save show & hidden
    function popUpSave() {
        // Open modal to confirm saving
        setShowSaveModal(true);
    }

    function closeSaveModal() {
        setShowSaveModal(false);
    }

    // update show & hidden
    function popUpUpdate(){
        setShowUpdateModal(true)
    }

    function closeUpdateModal(){
        setShowUpdateModal(false)
    }


    // delete show & hidden
    function popUpDelete(){
        setShowDeleteModal(true)
    }

    function closeDeleteModal(){
        setShowDeleteModal(false)
    }

/*    view show & hidden*/

    function popUpView(){
        setShowViewModel(true);
    }

    function closeViewModal(){
        setShowViewModel(false);
    }



    return (
        <>
            <header><h2 className={'font-bold mb-6'}>Add Crop</h2></header>

            <button className={' bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 mb-6 p-3 rounded'} onClick={popUpSave}>Add Crop</button>


            {/*save*/}
            {showSaveModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                        <h3 className="text-2xl font-bold text-green-600 mb-6">View Crop</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium text-gray-700">Crop Code</label>
                                <input
                                    type="text"
                                    value={cropCode}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Crop Scientific Name</label>
                                <input
                                    type="text"
                                    value={cropScientificName}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Crop Common Name</label>
                                <input
                                    type="text"
                                    value={cropCommonName}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Crop Season</label>
                                <input
                                    type="text"
                                    value={cropSeason}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Crop Category</label>
                                <input
                                    type="text"
                                    value={category}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700">Field Id</label>
                                <input
                                    type="text"
                                    value={fieldCode}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                                    onClick={closeSaveModal}>Cancel
                            </button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded"
                                    onClick={handleSaveSubmit}>Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/*update*/}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Confirm Update</h3>
                        <p><strong>Code:</strong> {cropCode}</p>
                        <p><strong>Common Name:</strong> {cropCommonName}</p>
                        <p><strong>Scientific Name:</strong> {cropScientificName}</p>
                        <p><strong>Category:</strong> {category}</p>
                        <p><strong>Season:</strong> {cropSeason}</p>
                        <p><strong>Field Code:</strong> {fieldCode}</p>

                        <div className="mt-4 flex justify-end">
                            <button className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                                    onClick={closeUpdateModal}>Cancel
                            </button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded"
                                    onClick={handleUpdateSubmit}>Update
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/*delete*/}
            {showDeleteModal && (

                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">

                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Delete Message</h3>
                            <button className="text-gray-500 hover:text-gray-700">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <p className="text-gray-700 mb-6">Are you sure you want to delete this message?</p>

                        <div className="flex justify-end space-x-4">
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={closeDeleteModal}>Cancel</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleDeleteSubmit}>OK</button>
                        </div>
                    </div>
                </div>
            )}


            {/*view*/}
            {showViewModel && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Crop View</h3>
                        <p><strong>Code:</strong> {cropCode}</p>
                        <p><strong>Common Name:</strong> {cropCommonName}</p>
                        <p><strong>Scientific Name:</strong> {cropScientificName}</p>
                        <p><strong>Category:</strong> {category}</p>
                        <p><strong>Season:</strong> {cropSeason}</p>
                        <p><strong>Field Code:</strong> {fieldCode}</p>

                        <div className="mt-4 flex justify-end">
                            <button className="px-4 py-2 bg-gray-500 text-white rounded mr-2" onClick={closeViewModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bgh-14 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Role</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody  >
                    <tr className="hover:bg-gray-100">
                        <td className="border px-4 py-2">3</td>
                        <td className="border px-4 py-2">Alice Johnson</td>
                        <td className="border px-4 py-2">alice.johnson@example.com</td>
                        <td className="border px-4 py-2">Editor</td>
                        <td className="border px-4 py-2">

                            <button className="px-5 py-1 bg-red-500 text-white rounded hover:bg-red-600 "
                                    onClick={popUpView}>View
                            </button>
                            <button className="px-5 py-1 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
                                    onClick={popUpUpdate}>Update
                            </button>
                            <button className="px-5 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                                    onClick={popUpDelete}>Delete
                            </button>

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

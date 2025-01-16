import { useState } from "react";
import { Crop } from "../../models/Crop.ts";
import { useDispatch, useSelector } from "react-redux";
import { addCrop, deleteCrop, updateCrop } from "../../reducers/CropSlice.tsx";

export const CropInputComponent = () => {
        const dispatch = useDispatch();
        // @ts-ignore
        const crops = useSelector((state) => state.crop);

        const [cropCode, setCropCode] = useState('');
        const [cropCommonName, setCropCommonName] = useState('');
        const [cropScientificName, setCropScientificName] = useState('');
        const [cropImage, setCropImage] = useState('');
        const [category, setCategory] = useState('');
        const [cropSeason, setCropSeason] = useState('');
        const [fieldCode, setFieldCode] = useState('');

        const handleCropOperation = (type: string) => {
                const newCrop: Crop = {
                        cropCode,
                        cropCommonName,
                        cropScientificName,
                        cropImage,
                        category,
                        cropSeason,
                        fieldCode,
                };

                switch (type) {
                        case 'ADD_CROP':
                                dispatch(addCrop(newCrop));
                                break;
                        case 'UPDATE_CROP':
                                dispatch(updateCrop(newCrop));
                                break;
                        case 'DELETE_CROP':
                                dispatch(deleteCrop(cropCode));
                                break;
                        default:
                                break;
                }
        };

        return (
            <>
                    <form className="mx-2 mt-6">
                            <div className="grid gap-6 mb-6 md:grid-cols-4">
                                    <div>
                                            <label htmlFor="crop_code"
                                                   className="block mb-2 text-sm font-medium text-gray-900">Crop
                                                    Code</label>
                                            <input type="text" id="crop_code"
                                                   onChange={(e) => setCropCode(e.target.value)}
                                                   className="w-full p-2 border rounded border-blue-600"
                                                   placeholder="CR001" required/>
                                    </div>
                                    <div>
                                            <label htmlFor="crop_common_name"
                                                   className="block mb-2 text-sm font-medium text-gray-900">Common
                                                    Name</label>
                                            <input type="text" id="crop_common_name"
                                                   onChange={(e) => setCropCommonName(e.target.value)}
                                                   className="w-full p-2 border rounded border-blue-600"
                                                   placeholder="Wheat" required/>
                                    </div>
                                    <div>
                                            <label htmlFor="crop_scientific_name"
                                                   className="block mb-2 text-sm font-medium text-gray-900">Scientific
                                                    Name</label>
                                            <input type="text" id="crop_scientific_name"
                                                   onChange={(e) => setCropScientificName(e.target.value)}
                                                   className="w-full p-2 border rounded border-blue-600"
                                                   placeholder="Triticum aestivum" required/>
                                    </div>
                                    <div>
                                            <label htmlFor="crop_image"
                                                   className="block mb-2 text-sm font-medium text-gray-900">Image
                                                    URL</label>
                                            <input type="text" id="crop_image"
                                                   onChange={(e) => setCropImage(e.target.value)}
                                                   className="w-full p-2 border rounded border-blue-600"
                                                   placeholder="https://example.com/image.jpg"/>
                                    </div>
                                    <div>
                                            <label htmlFor="category"
                                                   className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                            <input type="text" id="category"
                                                   onChange={(e) => setCategory(e.target.value)}
                                                   className="w-full p-2 border rounded border-blue-600"
                                                   placeholder="Cereal" required/>
                                    </div>
                                    <div>
                                            <label htmlFor="crop_season"
                                                   className="block mb-2 text-sm font-medium text-gray-900">Season</label>
                                            <input type="text" id="crop_season"
                                                   onChange={(e) => setCropSeason(e.target.value)}
                                                   className="w-full p-2 border rounded border-blue-600"
                                                   placeholder="Winter" required/>
                                    </div>
                                    <div>
                                            <label htmlFor="field_code"
                                                   className="block mb-2 text-sm font-medium text-gray-900">Field
                                                    Code</label>
                                            <input type="text" id="field_code"
                                                   onChange={(e) => setFieldCode(e.target.value)}
                                                   className="w-full p-2 border rounded border-blue-600"
                                                   placeholder="F001" required/>
                                    </div>
                            </div>
                    </form>
                    <div className="grid gap-5 md:grid-cols-3 mx-20">
                            <button type="button" onClick={() => handleCropOperation('ADD_CUSTOMER')}
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add
                                    Customer
                            </button>
                            <button type="button" onClick={() => handleCropOperation('UPDATE_CUSTOMER')}
                                    className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Update
                                    Customer
                            </button>
                            <button type="button" onClick={() => handleCropOperation('DELETE_CUSTOMER')}
                                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete
                                    Customer
                            </button>
                    </div>

            </>
        );
};

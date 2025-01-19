import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import validateCrop from "../../../util/validation/CropValidation.ts";
import { toast } from "react-toastify";
import { Crop } from "../../../models/Crop.ts";
import { RootState } from "../../../store/Store.ts";
import { updateCrop } from "../../../reducers/CropSlice.tsx";

interface UpdateCropPopupProps {
    handleCloseUpdateCropPopup: (data: Crop) => void;
    targetCrop: Crop;
}

const UpdateCropPopup = ({ handleCloseUpdateCropPopup, targetCrop }: UpdateCropPopupProps) => {
    const [crop, setCrop] = useState<Crop>(targetCrop);
    const dispatch = useDispatch();
    const field = useSelector((state: RootState) => state.field);
    const image1Ref = useRef<HTMLInputElement>(null);

    const loadImageToRef = () => {
        if (image1Ref.current && targetCrop.cropImage) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(targetCrop.cropImage as File);
            image1Ref.current.files = dataTransfer.files;
        }
    };

    useEffect(() => {
        setCrop(targetCrop); // Initialize crop state when targetCrop changes
        loadImageToRef(); // Load the image to the input field on mount
    }, [targetCrop]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setCrop((prev) => ({
            ...prev,
            [name]: type === "file" && "files" in e.target && e.target.files
                ? e.target.files[0]
                : value,
        }));
    };

    const handleUpdateCrop = () => {
        if (!validateCrop(crop.cropName, crop.cropScientificName, crop.cropSeason, crop.cropType, crop.cropImage)) return;

        try {
            dispatch(updateCrop(crop));
            toast.success("Crop updated successfully.");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="absolute inset-0 flex justify-center items-center w-full h-auto">
            <div className="w-1/2 h-auto p-6 bg-white rounded-lg shadow-lg relative">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => handleCloseUpdateCropPopup(targetCrop)}
                >
                    X
                </button>

                <h2 className="mt-3 mb-4 text-2xl font-semibold">Update Crop</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="cropName" className="block text-sm font-medium text-gray-700">
                            Crop Common Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="cropName"
                            name="cropName"
                            value={crop.cropName}
                            onChange={handleChange}
                        />
                    </div>

                     <div>
                        <label htmlFor="cropType" className="block text-sm font-medium text-gray-700">
                            Crop Type
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="cropType"
                            name="cropType"
                            value={crop.cropType}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="cropScientificName" className="block text-sm font-medium text-gray-700">
                            Crop Scientific Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="cropScientificName"
                            name="cropScientificName"
                            value={crop.cropScientificName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="cropSeason" className="block text-sm font-medium text-gray-700">
                            Crop Season
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="cropSeason"
                            name="cropSeason"
                            value={crop.cropSeason}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="assignField" className="block text-sm font-medium text-gray-700">
                            Select a Field
                        </label>
                        <select
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="assignField"
                            name="assignField"
                            value={crop.fieldCode}
                            onChange={handleChange}
                        >
                            <option value="" disabled>None</option>
                            {field.map((f) => (
                                <option key={f.fieldCode} value={f.fieldName}>
                                    {f.fieldName} - {f.fieldCode}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="cropImage" className="block text-sm font-medium text-gray-700">
                            Crop Image
                        </label>
                        <input
                            type="file"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="cropImage"
                            name="cropImage"
                            onChange={handleChange}
                            ref={image1Ref}
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={handleUpdateCrop}
                    >
                        Update Crop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateCropPopup;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Crop } from "../../../models/Crop";
import { updateCrop } from "../../../reducers/CropSlice";
import { RootState } from "../../../store/Store";
import validateCrop from "../../../util/validation/CropValidation";

interface UpdateCropPopupProps {
    CloseUpdateCropPopup: (data:Crop) => void;
    targetCrop: Crop;
}

const UpdateCropPopup: React.FC<UpdateCropPopupProps> = ({
                                                             CloseUpdateCropPopup, targetCrop,
                                                         }) => {
    const [crop, setCrop] = useState<Crop>(targetCrop);
    const dispatch = useDispatch();
    const field = useSelector((state: RootState) => state.field);
    const image1Ref = useRef<HTMLInputElement>(null);

    const loadImageToRef = () => {
        if (image1Ref.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(targetCrop?.cropImage as File);
            image1Ref.current.files = dataTransfer.files;
        }
    };

    useEffect(() => {
        loadImageToRef();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        setCrop((prev) => ({
            ...prev,
            [name]:
                type === "file" && "files" in e.target && e.target.files
                    ? e.target.files[0]
                    : value,
        }));
    };

    const handleUpdateCrop = () => {
        if (!validateCrop(crop.cropName, crop.cropScientificName, crop.cropSeason, crop.cropType, crop.cropImage)) return;

        try {
            dispatch(updateCrop(crop));
            toast.success("Crop updated successfully.");
            CloseUpdateCropPopup(targetCrop);
        } catch (e) {
            console.error(e);

        }
    };

    return (
        <div
            id="update-crop-popup"
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
        >
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 relative">

                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => CloseUpdateCropPopup(targetCrop)}
                >
                    X
                </button>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Update Crop</h2>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <div>
                            <label
                                htmlFor="floatingInput"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Crop Name
                            </label>
                            <input
                                type="text"
                                id="floatingInput"
                                name="cropName"
                                defaultValue={crop.cropName}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="floatingInput"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Crop Scientific Name
                            </label>
                            <input
                                type="text"
                                id="floatingInput"
                                name="cropScientificName"
                                defaultValue={crop.cropScientificName}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            />
                        </div>


                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <div>
                            <label
                                htmlFor="floatIngInput"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Crop Season
                            </label>
                            <input
                                type="text"
                                id="floatingInput"
                                name="cropSeason"
                                defaultValue={crop.cropSeason}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="floatingInput"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Crop Type
                        </label>
                        <input
                            type="text"
                            id="floatingInput"
                            name="cropType"
                            defaultValue={crop.cropType}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="floatingSelect"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Select a Field
                        </label>
                        <select
                            id="floatingSelect"
                            value={crop.fieldCode}
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                        >
                            <option value="" disabled selected>None</option>

                            {field.map((f) => (
                                <option value={f.fieldName}>{f.fieldName} - {f.fieldCode}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="floatingInput"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Crop Image
                        </label>
                        <input
                            type="file"
                            id="floatingSelect"
                            name="cropImage"
                            onChange={handleChange}
                            ref={image1Ref}
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                        />
                    </div>

                    <button type="button" onClick={() => handleUpdateCrop()}
                            className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Update Crop
                    </button>
                </form>
            </div>
        </div>
    );

};

export default UpdateCropPopup;

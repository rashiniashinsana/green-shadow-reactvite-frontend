import { useState } from "react";
import { generateUUID } from "../../../util/generateUUID.ts";
import { useDispatch, useSelector } from "react-redux";
import validateCrop from "../../../util/validation/CropValidation.ts";
import { toast } from "react-toastify";
import {Crop} from "../../../models/Crop.ts";
import {RootState} from "../../../store/Store.ts";
import {saveCrop} from "../../../reducers/CropSlice.tsx";

interface SaveCropProps {
    closePopupAction: () => void;
}

const SaveCropPopup = ({ closePopupAction }: SaveCropProps) => {
    const [crop, setCrop] = useState<Crop>({
        cropCode: generateUUID('CROP'),
        cropName: "",
        cropScientificName: "",
        cropSeason: "",
        cropType: "",
        cropImage: null,
        fieldCode: "",
    });
    const dispatch = useDispatch();
    const field = useSelector((state: RootState) => state.field);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setCrop((prev) => ({
            ...prev,
            [name]: type === "file" && "files" in e.target && e.target.files
                ? e.target.files[0]
                : value,
        }));
    };

    const handleSaveCrop = () => {
        if (!validateCrop(crop.cropName,crop.cropScientificName,crop.cropSeason,crop.cropType,crop.cropImage)) return;

        try {
            dispatch(saveCrop(crop));
            toast.success("Crop saved successfully.");
            closePopupAction();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="absolute inset-0 flex justify-center items-center w-full h-auto">
            <div className="w-1/2 h-auto p-6 bg-white rounded-lg shadow-lg relative">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={closePopupAction}
                >
                    X
                </button>

                <h2 className="mt-3 mb-4 text-2xl font-semibold">Save Crop</h2>

                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            placeholder="Enter crop common name"
                            name="cropName"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            placeholder="Enter crop scientific name"
                            name="cropScientificName"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            placeholder="Enter crop season"
                            name="cropSeason"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            placeholder="Enter crop type"
                            name="cropType"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mt-3 mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Upload Image</label>
                        <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
                            <input
                                type="file"
                                className="w-full text-center text-gray-600"
                                name="cropImage"
                                onChange={handleChange}
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Drag and drop or browse to select a file.
                            </p>
                        </div>
                    </div>

                    <div>
                        <select
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            name="assignField"
                            onChange={handleChange}
                        >
                            <option value="" disabled selected>
                                Select a field
                            </option>
                            {field.map((f) => (
                                <option key={f.fieldCode} value={f.fieldName}>
                                    {f.fieldName} - {f.fieldCode}
                                </option>
                            ))}
                        </select>
                    </div>


                    <button
                        type="button"
                        className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={handleSaveCrop}
                    >
                        Save Crop
                    </button>
                </div>
            </div>
        </div>
    );

};

export default SaveCropPopup;

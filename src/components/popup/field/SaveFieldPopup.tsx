import { useState, useEffect } from "react";
import { generateUUID } from "../../../util/generateUUID.ts";
import { useDispatch, useSelector } from "react-redux";
import validateField from "../../../util/validation/FieldValidation.ts";
import { toast } from "react-toastify";
import { Field } from "../../../models/Field.ts";
import { RootState } from "../../../store/Store.ts";
import { saveField } from "../../../reducers/FieldSlice.tsx";

interface SaveFieldProps {
    closePopupAction: () => void;
    fieldToUpdate?: Field; // Optional prop for existing field data
}

const SaveField = ({ closePopupAction, fieldToUpdate }: SaveFieldProps) => {
    const [field, setField] = useState<Field>({
        fieldCode: fieldToUpdate?.fieldCode || generateUUID("FIELD"),
        fieldName: fieldToUpdate?.fieldName || "",
        fieldSize: fieldToUpdate?.fieldSize || "",
        fieldImage1: fieldToUpdate?.fieldImage1 || null,
        fieldImage2: fieldToUpdate?.fieldImage2 || null,
        location: fieldToUpdate?.location || { latitude: 0, longitude: 0 },
        assignStaffs: fieldToUpdate?.assignStaffs || [],
    });

    const dispatch = useDispatch();
    const staffList = useSelector((state: RootState) => state.staff); // Assuming there's a staff state

    useEffect(() => {
        if (fieldToUpdate) {
            setField({
                fieldCode: fieldToUpdate.fieldCode,
                fieldName: fieldToUpdate.fieldName,
                fieldSize: fieldToUpdate.fieldSize,
                fieldImage1: fieldToUpdate.fieldImage1,
                fieldImage2: fieldToUpdate.fieldImage2,
                location: fieldToUpdate.location,
                assignStaffs: fieldToUpdate.assignStaffs,
            });
        }
    }, [JSON.stringify(fieldToUpdate)]); // Fix for deeply nested props

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === "file" && e.target instanceof HTMLInputElement && e.target.files) {
            const file = e.target.files[0];
            setField((prev) => ({
                ...prev,
                [name]: file,
            }));
        } else if (name === "assignStaffs") {
            setField((prev) => ({
                ...prev,
                assignStaffs: Array.isArray(prev.assignStaffs)
                    ? [...prev.assignStaffs, value] // Add to existing array
                    : [value], // Initialize as array if not already
            }));
        } else {
            setField((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSaveField = () => {
        if (!validateField(field.fieldName, field.fieldSize, field.fieldImage1, field.fieldImage2)) {
            toast.error("Please fill all required fields correctly.");
            return;
        }

        try {
            dispatch(saveField(field));
            toast.success("Field saved successfully.");
            closePopupAction();
        } catch (e) {
            console.error(e);
            toast.error("Failed to save field.");
        }
    };

    return (
        <div className="absolute inset-0 flex justify-center items-center w-full h-auto">
            <div className="w-1/2 h-auto p-6 bg-white rounded-lg shadow-lg relative">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={closePopupAction}
                >
                    X
                </button>

                <h2 className="mt-3 mb-4 text-2xl font-semibold">Save Field</h2>

                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            placeholder="Enter field name"
                            name="fieldName"
                            value={field.fieldName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <input
                            type="number"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            placeholder="Enter field size"
                            name="fieldSize"
                            value={field.fieldSize}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mt-3 mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Upload Image 1</label>
                        <input
                            type="file"
                            className="w-full text-center text-gray-600"
                            name="fieldImage1"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mt-3 mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Upload Image 2</label>
                        <input
                            type="file"
                            className="w-full text-center text-gray-600"
                            name="fieldImage2"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">Assign Staff</label>
                        <select
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            name="assignStaffs"
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select staff
                            </option>
                            {staffList.map((staff) => (
                                <option key={staff.staffId} value={staff.staffId}>
                                    {staff.staffId}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={handleSaveField}
                    >
                        Save Field
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveField;

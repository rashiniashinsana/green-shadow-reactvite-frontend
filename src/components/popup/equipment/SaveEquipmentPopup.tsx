import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { generateUUID } from "../../../util/generateUUID.ts";
import { Equipment } from "../../../models/Equipment.ts";
import validateEquipment from "../../../util/validation/EquipmentValidation.ts";
import { saveEquipment } from "../../../reducers/EquipmentSlice.tsx";
import { RootState } from "../../../store/Store.ts";

interface AddEquipmentPopupProps {
    closePopupAction: () => void;
}

const SaveEquipmentPopup = ({ closePopupAction }: AddEquipmentPopupProps) => {
    const [equipment, setEquipment] = useState<Equipment>({
        equipmentId: generateUUID("EQU"),
        equipmentName: "",
        equipmentType: "",
        fieldId: "",
        staffId: "",
    });

    const dispatch = useDispatch();
    const fields = useSelector((state: RootState) => state.field);
    const staff = useSelector((state: RootState) => state.staff);
    const equipmentTypes = ["Tractor", "Harvester", "Irrigation System", "Seeder", "Plow"];


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setEquipment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (!validateEquipment(equipment.equipmentName, equipment.equipmentType)) {
            return;
        }
        try {
            dispatch(saveEquipment(equipment));
            toast.success("Equipment saved successfully.");
            closePopupAction();
        } catch (error) {
            console.error(error);
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
                <h2 className="mt-3 mb-4 text-2xl font-semibold">Save Equipment</h2>
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            name="equipmentName"
                            placeholder="Enter Equipment Name"
                            value={equipment.equipmentName}
                            onChange={handleChange}
                        />
                    </div>
                    <select
                        className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                        id="equipmentType"
                        name="equipmentType"
                        value={equipment.equipmentType}
                        onChange={handleChange}
                    >
                        <option value="">Select Equipment Type</option>
                        {equipmentTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <div>
                        <select
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            name="fieldId"
                            value={equipment.fieldId}
                            onChange={handleChange}
                        >
                            <option value="">Select Field ID</option>
                            {fields.map(field => (
                                <option key={field.fieldCode} value={field.fieldCode}>
                                    {field.fieldCode}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            name="staffId"
                            value={equipment.staffId}
                            onChange={handleChange}
                        >
                            <option value="">Select Staff ID</option>
                            {staff.map(member => (
                                <option key={member.staffId} value={member.staffId}>
                                    {member.staffId}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="button"
                        className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={handleSave}
                    >
                        Save Equipment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveEquipmentPopup;

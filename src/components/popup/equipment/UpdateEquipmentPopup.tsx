import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RootState } from "../../../store/Store.ts";
import { Equipment } from "../../../models/Equipment.ts";
import validateEquipment from "../../../util/validation/EquipmentValidation.ts";
import { updateEquipment } from "../../../reducers/EquipmentSlice.tsx";
import { Staff } from "../../../models/Staff.ts";
import { Field } from "../../../models/Field.ts";

interface UpdateEquipmentPopupProps {
    closePopupAction: (id: string) => void;
    targetEquipment: string;
}

const UpdateEquipmentPopup = ({ closePopupAction, targetEquipment }: UpdateEquipmentPopupProps) => {
    const equipment = useSelector((state: RootState) => state.equipment);
    const staff = useSelector((state: RootState) => state.staff);
    const field = useSelector((state: RootState) => state.field);

    const [equipmentData, setEquipmentData] = useState<Equipment>({
        equipmentId: "",
        equipmentName: "",
        equipmentType: "",
        staffId: "",
        fieldId: "",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        setEquipmentData(equipment.find((equipment: Equipment) => equipment.equipmentId === targetEquipment) as Equipment);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEquipmentData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateAction = () => {
        try {
            if (!validateEquipment(equipmentData.equipmentName, equipmentData.equipmentType)) {
                return;
            }
            dispatch(updateEquipment(equipmentData));
            toast.success("Equipment updated successfully.");
            closePopupAction(equipmentData.equipmentId); // Close the popup after updating
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="absolute inset-0 flex justify-center items-center w-full h-auto">
            <div className="w-1/2 h-auto p-6 bg-white rounded-lg shadow-lg relative">

                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => closePopupAction("")}
                >
                    X
                </button>

                 <h2 className="mt-3 mb-4 text-2xl font-semibold">Update Equipment</h2>

                 <div className="space-y-4">
                    <div>
                        <label htmlFor="floatingInput" className="block text-sm font-medium text-gray-700">
                            Equipment Name
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="floatingInput"
                            name={"equipmentName"}
                            defaultValue={equipmentData.equipmentName}
                            onChange={handleChange}
                            placeholder="Enter Equipment Name"
                        />
                    </div>

                     <div>
                        <label htmlFor="floatingInput" className="block text-sm font-medium text-gray-700">
                            Equipment Type
                        </label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="floatingInput"
                            name={"equipmentType"}
                            defaultValue={equipmentData.equipmentType}
                            onChange={handleChange}
                            placeholder="Enter Equipment Type"
                        />
                    </div>

                     <div>
                        <label htmlFor="floatingSelect" className="block text-sm font-medium text-gray-700">
                            Assign Staff
                        </label>
                        <select
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="floatingSelect"
                            name={"staffId"}
                            value={equipmentData.staffId}
                            onChange={handleChange}
                        >
                            <option value="">None</option>
                            {staff.map((staff: Staff) => (
                                <option key={staff.staffId} value={staff.staffId}>
                                    {staff.firstName} {staff.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                     <div>
                        <label htmlFor="floatingSelect" className="block text-sm font-medium text-gray-700">
                            Assign Field
                        </label>
                        <select
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="floatingSelect"
                            name={"fieldId"}
                            value={equipmentData.fieldId}
                            onChange={handleChange}
                        >
                            <option value="">None</option>
                            {field.map((field: Field) => (
                                <option key={field.fieldCode} value={field.fieldCode}>
                                    {field.fieldName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        onClick={updateAction}
                    >
                        Update Equipment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateEquipmentPopup;

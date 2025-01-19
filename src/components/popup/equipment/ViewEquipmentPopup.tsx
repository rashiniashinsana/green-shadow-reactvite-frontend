import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {Equipment} from "../../../models/Equipment.ts";
import {RootState} from "../../../store/Store.ts";

interface ViewEquipmentPopupProps {
    targetEquipmentId: string;
    closePopupAction: (id: string) => void;
}

const ViewEquipmentPopup = ({ targetEquipmentId, closePopupAction }: ViewEquipmentPopupProps) => {
    const equipment = useSelector((state: RootState) => state.equipment);
    const [equipmentData, setEquipmentData] = useState<Equipment | null>(null);
    const staff = useSelector((state: RootState) => state.staff);
    const fields = useSelector((state: RootState) => state.field);

    useEffect(() => {
        const selectedEquipment = equipment.find((e: Equipment) => e.equipmentId === targetEquipmentId) || null;
        setEquipmentData(selectedEquipment);
    }, [targetEquipmentId, equipment]);

    const getStaffName = (staffId: string) => {
        const selectedStaff = staff.find((s) => s.staffId === staffId);
        return selectedStaff?.firstName + " " + selectedStaff?.lastName + " - " + selectedStaff?.staffId;
    };

    const getFieldName = (fieldId: string) => {
        const selectedField = fields.find((f) => f.fieldCode === fieldId);
        return selectedField?.fieldName + " " + selectedField?.fieldCode;
    };

    return (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="w-11/12 max-w-4xl p-6 bg-white rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
                 <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800 z-10"
                    onClick={() => closePopupAction(targetEquipmentId)}
                >
                    X
                </button>

                <h2 className="mt-3 mb-6 text-2xl font-semibold">View Equipment</h2>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Equipment ID</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={equipmentData?.equipmentId}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Name</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={equipmentData?.equipmentName}
                        />
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Type</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={equipmentData?.equipmentType}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Assign Field</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={equipmentData?.fieldId === "" ? "Not Assigned" : getFieldName(equipmentData?.fieldId as string)}
                        />
                    </div>

                   <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Assign Staff</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={equipmentData?.staffId === "" ? "Not Assigned" : getStaffName(equipmentData?.staffId as string)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ViewEquipmentPopup;

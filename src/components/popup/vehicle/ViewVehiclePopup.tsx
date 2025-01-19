import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {RootState} from "../../../store/Store.ts";
import {Vehicle} from "../../../models/Vehicle.ts";


interface ViewVehiclePopupProps {
    targetStaffId: string;
    closePopupAction: (id: string) => void;
}

const ViewVehiclePopup = ({ targetStaffId, closePopupAction }: ViewVehiclePopupProps) => {
    const vehicle = useSelector((state: RootState) => state.vehicle);
    const [vehicleData, setVehicleData] = useState<Vehicle | null>(null);

    useEffect(() => {
        const selectedVehicle = vehicle.find((v: Vehicle) => v.vehicleCode === targetStaffId) || null;
        setVehicleData(selectedVehicle);
    }, [targetStaffId, vehicle]);

    if (!vehicleData) {
        return null;
    }
    return (
        <div
            id="view-vehicle-popup"
            className="absolute inset-0 flex justify-center items-center w-full h-auto bg-gray-800 bg-opacity-50"
        >
            <div className="w-1/2 p-6 bg-white rounded-lg shadow-lg relative">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800 z-10"
                    onClick={() => { closePopupAction("") }}
                >
                    X
                </button>

                <h2 className="mt-3 mb-6 text-xl font-semibold">View Vehicle</h2>

                <div className="space-y-6">
                    {/* Vehicle Id */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                            readOnly
                            value={vehicleData.vehicleCode}
                        />
                        <label className="absolute left-2 top-0 transform -translate-y-1/2 text-gray-500">Vehicle ID</label>
                    </div>

                    {/* License Plate Number */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                            readOnly
                            value={vehicleData.licensePlateNumber}
                        />
                        <label className="absolute left-2 top-0 transform -translate-y-1/2 text-gray-500">License Plate Number</label>
                    </div>

                    {/* Vehicle Category */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                            readOnly
                            value={vehicleData.vehicleCategory}
                        />
                        <label className="absolute left-2 top-0 transform -translate-y-1/2 text-gray-500">Vehicle Category</label>
                    </div>

                    {/* Fuel Type */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                            readOnly
                            value={vehicleData.fuelType}
                        />
                        <label className="absolute left-2 top-0 transform -translate-y-1/2 text-gray-500">Fuel Type</label>
                    </div>

                    {/* Status */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                            readOnly
                            value={vehicleData.staffId === "" ? "Available" : "Assigned"}
                        />
                        <label className="absolute left-2 top-0 transform -translate-y-1/2 text-gray-500">Status</label>
                    </div>

                    {/* Remarks */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                            readOnly
                            value={vehicleData.remarks}
                        />
                        <label className="absolute left-2 top-0 transform -translate-y-1/2 text-gray-500">Remarks</label>
                    </div>

                    {/* Staff */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                            readOnly
                            value={vehicleData.staffId === "" ? "N/A" : vehicleData.staffId}
                        />
                        <label className="absolute left-2 top-0 transform -translate-y-1/2 text-gray-500">Staff</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewVehiclePopup;

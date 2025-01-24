import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../../store/Store.ts";
import { Vehicle } from "../../../models/Vehicle.ts";

interface ViewVehiclePopupProps {
    targetStaffId: string;
    closePopupAction: (id: string) => void;
}

const ViewVehiclePopup = ({ targetStaffId, closePopupAction }: ViewVehiclePopupProps) => {
    const vehicles = useSelector((state: RootState) => state.vehicle);
    const [vehicleData, setVehicleData] = useState<Vehicle | null>(null);

    useEffect(() => {
        const selectedVehicle = vehicles.find((v: Vehicle) => v.vehicleCode === targetStaffId) || null;
        setVehicleData(selectedVehicle);
    }, [targetStaffId, vehicles]);

    if (!vehicleData) {
        return null;
    }

    return (
        <div
            id="view-vehicle-popup"
            className="absolute inset-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
        >
            <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg relative">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800 z-10"
                    onClick={() => { closePopupAction(""); }}
                >
                    X
                </button>

                <h2 className="mt-3 mb-6 text-2xl font-semibold text-center">View Vehicle</h2>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle ID</label>
                        <input
                            id="floatinginput"
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={vehicleData.vehicleCode}
                        />

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">License Plate Number</label>

                        <input
                            id="floatinginput"
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={vehicleData.licensePlateNumber}
                        />

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Category</label>

                        <input
                            id="floatinginput"
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={vehicleData.vehicleCategory}
                        />

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>

                        <input
                            id="floatinginput"
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={vehicleData.fuelType}
                        />

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Remark</label>

                        <input
                            id="floatinginput"
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={vehicleData.remarks}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Staff</label>

                        <input
                            id="floatinginput"
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={vehicleData.staffId === "" ? "Available" : "Assigned"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ViewVehiclePopup;

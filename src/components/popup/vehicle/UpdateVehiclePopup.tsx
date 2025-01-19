import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import vehicleValidation from "../../../util/validation/VehicleValidation.ts";
import { toast } from "react-toastify";
import { RootState } from "../../../store/Store.ts";
import { Vehicle } from "../../../models/Vehicle.ts";
import { updateVehicle } from "../../../reducers/VehicleSlice.tsx";
import { Staff } from "../../../models/Staff.ts";

interface UpdateVehiclePopupProps {
    closePopupAction: (id: string) => void;
    targetVehicleCode: string;
}

const UpdateVehiclePopup = ({ closePopupAction, targetVehicleCode }: UpdateVehiclePopupProps) => {

    const vehicles = useSelector((state: RootState) => state.vehicle);
    const staff = useSelector((state: RootState) => state.staff);

    const [vehicleData, setVehicleData] = useState<Vehicle>({
        licensePlateNumber: "",
        vehicleCategory: "",
        fuelType: "",
        remarks: "",
        vehicleCode: "",
        staffId: ""
    });

    useEffect(() => {
        const vehicleToUpdate = vehicles.find((vehicle: Vehicle) => vehicle.vehicleCode === targetVehicleCode);
        if (vehicleToUpdate) {
            setVehicleData(vehicleToUpdate);
        }
    }, [vehicles, targetVehicleCode]);

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVehicleData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const updateAction = () => {
        if (!vehicleValidation(vehicleData)) {
            return;
        }

        try {
            dispatch(updateVehicle(vehicleData));
            toast.success("Vehicle updated successfully.");
            closePopupAction("");  // Close the popup after successful update
        } catch (error) {
            console.error(error);
            toast.error("Failed to update vehicle.");
        }
    }

    return (
        <div className="absolute inset-0 flex justify-center items-center w-full h-auto bg-gray-800 bg-opacity-50">
            <div className="w-1/3 h-auto p-6 bg-white rounded-lg shadow-lg relative">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => closePopupAction("")}
                >
                    X
                </button>

                <h2 className="mt-3 mb-4 text-2xl font-semibold">Update Vehicle</h2>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="licensePlateNumber" className="block text-sm font-medium text-gray-700">License
                            Plate Number</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="licensePlateNumber"
                            name="licensePlateNumber"
                            value={vehicleData.licensePlateNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="vehicleCategory" className="block text-sm font-medium text-gray-700">Vehicle
                            Category</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="vehicleCategory"
                            name="vehicleCategory"
                            value={vehicleData.vehicleCategory}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">Fuel Type</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="fuelType"
                            name="fuelType"
                            value={vehicleData.fuelType}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="remarks"
                            name="remarks"
                            value={vehicleData.remarks}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="assignedDriver" className="block text-sm font-medium text-gray-700">Assign
                            Driver</label>
                        <select
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="assignedDriver"
                            name="staffId"
                            value={vehicleData.staffId}
                            onChange={handleChange}
                        >
                            <option value="">None</option>
                            {staff.map((staffMember: Staff) => (
                                <option key={staffMember.staffId} value={staffMember.staffId}>
                                    {staffMember.firstName} {staffMember.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onClick={() => {
                            updateAction();  // Update the vehicle
                            closePopupAction("");  // Close the form after update
                        }}
                    >
                        Update Vehicle
                    </button>

                </div>
            </div>
        </div>
    );
}

export default UpdateVehiclePopup;

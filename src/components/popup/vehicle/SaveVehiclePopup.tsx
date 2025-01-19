import { Vehicle } from "../../../models/Vehicle.ts";
import { useState } from "react";
import { generateUUID } from "../../../util/generateUUID.ts";
import { useDispatch } from "react-redux";
import vehicleValidation from "../../../util/validation/VehicleValidation.ts";
import { toast } from "react-toastify";
import { saveVehicle } from "../../../reducers/VehicleSlice.tsx";

interface AddVehiclePopupProps {
    closePopupAction: () => void;
}

const AddVehiclePopup = ({ closePopupAction }: AddVehiclePopupProps) => {
    const [vehicle, setVehicle] = useState<Vehicle>({
        licensePlateNumber: "",
        vehicleCategory: "",
        fuelType: "",
        remarks: "",
        vehicleCode: generateUUID("VEHICLE"),
        staffId: "", // Make sure to add a valid staffId or leave it blank if not needed
    });

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVehicle((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const saveBtnAction = async () => {
        // Validate vehicle data
        if (!vehicleValidation(vehicle)) {
            return;
        }

        try {
             await dispatch(saveVehicle(vehicle)); // assuming saveVehicle is a thunk action
            toast.success("Vehicle saved successfully.");
            closePopupAction(); // Close the popup after saving the vehicle
        } catch (error) {
            console.error("Error saving vehicle:", error);
            toast.error("Failed to save vehicle. Please try again.");
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

                <h2 className="mt-3 mb-4 text-2xl font-semibold">Save Vehicle</h2>

                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            placeholder="Enter license plate number"
                            name="licensePlateNumber" // Fixed name to match the state
                            value={vehicle.licensePlateNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            placeholder="Enter vehicle category"
                            name="vehicleCategory" // Fixed name to match the state
                            value={vehicle.vehicleCategory}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            placeholder="Enter fuel type"
                            name="fuelType"
                            value={vehicle.fuelType}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            placeholder="Enter remarks"
                            name="remarks"
                            value={vehicle.remarks}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={saveBtnAction}
                    >
                        Save Vehicle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddVehiclePopup;

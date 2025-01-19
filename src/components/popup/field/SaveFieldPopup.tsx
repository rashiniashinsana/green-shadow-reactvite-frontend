import { useState, useRef, useEffect } from "react";
import { generateUUID } from "../../../util/generateUUID.ts";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Field } from "../../../models/Field.ts";
import { RootState } from "../../../store/Store.ts";
import { saveField } from "../../../reducers/FieldSlice.tsx";
import validateField from "../../../util/validation/FieldValidation.ts";

interface SaveFieldProps {
    closePopupAction: () => void;
}

const SaveFieldPopup = ({ closePopupAction }: SaveFieldProps) => {
    const [field, setField] = useState<Field>({
        fieldCode: generateUUID("FIELD"),
        fieldName: "",
        fieldSize: "",
        fieldImage1: null,
        fieldImage2: null,
        location: { latitude: 0, longitude: 0 },
        assignStaffs: [],
    });

    const dispatch = useDispatch();
    const staffList = useSelector((state: RootState) => state.staff); // Assuming staff data is stored in Redux state
    const mapRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const defaultLocation = { lat: 6.0367, lng: 80.217 }; // Default map location

    useEffect(() => {
        if (mapRef.current && !map) {
            const googleMap = new google.maps.Map(mapRef.current, {
                center: defaultLocation,
                zoom: 13,
            });
            setMap(googleMap);

            markerRef.current = new google.maps.Marker({
                position: defaultLocation,
                map: googleMap,
            });

            googleMap.addListener("click", (e: google.maps.MapMouseEvent) => {
                if (e.latLng) {
                    if (markerRef.current) {
                        markerRef.current.setMap(null);
                    }

                    markerRef.current = new google.maps.Marker({
                        position: e.latLng,
                        map: googleMap,
                    });

                    // setField((prev) => ({
                    //     ...prev,
                    //     location: {
                    //         // latitude: e.latLng.lat(),
                    //         // longitude: e.latLng.lng(),
                    //     },
                    // }));
                }
            });
        }
    }, [map]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setField((prev) => ({
            ...prev,
            [name]: type === "file" && "files" in e.target && e.target.files ? e.target.files[0] : value,
        }));
    };

    const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStaff = Array.from(e.target.selectedOptions, (option) => option.value);
        setField((prev) => ({
            ...prev,
            assignStaffs: selectedStaff,
        }));
    };

    const handleSaveField = () => {
        if (!validateField(field.fieldName, field.fieldSize, field.fieldImage1 as File, field.fieldImage2 as File)) {
            toast.error("Please fill all required fields correctly.");
            return;
        }

        try {
            dispatch(saveField(field));
            toast.success("Field saved successfully.");
            closePopupAction();
        } catch (e) {
            console.error(e);
            toast.error("Failed to save the field.");
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

                <h2 className="mt-3 mb-4 text-2xl font-semibold text-center">Save Field</h2>

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
                            placeholder="Enter field size (in acres)"
                            name="fieldSize"
                            value={field.fieldSize}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Upload Field Image */}
                    <div className="mt-3 mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Upload Field Image</label>
                        <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
                            <input
                                type="file"
                                className="w-full text-center text-gray-600"
                                name="fieldImage1"
                                onChange={handleChange}
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Drag and drop or browse to select a file.
                            </p>
                        </div>
                    </div>


                    <div>
                        <label className="block mb-2 font-semibold text-gray-600">Assign Staff</label>
                        <select
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            name="assignStaffs"
                            onChange={handleStaffChange}
                            multiple
                        >
                            {staffList.map((staff) => (
                                <option key={staff.staffId} value={staff.staffId}>
                                    {staff.staffId} - {staff.firstName} {staff.lastName}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <label className="block mb-2 font-semibold text-gray-600">Select Field Location</label>
                        <div
                            id="map"
                            ref={mapRef}
                            className="w-full h-64 rounded-md border border-gray-300"
                        ></div>
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

export default SaveFieldPopup;

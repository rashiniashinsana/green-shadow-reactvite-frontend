import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Field } from "../../../models/Field";
import { RootState } from "../../../store/Store";

interface ViewFieldPopupProps {
    targetField: Field;
    closePopupAction: (data: Field) => void;
}

const ViewFieldPopup = ({ targetField, closePopupAction }: ViewFieldPopupProps) => {
    const staffSet = useSelector((state: RootState) => state.staff);

    const handleLoadStaff = (id: string) => {
        const staffMember = staffSet.find((staffData) => staffData.staffId === id);
        return (
            <div className="grid grid-cols-2 gap-4 border-b py-2">
                <div>{staffMember ? staffMember.staffId : "N/A"}</div>
                <div>
                    {staffMember ? `${staffMember.firstName} ${staffMember.lastName}` : "N/A"}
                </div>
            </div>
        );
    };

    const mapRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const defaultLocation = {
        lat: targetField.location.latitude,
        lng: targetField.location.longitude,
    };

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
        }
    }, [map]);

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="w-1/2 max-w-xl bg-white p-8 rounded-lg shadow-lg relative">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => closePopupAction(targetField)}
                >
                    X
                </button>
                <h2 className="text-center text-2xl font-bold mb-6">View Field Details</h2>
                <div className="space-y-1">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Field Code</label>
                        <input
                            type="text"
                            readOnly
                            value={targetField.fieldCode}
                            className="w-full p-2 border rounded bg-gray-100 text-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Field Name</label>
                        <input
                            type="text"
                            readOnly
                            value={targetField.fieldName}
                            className="w-full p-2 border rounded bg-gray-100 text-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Field Size</label>
                        <input
                            type="text"
                            readOnly
                            value={targetField.fieldSize}
                            className="w-full p-2 border rounded bg-gray-100 text-gray-600"
                        />
                    </div>
                </div>

                <div className="my-4 flex gap-4 justify-center">
                    <img
                        className="w-40 h-40 object-cover border rounded"
                        src={
                            targetField.fieldImage1
                                ? URL.createObjectURL(targetField.fieldImage1)
                                : "https://via.placeholder.com/150"
                        }
                        alt="Field 1"
                    />
                    <img
                        className="w-40 h-40 object-cover border rounded"
                        src={
                            targetField.fieldImage2
                                ? URL.createObjectURL(targetField.fieldImage2)
                                : "https://via.placeholder.com/150"
                        }
                        alt="Field 2"
                    />
                </div>


                <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2">Assigned Staff</h3>
                    <div className="grid grid-cols-2 gap-4 font-semibold text-gray-700 mb-2">
                        <div>Staff ID</div>
                        <div>Staff Name</div>
                    </div>
                    <div className="space-y-2">
                        {targetField.assignStaffs.length > 0 ? (
                            targetField.assignStaffs.map((staffId) => handleLoadStaff(staffId))
                        ) : (
                            <p className="text-gray-500">No staff assigned to this field.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewFieldPopup;

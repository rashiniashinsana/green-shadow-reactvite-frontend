import { useSelector } from "react-redux";
import { dataRefactor } from "../../../util/dataRefactor.ts";
import { useEffect, useRef, useState } from "react";
import {Field} from "../../../models/Field.ts";
import {RootState} from "../../../store/Store.ts";

interface ViewFieldPopupProps {
    targetField: Field;
    closePopupAction: (data: Field) => void;
}

const ViewFieldPopup = ({ targetField, closePopupAction }: ViewFieldPopupProps) => {
    const staffSet = useSelector((state: RootState) => state.staff);

    const handleLoadStaff = (id: string) => {
        const staffMember = staffSet.find((staffData) => staffData.staffId === id);
        return (
            <>
                <div>{staffMember ? dataRefactor(staffMember.staffId, 10) : ""}</div>
                <div className="border-l border-black">
                    {staffMember ? staffMember?.firstName : ""} {staffMember ? staffMember?.lastName : ""}
                </div>
            </>
        );
    };

    const mapRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<google.maps.Marker | null>(null); // Use a ref for the marker
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const defaultLocation = {
        lat: targetField.location.latitude,
        lng: targetField.location.longitude
    };

    useEffect(() => {
        if (mapRef.current && !map) {
            const googleMap = new google.maps.Map(mapRef.current, {
                center: defaultLocation,
                zoom: 13,
            });
            setMap(googleMap);

            // Initial marker
            markerRef.current = new google.maps.Marker({
                position: defaultLocation,
                map: googleMap,
            });
        }
    }, [map]);

    return (
        <div
            id="view-field-popup"
            className="absolute inset-0 flex justify-center items-center w-full h-auto"
        >
            <div className="w-3/4 h-auto p-4 bg-white rounded-lg shadow-lg">
                <button
                    className="absolute top-4 right-4 text-xl font-bold"
                    onClick={() => closePopupAction(targetField)}
                >
                    X
                </button>
                <h2 className="mt-3 mb-3 text-2xl font-semibold">View Field</h2>
                <div className="first-sec mb-4">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-gray-100 text-gray-500"
                            readOnly
                            value={targetField.fieldCode}
                        />
                        <label className="text-sm text-gray-500">Field Code</label>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-gray-100 text-gray-500"
                            readOnly
                            value={targetField.fieldName}
                        />
                        <label className="text-sm text-gray-500">Field Name</label>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md bg-gray-100 text-gray-500"
                            readOnly
                            value={targetField.fieldSize}
                        />
                        <label className="text-sm text-gray-500">Field Size</label>
                    </div>
                </div>
                <div className="mb-4 flex gap-4">
                    <img
                        className="w-32 h-32 object-cover"
                        src={!targetField.fieldImage1 ? "https://via.placeholder.com/150" : URL.createObjectURL(targetField.fieldImage1)}
                        alt="Field Image 1"
                    />
                    <img
                        className="w-32 h-32 object-cover"
                        src={!targetField.fieldImage2 ? "https://via.placeholder.com/150" : URL.createObjectURL(targetField.fieldImage2)}
                        alt="Field Image 2"
                    />
                </div>
                <div
                    id="map"
                    ref={mapRef}
                    className="mt-2 mb-4"
                    style={{ width: '100%', height: '200px' }}
                ></div>
                <div className="border-t border-black">
                    <div className="grid grid-cols-2 gap-2 p-2 border-b">
                        <div className="font-bold">Staff Id</div>
                        <div className="font-bold">Staff Name</div>
                    </div>
                    <div className="p-2">
                        {targetField.assignStaffs.map((staffId) => (
                            <div key={staffId} className="grid grid-cols-2 gap-2 mb-2">
                                {handleLoadStaff(staffId)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewFieldPopup;

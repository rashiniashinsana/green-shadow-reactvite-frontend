import {Field} from "../../../models/Field.ts";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/Store.ts";
import {toast} from "react-toastify";
import fieldValidation from "../../../util/validation/FieldValidation.ts";
import {updateField} from "../../../reducers/FieldSlice.tsx";

interface UpdateFieldPopupProps {
    closePopupAction: (data: Field) => void;
    targetField: Field;
}

const UpdateFieldPopup = ({ closePopupAction, targetField }: UpdateFieldPopupProps) => {
    const image1Ref = useRef<HTMLInputElement>(null);
    const image2Ref = useRef<HTMLInputElement>(null);
    const staff = useSelector((state: RootState) => state.staff);
    const [selectedStaffSet, setSelectedStaffSet] = useState<string[]>(targetField.assignStaffs);
    const [field, setField] = useState<Field>({
        fieldCode: targetField.fieldCode,
        fieldName: targetField.fieldName,
        fieldSize: targetField.fieldSize,
        fieldImage1: targetField.fieldImage1,
        fieldImage2: targetField.fieldImage2,
        location: {
            latitude: targetField.location.latitude,
            longitude: targetField.location.longitude,
        },
        assignStaffs: targetField.assignStaffs
    });
    const dispatch = useDispatch();

    const handleSetDefaultImage = (img: File, ref: React.RefObject<HTMLInputElement>) => {
        if (ref.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(img);
            ref.current.files = dataTransfer.files;
        }
    };

    const loadSelectedStaff = () => {
        console.log(selectedStaffSet.length);
        return selectedStaffSet.map((staffId) => {
            const staffMember = staff.find((staff) => staff.staffId === staffId);
            return (<h6 data-id={staffMember?.staffId} onClick={() => {removeSelectedStaff(staffMember?.staffId as string)}}>{staffMember?.firstName} {staffMember?.lastName}</h6>)
        });
    }

    const handleSelectStaff = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const staffId = e.target.value;
        const staffMember = staff.find((staff) => staff.staffId === staffId);
        if (staffMember) {
            const isStaffSelected = selectedStaffSet.includes(staffId);
            if (!isStaffSelected) {
                setSelectedStaffSet([...selectedStaffSet, staffId]);
            } else {
                toast.error('Staff member already selected');
            }
        } else {
            toast.error('Staff member not found');
        }
    }

    useEffect(() => {
        loadSelectedStaff()
    }, [selectedStaffSet]);

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

            googleMap.addListener('click', (e : google.maps.MapMouseEvent) => {
                if (e.latLng) {
                    // Remove previous marker
                    if (markerRef.current) {
                        markerRef.current.setMap(null);
                    }

                    // Set new marker
                    markerRef.current = new google.maps.Marker({
                        position: e.latLng,
                        map: googleMap,
                    });

                    // Update location in field
                    setField((prev) => ({
                        ...prev,
                        location: {
                            latitude: e.latLng!.lat(),
                            longitude: e.latLng!.lng(),
                        },
                    }));
                }
            });
        }
    }, [map]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        setField((prev) => {
            if (files) {
                console.log(files[0]);
                console.log(field.fieldImage1)
                return {
                    ...prev,
                    [name]: files[0] as File, // Ensure it's cast to File
                };
            }
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleUpdateField = () => {
        try {
            if (field.fieldImage1 === null) {
                field.fieldImage1 = image1Ref.current?.files?.[0] as File;
            }
            if (field.fieldImage2 === null) {
                field.fieldImage2 = image2Ref.current?.files?.[0] as File;
            }
            console.log(selectedStaffSet);
            field.assignStaffs = selectedStaffSet;
            if (!fieldValidation(field.fieldName, field.fieldSize, field.fieldImage1, field.fieldImage2)) {
                toast.error('Invalid field data');
                return;
            }
            dispatch(updateField(field));
            toast.success('Field updated successfully');
        } catch (e) {
            console.error(e);
        }
    };

    const removeSelectedStaff = (id:string) => {
        const newSelectedStaffSet = selectedStaffSet.filter((staffId) => staffId !== id);
        setSelectedStaffSet(newSelectedStaffSet)
    }
    return (
        <div className="absolute inset-0 flex justify-center items-center w-full h-auto">
            <div className="w-1/2 h-auto p-6 bg-white rounded-lg shadow-lg relative">

                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => closePopupAction(targetField)}
                >
                    X
                </button>


                <h2 className="mt-3 mb-4 text-2xl font-semibold">Update Field</h2>


                <div className="space-y-4">

                    <div>
                        <label
                            htmlFor="fieldNameInput"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Field Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="fieldNameInput"
                            placeholder="Field Name"
                            defaultValue={targetField.fieldName}
                            name="fieldName"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="fieldSizeInput"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Field Size
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="fieldSizeInput"
                            placeholder="Field Size"
                            defaultValue={targetField.fieldSize}
                            name="fieldSize"
                            onChange={handleChange}
                        />
                    </div>


                    <div>
                        <label
                            htmlFor="image1Input"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Select Image 1
                        </label>
                        <input
                            type="file"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="image1Input"
                            ref={image1Ref}
                            name="fieldImage1"
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="mt-2 py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            onClick={() =>
                                handleSetDefaultImage(
                                    targetField.fieldImage1 as File,
                                    image1Ref
                                )
                            }
                        >
                            Set Old Image 1
                        </button>
                    </div>


                    <div>
                        <label
                            htmlFor="image2Input"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Select Image 2
                        </label>
                        <input
                            type="file"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="image2Input"
                            ref={image2Ref}
                            name="fieldImage2"
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="mt-2 py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            onClick={() =>
                                handleSetDefaultImage(
                                    targetField.fieldImage2 as File,
                                    image2Ref
                                )
                            }
                        >
                            Set Old Image 2
                        </button>
                    </div>

                    {/* Assign Staff */}
                    <div>
                        <label
                            htmlFor="staffSelect"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Select a Staff Member
                        </label>
                        <select
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            id="staffSelect"
                            defaultValue="N/A"
                            onChange={handleSelectStaff}
                        >
                            <option value="N/A">None</option>
                            {staff.map((staffMember) => (
                                <option key={staffMember.staffId} value={staffMember.staffId}>
                                    {staffMember.firstName} {staffMember.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                     <div>
                        <h3 className="text-sm font-medium text-gray-700">Selected Staff</h3>
                        {loadSelectedStaff()}
                    </div>


                    <div
                        id="map"
                        ref={mapRef}
                        className="w-full h-64 mt-4 border border-gray-300 rounded-md"
                    ></div>
                </div>


                <button
                    type="button"
                    className="mt-6 w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={handleUpdateField}
                >
                    Update Field
                </button>
            </div>
        </div>
    );

};

export default UpdateFieldPopup;

import { generateUUID } from '../../../util/generateUUID.ts';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import validateField from '../../../util/validation/FieldValidation.ts';
import { Field } from '../../../models/Field.ts';
import { saveField } from '../../../reducers/FieldSlice.tsx';

interface SaveFieldProps {
    closePopupAction: () => void;
}

const SaveField = ({ closePopupAction }: SaveFieldProps) => {
    const [field, setField] = useState<Field>({
        fieldCode: generateUUID('FIELD'),
        fieldName: '',
        fieldSize: '',
        fieldImage1: null,
        fieldImage2: null,
        location: {
            latitude: 0,
            longitude: 0,
        },
        assignStaffs: [],
    });

    const [image1, setImage1] = useState<File | null>(null);
    const [image2, setImage2] = useState<File | null>(null);

    const dispatch = useDispatch();
    const mapRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const defaultLocation = { lat: 6.0367, lng: 80.217 };

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

            googleMap.addListener('click', (e: google.maps.MapMouseEvent) => {
                if (e.latLng) {
                    if (markerRef.current) {
                        markerRef.current.setMap(null);
                    }

                    markerRef.current = new google.maps.Marker({
                        position: e.latLng,
                        map: googleMap,
                    });

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
                return {
                    ...prev,
                    [name]: files[0] as File,
                };
            }
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const saveBtnAction = () => {
        const { fieldName, fieldSize } = field;

        if (!validateField(fieldName, fieldSize, image1 as File, image2 as File)) {
            toast.error('Please fill all required fields correctly.');
            return;
        }

        field.fieldImage1 = image1;
        field.fieldImage2 = image2;

        try {
            dispatch(saveField(field));
            toast.success('Field saved successfully');
            closePopupAction();
        } catch (error) {
            console.error(error);
            toast.error('Failed to save the field. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={closePopupAction}
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-center mb-6">Save Field</h2>

                <form className="space-y-4">
                    <div>
                        <label htmlFor="fieldName" className="block text-sm font-medium text-gray-700 mb-2">
                            Field Name
                        </label>
                        <input
                            type="text"
                            id="fieldName"
                            name="fieldName"
                            placeholder="Enter field name"
                            value={field.fieldName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="fieldSize" className="block text-sm font-medium text-gray-700 mb-2">
                            Field Size
                        </label>
                        <input
                            type="number"
                            id="fieldSize"
                            name="fieldSize"
                            placeholder="Enter field size"
                            value={field.fieldSize}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="fieldImage1" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Image 1
                        </label>
                        <input
                            type="file"
                            id="fieldImage1"
                            name="fieldImage1"
                            onChange={(e) => setImage1(e.target.files?.[0] || null)}
                            className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="fieldImage2" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Image 2
                        </label>
                        <input
                            type="file"
                            id="fieldImage2"
                            name="fieldImage2"
                            onChange={(e) => setImage2(e.target.files?.[0] || null)}
                            className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Field Location</label>
                        <div
                            id="map"
                            ref={mapRef}
                            className="w-full h-64 rounded-md border border-gray-300"
                        ></div>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600"
                        onClick={saveBtnAction}
                    >
                        Save Field
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SaveField;

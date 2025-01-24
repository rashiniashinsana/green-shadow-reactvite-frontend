import { generateUUID } from "../../../util/generateUUID.ts";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {Log} from "../../../models/Log.ts";
import {RootState} from "../../../store/Store.ts";
import {addLog} from "../../../reducers/LogSlice.tsx";

interface SaveCropDetailsPopup {
    closePopupAction: () => void;
}

const SaveCropDetailsPopup = ({ closePopupAction }: SaveCropDetailsPopup) => {
    const setDate = () => {
        const cropDate = new Date();
        const formattedDate = cropDate.toLocaleDateString('en-US');
        console.log(formattedDate);
        return formattedDate;
    };

    const [crop, setCrop] = useState<Log>({
        logCode: generateUUID('LOG'),
        logDate: setDate() ? setDate() as string : "",
        cropCodes: [],
        logDetail: "",
        fieldCodes: [],
        observedImage: null,
        staffIds: []
    });

    const [fieldSet, setFieldSet] = useState<string[]>([]);
    const [cropSet, setCropSet] = useState<string[]>([]);
    const [staffSet, setStaffSet] = useState<string[]>([]);

    const staff = useSelector((state: RootState) => state.staff);
    const field = useSelector((state: RootState) => state.field);
    const crops = useSelector((state: RootState) => state.crop);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setCrop((prev) => ({
            ...prev,
            [name]: type === "file" && "files" in e.target && e.target.files
                ? e.target.files[0]
                : value,
        }));
    };

    const saveField = (fieldCode: string) => {
        setFieldSet([...fieldSet, fieldCode]);
    };

    const saveCrop = (cropCode: string) => {
        setCropSet([...cropSet, cropCode]);
    };

    const saveStaff = (staffId: string) => {
        setStaffSet([...staffSet, staffId]);
    };

    // const removeField = (fieldCode: string) => {
    //     setFieldSet(fieldSet.filter((field) => field !== fieldCode));
    // };
    //
    // const removeCrop = (cropCode: string) => {
    //     setCropSet(cropSet.filter((crop) => crop !== cropCode));
    // };
    //
    // const removeStaff = (staffId: string) => {
    //     setStaffSet(staffSet.filter((staff) => staff !== staffId));
    // };

    const dispatch = useDispatch();

    const handleSaveLog = () => {
        if (!crop.logDetail) return;

        try {
            crop.fieldCodes = fieldSet;
            crop.cropCodes = cropSet;
            crop.staffIds = staffSet;
            dispatch(addLog(crop));
            toast.success("Log saved successfully.");
            closePopupAction();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="absolute inset-0 flex justify-center items-center w-full h-auto">
            <div className="w-1/2 h-auto p-6 bg-white rounded-lg shadow-lg relative">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => closePopupAction()}
                >
                    X
                </button>
                <h2 className="mt-3 mb-4 text-2xl font-semibold">Save Log</h2>
                <div className="space-y-4">
                    <div>
                        <select
                            id="floatingSelect"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            name={"fieldCodes"}
                            onChange={(e) => saveField(e.target.value)}
                        >
                            <option value="" disabled selected>Select Field</option>
                            {field.map((field) => (
                                <option key={field.fieldCode} value={field.fieldCode}>
                                    {field.fieldName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            name={"cropCodes"}
                            onChange={(e) => saveCrop(e.target.value)}
                        >
                            <option value="" disabled selected>Select Crop</option>
                            {crops.map((crop) => (
                                <option key={crop.cropCode} value={crop.cropCode}>
                                    {crop.cropName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            name={"staffIds"}
                            onChange={(e) => saveStaff(e.target.value)}
                        >
                            <option value="" disabled selected>Select Staff</option>
                            {staff.map((staff) => (
                                <option key={staff.staffId} value={staff.staffId}>
                                    {staff.firstName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <textarea
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            placeholder="Enter your remark here"
                            style={{ height: "150px" }}
                            name="logDetail"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="mt-3 mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Upload Image</label>
                        <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
                            <input
                                type="file"
                                className="w-full text-center text-gray-600"
                                name="observedImage"
                                onChange={handleChange}
                            />
                            <p className="text-sm text-gray-500 mt-2">Drag and drop or browse to select a file.</p>
                        </div>
                    </div>
                    {/*<div className="space-y-2">*/}
                    {/*    {fieldSet.map((fieldCode) => (*/}
                    {/*        <span*/}
                    {/*            key={fieldCode}*/}
                    {/*            className="cursor-pointer text-sm text-blue-600"*/}
                    {/*            onClick={() => removeField(fieldCode)}*/}
                    {/*        >*/}
                    {/*            {fieldCode}*/}
                    {/*        </span>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    {/*<div className="space-y-2">*/}
                    {/*    {staffSet.map((staffId) => (*/}
                    {/*        <span*/}
                    {/*            key={staffId}*/}
                    {/*            className="cursor-pointer text-sm text-blue-600"*/}
                    {/*            onClick={() => removeStaff(staffId)}*/}
                    {/*        >*/}
                    {/*            {staffId}*/}
                    {/*        </span>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    {/*<div className="space-y-2">*/}
                    {/*    {cropSet.map((cropCode) => (*/}
                    {/*        <span*/}
                    {/*            key={cropCode}*/}
                    {/*            className="cursor-pointer text-sm text-blue-600"*/}
                    {/*            onClick={() => removeCrop(cropCode)}*/}
                    {/*        >*/}
                    {/*            {cropCode}*/}
                    {/*        </span>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    <button
                        type="button"
                        className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={handleSaveLog}
                    >
                        Save Log
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveCropDetailsPopup;

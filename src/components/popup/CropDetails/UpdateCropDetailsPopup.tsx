import { useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {Log} from "../../../models/Log.ts";
import {updateLog} from "../../../reducers/LogSlice.tsx";

interface UpdateLogPopupProps {
    closePopupAction: (data: Log) => void;
    targetLog: Log;
}

const UpdateCropDetailsPopup = ({ closePopupAction, targetLog }: UpdateLogPopupProps) => {

    const image1Ref = useRef<HTMLInputElement>(null);
    const [staffData, setStaffData] = useState<Log>(targetLog);
    const loadImageToRef = () => {
        if (image1Ref.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(staffData?.observedImage as File);
            image1Ref.current.files = dataTransfer.files;
        }
    };

    const dispatch = useDispatch();

    useEffect(() => {
        loadImageToRef();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setStaffData((prev) => ({
            ...prev,
            [name]: type === "file" && "files" in e.target && e.target.files
                ? e.target.files[0]
                : value,
        }));
    };

    const updateAction = () => {
        try {
            dispatch(updateLog(staffData));
            toast.success("Log updated successfully.");
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div className="absolute inset-0 flex justify-center items-center w-full h-auto">
            <div className="w-1/2 h-auto p-6 bg-white rounded-lg shadow-lg relative">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => closePopupAction(targetLog)}
                >
                    X
                </button>

                <h2 className="mt-3 mb-4 text-2xl font-semibold">Update Log</h2>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="logDetail"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Details
                        </label>
                        <textarea
                            id="logDetail"
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-600"
                            placeholder="Enter your remark here"
                            style={{ height: "150px" }}
                            value={staffData.logDetail}
                            name="logDetail"
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="mt-3 mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">
                            Upload Image
                        </label>
                        <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
                            <input
                                type="file"
                                className="w-full text-center text-gray-600"
                                name="observedImage"
                                ref={image1Ref}
                                onChange={handleChange}
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Drag and drop or browse to select a file.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={updateAction}
                    >
                        Update Log
                    </button>
                </div>
            </div>
        </div>
    );

};

export default UpdateCropDetailsPopup;

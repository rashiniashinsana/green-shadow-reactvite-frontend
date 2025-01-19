import { dataRefactor } from "../../../util/dataRefactor.ts";
import {Log} from "../../../models/Log.ts";

interface ViewCropDetailsPopupProps {
    closePopupAction: (data: Log) => void;
    targetLog: Log;
}

const ViewCropDetailsPopup = ({ closePopupAction, targetLog }: ViewCropDetailsPopupProps) => {
    return (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="w-11/12 max-w-4xl p-6 bg-white rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800 z-10"
                    onClick={() => closePopupAction(targetLog)}
                >
                    X
                </button>
                <h2 className="mt-3 mb-6 text-2xl font-semibold">View Crop</h2>

                <div className="grid grid-cols-1 gap-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Log Code</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={targetLog.logCode}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Log Date</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={targetLog.logDate}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                        <textarea
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            style={{ height: "150px" }}
                            readOnly
                            value={targetLog.logDetail}
                        ></textarea>
                    </div>

                     <div className="grid grid-cols-3 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Crops</label>
                            {targetLog.cropCodes.map((crop, index) => (
                                <h6 key={index} className="text-sm text-gray-600">{dataRefactor(crop, 10)}</h6>
                            ))}
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Fields</label>
                            {targetLog.fieldCodes.map((field, index) => (
                                <h6 key={index} className="text-sm text-gray-600">{dataRefactor(field, 10)}</h6>
                            ))}
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Staff</label>
                            {targetLog.staffIds.map((staff, index) => (
                                <h6 key={index} className="text-sm text-gray-600">{dataRefactor(staff, 10)}</h6>
                            ))}
                        </div>
                    </div>


                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Observed Image</label>
                        <div className="w-full flex justify-center">
                            <img
                                className="max-w-full max-h-[300px] object-contain rounded-md"
                                src={
                                    !targetLog.observedImage
                                        ? "https://via.placeholder.com/150"
                                        : URL.createObjectURL(targetLog.observedImage)
                                }
                                alt="Observed Crop"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCropDetailsPopup;

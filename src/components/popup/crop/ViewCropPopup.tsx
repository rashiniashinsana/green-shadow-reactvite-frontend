import {Crop} from "../../../models/Crop.ts";

interface ViewCropPopupProps {
    closePopupAction: (id: Crop) => void;
    targetCrop: Crop;
}

const ViewCropPopup = ({ closePopupAction, targetCrop }: ViewCropPopupProps) => {
    return (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="w-11/12 max-w-4xl p-6 bg-white rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800 z-10"
                    onClick={() => closePopupAction(targetCrop)}
                >
                    X
                </button>
                <h2 className="mt-3 mb-6 text-2xl font-semibold">View Crop</h2>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Crop Code</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={targetCrop.cropCode}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Crop Common Name</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={targetCrop.cropName}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Crop Scientific Name</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={targetCrop.cropScientificName}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Crop Season</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={targetCrop.cropSeason}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Crop Category</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={targetCrop.cropType}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Field Code</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={targetCrop.fieldCode === "" ? "None" : targetCrop.fieldCode}
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Crop Image</label>
                        <div className="w-full flex justify-center">
                            <img
                                className="max-w-full max-h-[300px] object-contain rounded-md"
                                src={
                                    !targetCrop.cropImage
                                        ? "https://via.placeholder.com/150"
                                        : URL.createObjectURL(targetCrop.cropImage)
                                }
                                alt="Crop"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCropPopup;

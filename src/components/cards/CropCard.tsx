import { dataRefactor } from "../../util/dataRefactor.ts";
import {Crop} from "../../models/Crop.ts";
import { EyeIcon, PencilIcon, TrashIcon} from "@heroicons/react/20/solid";

interface CropCardProps {
    cropData: Crop;
    handleUpdateCropPopup: (field: Crop) => void;
    handleViewCropPopup: (field: Crop) => void;
    handleDeleteCrop: (id: string) => void;
}
const CropCard = ({ cropData, handleUpdateCropPopup, handleDeleteCrop, handleViewCropPopup }: CropCardProps) => {
    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <div className="w-full overflow-hidden rounded-lg">
                <img
                    className="w-full h-48 object-cover"
                    src={
                        !cropData.cropImage
                            ? "https://via.placeholder.com/150"
                            : URL.createObjectURL(cropData.cropImage)
                    }
                    alt="Crop"
                />
            </div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Crop Code</h3>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {dataRefactor(cropData.cropCode, 20)}
                    </h2>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Crop Season</h3>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {dataRefactor(cropData.cropSeason, 10)}
                    </h2>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Crop Name</h3>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {dataRefactor(cropData.cropName, 30)}
                    </h2>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleUpdateCropPopup(cropData)}
                        className="text-gray-500 hover:text-gray-800">
                        <PencilIcon className="w-6 h-6 text-gray-500 hover:text-blue-500 " />
                    </button>

                    <button
                        onClick={() => handleDeleteCrop(cropData.cropCode)}
                        className="text-gray-500 hover:text-gray-800">
                        <TrashIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
                    </button>

                    <button
                        onClick={() => handleViewCropPopup(cropData)}
                        className="text-gray-500 hover:text-gray-800">
                        <EyeIcon className="w-6 h-6 text-gray-500 hover:text-yellow-200" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CropCard;

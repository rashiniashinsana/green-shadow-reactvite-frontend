import { dataRefactor } from "../../util/dataRefactor.ts";
import {Log} from "../../models/Log.ts";
import {EyeIcon, PencilIcon, TrashIcon} from "@heroicons/react/16/solid";

interface LogCardProps {
    cropDetail: Log;
    handleUpdateLog: (data: Log) => void;
    handleViewLog: (data: Log) => void;
    handleDeleteLog: (id: string) => void;
}

const LogCard = ({ cropDetail, handleUpdateLog, handleViewLog, handleDeleteLog }: LogCardProps) => {
    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            {/* Image */}
            <div className="w-full overflow-hidden rounded-lg">
                <img
                    className="w-full h-48 object-cover"
                    src={
                        !cropDetail.observedImage
                            ? "https://via.placeholder.com/150"
                            : URL.createObjectURL(cropDetail.observedImage)
                    }
                    alt="Observed"
                />
            </div>

            {/* Details */}
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Log Code</h3>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {dataRefactor(cropDetail.logCode, 20)}
                    </h2>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Log Date</h3>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {dataRefactor(cropDetail.logDate, 10)}
                    </h2>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Log Description</h3>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {dataRefactor(cropDetail.logDetail, 30)}
                    </h2>
                </div>
                {/* Actions */}
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleUpdateLog(cropDetail)}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <PencilIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => handleDeleteLog(cropDetail.logCode)}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <TrashIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => handleViewLog(cropDetail)}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <EyeIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogCard;

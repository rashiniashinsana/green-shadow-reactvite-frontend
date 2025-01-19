import { dataRefactor } from "../../util/dataRefactor.ts";
import {Field} from "../../models/Field.ts";
import {EyeIcon, PencilIcon, TrashIcon} from "@heroicons/react/16/solid";

interface FieldCardProps {
    fieldData: Field;
    handleUpdateFieldPopup: (field: Field) => void;
    handleViewFieldPopup: (field: Field) => void;
    handleDeleteField: (id: string) => void;
}

const FieldCard = ({
                       fieldData,
                       handleUpdateFieldPopup,
                       handleDeleteField,
                       handleViewFieldPopup,
                   }: FieldCardProps) => {
    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            {/* Image */}
            <div className="w-full overflow-hidden rounded-lg">
                <img
                    className="w-full h-48 object-cover"
                    src={
                        !fieldData.fieldImage1
                            ? "https://via.placeholder.com/150"
                            : URL.createObjectURL(fieldData.fieldImage1)
                    }
                    alt="Field"
                />
            </div>

            {/* Details */}
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Field Code</h3>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {dataRefactor(fieldData.fieldCode, 20)}
                    </h2>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Field Size</h3>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {fieldData.fieldSize}P
                    </h2>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Field Name</h3>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {dataRefactor(fieldData.fieldName, 15)}
                    </h2>
                </div>
                {/* Actions */}
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleUpdateFieldPopup(fieldData)}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <PencilIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => handleDeleteField(fieldData.fieldCode)}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <TrashIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => handleViewFieldPopup(fieldData)}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <EyeIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FieldCard;

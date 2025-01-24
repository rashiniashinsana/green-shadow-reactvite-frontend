import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { dataRefactor } from "../util/dataRefactor.ts";

interface TableProps {
    headersData: string[];
    bodyData: string[][];
    updatePopupAction?: (id: string) => void;
    deletePopupAction?: (id: string) => void;
    viewPopupAction?: (id: string) => void;
}

const Table = ({
                   headersData,
                   bodyData,
                   updatePopupAction,
                   deletePopupAction,
                   viewPopupAction,
               }: TableProps) => {

    return (
        <div className="mt-5">
            <div className="table border border-gray-200 rounded-lg w-full">

                <div className="tableHead bg-green-500 text-white font-semibold py-3 px-4 rounded-t-lg">
                    <div className="grid grid-cols-[1fr_1.5fr_2fr_2fr_1fr_1fr_1fr_0.25fr]">
                        {headersData?.map((header, index) => (
                            <h5 key={index} className="text-center text-sm">
                                {header}
                            </h5>
                        ))}
                        <h5 className="text-center text-sm ml-10 gap-6 -mr-10">Actions</h5>
                    </div>
                </div>

                <div className="tableBody overflow-y-auto max-h-[56vh] bg-gray-50 ">
                    {bodyData?.map((data, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="grid grid-cols-[1fr_1.5fr_2fr_2fr_1fr_1fr_1fr_0.25fr] text-center items-center py-3 px-4 border-b last:border-b-0 hover:bg-gray-100 transition"
                        >
                            {data.map((cell, cellIndex) => (
                                <h5
                                    key={cellIndex}
                                    className="text-gray-700 text-sm font-normal px-2 overflow-hidden whitespace-nowrap text-ellipsis"
                                >
                                    {dataRefactor(cell, 15)}
                                </h5>
                            ))}

                            <div className="-mr-12 px-10 gap-6">
                                <div className="flex justify-center -mr-10 gap-4">
                                    <div className="-mr-5 px-3 ">
                                        <EyeIcon
                                            onClick={() => viewPopupAction?.(data[0])}
                                            className="h-5 w-5 text-blue-500 hover:text-blue-600 cursor-pointer"
                                        />
                                    </div>
                                    <div className="-mr-5 px-3">
                                        <PencilIcon
                                            onClick={() => updatePopupAction?.(data[0])}
                                            className="h-5 w-5 text-green-500 hover:text-green-600 cursor-pointer"
                                        />
                                    </div>
                                    <div className="-mr-5 px-3">
                                        <TrashIcon
                                            onClick={() => deletePopupAction?.(data[0])}
                                            className="h-5 w-5 text-red-500 hover:text-red-600 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                </div>

                            </div>
                            ))}
                        </div>
                        </div>
                        </div>
                        );
                    };

                    export default Table;

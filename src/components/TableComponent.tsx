import {
    EyeIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/20/solid';

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
        <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm text-gray-700">
                <thead>
                <tr className="bg-green-500 text-white">
                    {headersData.map((header, index) => (
                        <th
                            key={index}
                            className="border border-gray-300 px-4 py-2 text-left font-semibold"
                        >
                            {header}
                        </th>
                    ))}
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {bodyData.map((row, rowIndex) => (
                    <tr
                        key={rowIndex}
                        className="bg-gray-50 hover:bg-emerald-200 transition-all"
                    >
                        {row.map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                className="border border-gray-300 px-4 py-2"
                            >
                                {cellIndex === 3 ? (
                                    <img
                                        src={cell}
                                        alt="Image"
                                        className="w-8 h-8 rounded-full"
                                    />
                                ) : (
                                    cell
                                )}
                            </td>
                        ))}
                        <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center items-center">
                                <span>
                                    <button
                                        type="button"
                                        onClick={() => viewPopupAction?.(row[0])}
                                        className="inline-flex items-center rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        <EyeIcon aria-hidden="true" className="w-5 h-5 text-gray-400"/>
                                    </button>
                                </span>
                            <span>
                                    <button
                                        type="button"
                                        onClick={() => updatePopupAction?.(row[0])}
                                        className="inline-flex items-center rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        <PencilIcon aria-hidden="true" className="w-5 h-5 text-gray-400"/>
                                    </button>
                                </span>
                            <span>
                                    <button
                                        type="button"
                                        onClick={() => deletePopupAction?.(row[0])}
                                        className="inline-flex items-center rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        <TrashIcon aria-hidden="true" className="w-5 h-5 text-gray-400"/>
                                    </button>
                                </span>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

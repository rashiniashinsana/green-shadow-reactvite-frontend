import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Staff } from "../../../models/Staff.ts";
import { RootState } from "../../../store/Store.ts";

interface ViewStaffPopupProps {
    targetStaffId: string;
    closePopupAction: (id: string) => void;
}

const ViewStaffPopup = ({ targetStaffId, closePopupAction }: ViewStaffPopupProps) => {
    const staff = useSelector((state: RootState) => state.staff);
    const [staffData, setStaffData] = useState<Staff | null>(null);

    useEffect(() => {
        const selectedStaff = staff.find((s: Staff) => s.staffId === targetStaffId) || null;
        setStaffData(selectedStaff);
    }, [targetStaffId, staff]);

    return (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="w-11/12 max-w-4xl p-6 bg-white rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
                <button
                    className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-gray-800 z-10"
                    onClick={() => closePopupAction(targetStaffId)}
                >
                    X
                </button>

                <h2 className="mt-3 mb-6 text-2xl font-semibold">View Staff Details</h2>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Staff ID</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={staffData?.staffId}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={staffData?.firstName}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={staffData?.lastName}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={staffData?.designation}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={staffData?.joinDate}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={staffData?.dob}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={staffData?.gender}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={staffData?.Address}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact No.</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={staffData?.contactNo}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={staffData?.email}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <input
                            type="text"
                            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            readOnly
                            value={staffData?.role}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewStaffPopup;

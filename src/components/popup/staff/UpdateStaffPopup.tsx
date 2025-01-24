import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validateStaffMember from "../../../util/validation/StaffValidation.ts";
import { toast } from "react-toastify";
import { Staff } from "../../../models/Staff.ts";
import { updateStaff } from "../../../reducers/StaffSlice.tsx";
import { RootState } from "../../../store/Store.ts";

interface UpdateStaffPopupProps {
    closePopupAction: (id: string) => void;
    targetStaffId: string;
}

const UpdateStaffPopup = ({ closePopupAction, targetStaffId }: UpdateStaffPopupProps) => {
    const staff = useSelector((state: RootState) => state.staff);
    const [staffData, setStaffData] = useState<Staff>({
        staffId: "",
        firstName: "",
        lastName: "",
        designation: "",
        joinDate: "",
        dob: "",
        Address: "",
        contactNo: "",
        email: "",
        role: "",
        gender: "",
    });
    const dispatch = useDispatch();

    useEffect(() => {
        setStaffData(staff.find((staff: Staff) => staff.staffId === targetStaffId) as Staff);
    }, [staff, targetStaffId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStaffData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateAction = () => {
        if (!validateStaffMember(staffData)) {
            return;
        }
        dispatch(updateStaff(staffData));
        toast.success("Staff member updated successfully.");
        closePopupAction("");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-8 relative">
                <button
                    className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-gray-900"
                    onClick={() => closePopupAction("")}
                >
                    x
                </button>
                <h2 className="text-xl font-bold mb-6 text-gray-800">Update Staff Member</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={staffData?.firstName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter First Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={staffData?.lastName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter Last Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={staffData?.designation}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter Designation"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Join Date</label>
                        <input
                            type="date"
                            name="joinDate"
                            value={staffData?.joinDate}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={staffData?.dob}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={staffData?.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="FEMALE">Female</option>
                            <option value="MALE">Male</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="Address"
                            value={staffData?.Address}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter Address"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact No.</label>
                        <input
                            type="number"
                            name="contactNo"
                            value={staffData?.contactNo}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter Contact No."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={staffData?.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter Email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            name="role"
                            value={staffData?.role}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMINISTRATIVE">Administrative</option>
                            <option value="SCIENTIST">Scientist</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                </div>
                <button
                    onClick={updateAction}
                    className="mt-6 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                >
                    Update Staff Member
                </button>
            </div>
        </div>
    );
};

export default UpdateStaffPopup;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validateStaffMember from "../../../util/validation/StaffValidation.ts";
import { toast } from "react-toastify";
import {RootState} from "../../../store/Store.ts";
import {Staff} from "../../../models/Staff.ts";
import {updateStaff} from "../../../reducers/StaffSlice.tsx";

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
        gender: ""
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
    };

    return (
        <div className="absolute inset-0 flex justify-center items-center w-full h-auto">
            <div className="w-3/4 p-4 bg-white rounded shadow-md">
                <button
                    className="absolute top-2 right-2 text-xl"
                    onClick={() => closePopupAction("")}
                >
                    &times;
                </button>
                <h2 className="mt-3 mb-3 text-xl font-semibold">Update Staff Member</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={staffData.firstName}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={staffData.lastName}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
                            <input
                                type="text"
                                id="designation"
                                name="designation"
                                value={staffData.designation}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">Join Date</label>
                            <input
                                type="date"
                                id="joinDate"
                                name="joinDate"
                                value={staffData.joinDate}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={staffData.dob}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={staffData.gender}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="FEMALE">Female</option>
                                <option value="MALE">Male</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="Address"
                                value={staffData.Address}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">Contact No.</label>
                            <input
                                type="number"
                                id="contactNo"
                                name="contactNo"
                                value={staffData.contactNo}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={staffData.email}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={staffData.role}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="MANAGER">Manager</option>
                                <option value="ADMINISTRATIVE">Administrative</option>
                                <option value="SCIENTIST">Scientist</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <button
                            type="button"
                            className="mt-4 w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                            onClick={updateAction}
                        >
                            Update Staff Member
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateStaffPopup;

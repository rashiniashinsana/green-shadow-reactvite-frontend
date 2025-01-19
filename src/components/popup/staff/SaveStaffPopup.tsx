import React, { useState } from "react";
import { useDispatch } from "react-redux";
import validateStaffMember from "../../../util/validation/StaffValidation.ts";
import { toast } from "react-toastify";
import { generateUUID } from "../../../util/generateUUID.ts";
import { Staff } from "../../../models/Staff.ts";
import { saveStaff } from "../../../reducers/StaffSlice.tsx";

interface AddStaffPopupProps {
    closePopupAction: () => void;
}

const SaveStaffPopup = ({ closePopupAction }: AddStaffPopupProps) => {
    const [staffMember, setStaffMember] = useState<Staff>({
        staffId: generateUUID("STAFF"),
        firstName: "",
        lastName: "",
        designation: "",
        joinDate: "",
        dob: "",
        gender: "",
        Address: "",
        contactNo: "",
        email: "",
        role: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStaffMember((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "", // Clear error on user input
        }));
    };

    const saveBtnAction = async () => {
        const validationErrors = validateStaffMember(staffMember);
        console.log("Validation Errors:", validationErrors); // Debug log
        if (Object.keys(validationErrors).length > 0) {
            // @ts-ignore
            setErrors(validationErrors); // Show errors to the user
            return;
        }

        try {
            await dispatch(saveStaff(staffMember)); // Ensure `saveStaff` handles async
            toast.success("Staff member saved successfully.");
            closePopupAction();
        } catch (error) {
            console.error("Error saving staff member:", error);
            toast.error("Failed to save staff member. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="w-1/2 bg-white p-8 rounded-lg shadow-lg relative">
                <button
                    className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-gray-900"
                    onClick={closePopupAction}
                >
                    x
                </button>
                <h2 className="text-2xl font-semibold mb-6">Save Staff Member</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            className={`mt-1 block w-full px-4 py-2 border ${
                                errors.firstName ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm`}
                            name="firstName"
                            value={staffMember.firstName}
                            placeholder="First Name"
                            onChange={handleChange}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className={`mt-1 block w-full px-4 py-2 border ${
                                errors.lastName ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm`}
                            name="lastName"
                            value={staffMember.lastName}
                            placeholder="Last Name"
                            onChange={handleChange}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                        <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                            Designation
                        </label>
                        <input
                            type="text"
                            className={`mt-1 block w-full px-4 py-2 border ${
                                errors.designation ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm`}
                            name="designation"
                            value={staffMember.designation}
                            placeholder="Designation"
                            onChange={handleChange}
                        />
                        {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
                    </div>
                    <div>
                        <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">
                            Join Date
                        </label>
                        <input
                            type="date"
                            className={`mt-1 block w-full px-4 py-2 border ${
                                errors.joinDate ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm`}
                            name="joinDate"
                            value={staffMember.joinDate}
                            onChange={handleChange}
                        />
                        {errors.joinDate && <p className="text-red-500 text-sm mt-1">{errors.joinDate}</p>}
                    </div>
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            className={`mt-1 block w-full px-4 py-2 border ${
                                errors.dob ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm`}
                            name="dob"
                            value={staffMember.dob}
                            onChange={handleChange}
                        />
                        {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <select
                            className={`mt-1 block w-full px-4 py-2 border ${
                                errors.gender ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm`}
                            name="gender"
                            value={staffMember.gender}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select an option
                            </option>
                            <option value="FEMALE">Female</option>
                            <option value="MALE">Male</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            className={`mt-1 block w-full px-4 py-2 border ${
                                errors.address ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm`}
                            name="address"
                            value={staffMember.Address}
                            placeholder="Address"
                            onChange={handleChange}
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                    <div>
                        <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
                            Contact No.
                        </label>
                        <input
                            type="number"
                            className={`mt-1 block w-full px-4 py-2 border ${
                                errors.contactNo ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm`}
                            name="contactNo"
                            value={staffMember.contactNo}
                            placeholder="Contact No."
                            onChange={handleChange}
                        />
                        {errors.contactNo && <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`mt-1 block w-full px-4 py-2 border ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm`}
                            name="email"
                            value={staffMember.email}
                            placeholder="Email"
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            className={`mt-1 block w-full px-4 py-2 border ${
                                errors.role ? "border-red-500" : "border-gray-300"
                            } rounded-md shadow-sm`}
                            name="role"
                            value={staffMember.role}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select an option
                            </option>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMINISTRATIVE">Administrative</option>
                            <option value="SCIENTIST">Scientist</option>
                            <option value="OTHER">Other</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                    </div>
                </div>
                <button
                    type="button"
                    className="mt-8 w-full py-3 bg-green-500 text-white font-semibold rounded-md shadow-lg hover:bg-green-600"
                    onClick={saveBtnAction}
                >
                    Save Staff Member
                </button>
            </div>
        </div>
    );
};

export default SaveStaffPopup;

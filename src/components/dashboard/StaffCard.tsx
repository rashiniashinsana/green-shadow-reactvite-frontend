import { useSelector } from 'react-redux';
import { Staff } from "../../models/Staff.ts";
import { RootState } from "../../store/Store.ts";
import { FaUser, FaEnvelope, FaPhone, FaUserTie } from 'react-icons/fa';

function StaffWidget() {
    const staffMembers: Staff[] = useSelector((state: RootState) => state.staff);

    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4 text-center">Staff Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3  gap-4">
                {staffMembers.map((staff) => (
                    <div
                        key={staff.staffId}
                        className="bg-green-100 text-center py-4 rounded-lg flex flex-col items-center"
                    >

                        {staff.role === 'Manager' && <FaUserTie className="text-3xl mb-2 text-blue-500" />}
                        {staff.role === 'Administrative' && <FaUserTie className="text-3xl mb-2 text-amber-500" />}
                        {staff.role === 'Scientist' && <FaUserTie className="text-3xl mb-2 text-purple-500" />}


                        <h3 className="text-sm font-semibold mb-1">
                            <FaUser className="inline-block mr-1" /> {staff.firstName} {staff.lastName}
                        </h3>
                        <p className="text-xs text-gray-500 mb-1">
                            <FaEnvelope className="inline-block mr-1" /> {staff.email}
                        </p>
                        <p className="text-xs text-gray-500 mb-1">
                            <FaPhone className="inline-block mr-1" /> {staff.contactNo}
                        </p>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default StaffWidget;

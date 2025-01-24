import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {convertStaffArrayTo2DArray} from "../../util/ArrayTo2DArray.ts";
import Swal from 'sweetalert2';
import HeaderComponent from "../pageheader/HeaderComponent.tsx";
import {Staff} from "../../models/Staff.ts";
import {deleteStaff} from "../../reducers/StaffSlice.tsx";
import AddStaffPopup from "../popup/staff/SaveStaffPopup.tsx";
import ViewStaffPopup from "../popup/staff/ViewStaffPopup.tsx";
import Table from "../TableComponent.tsx";
import UpdateStaffPopup from "../popup/staff/UpdateStaffPopup.tsx";

const StaffWall = () => {
    const dataHeaders = [ "Staff Id" , "First Name" , "Last Name" , "Gender" , "Contact No" ]
    const [addStaffPopup, setAddStaffPopup] = useState(false)
    const staff = useSelector((state: { staff: Staff[] }) => state.staff)
    const [search, setSearch] = useState('')
    const [staff2DArray, setStaff2DArray] = useState(convertStaffArrayTo2DArray(staff))
    const [updateStaffPopup, setUpdateStaffPopup] = useState(false)
    const [viewStaffPopup, setViewStaffPopup] = useState(false)
    const [targetStaff, setTargetStaff] = useState<string>("")
    const dispatch = useDispatch()

    const handleAddStaffPopup = () => {
        setAddStaffPopup(!addStaffPopup)
    }

    const handleUpdateStaffPopup = (id:string) => {
        setUpdateStaffPopup(!updateStaffPopup)
        setTargetStaff(id)
    }

    const  handelDeleteStaff = (id:string) => {
        document.body.classList.remove('swal2-height-auto');
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this staff?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteStaff(id))
                Swal.fire("Deleted!", "Staff has been deleted.", "success");
            } else {
                Swal.fire("Cancelled", "Staff deletion cancelled", "info");
            }
        })
    }

    const handleViewStaffPopup = (id:string) => {
        setViewStaffPopup(!viewStaffPopup)
        setTargetStaff(id)
    }

    useEffect(() => {
        const filteredStaff = convertStaffArrayTo2DArray(staff).filter((staff: string[]) => {
            return staff.some((staffData: string) =>
                staffData.toLowerCase().includes(search.toLowerCase())
            );
        });

        setStaff2DArray(filteredStaff);
    }, [search, staff])

    return(
        <>
            {addStaffPopup && <AddStaffPopup closePopupAction={handleAddStaffPopup} />}
            {updateStaffPopup && <UpdateStaffPopup closePopupAction={handleUpdateStaffPopup} targetStaffId={targetStaff} />}
            {viewStaffPopup && <ViewStaffPopup targetStaffId={targetStaff} closePopupAction={handleViewStaffPopup} />}
            <div className="w-100 p-5 bg-transparent" id="staff-wall">
                <HeaderComponent section={"Staff Management"} button={"Add Staff"} addPopupAction={handleAddStaffPopup} searchAction={setSearch} />
                <Table headersData={dataHeaders} bodyData={staff2DArray} updatePopupAction={handleUpdateStaffPopup} deletePopupAction={handelDeleteStaff} viewPopupAction={handleViewStaffPopup} />
            </div>
        </>
    )
}

export default StaffWall
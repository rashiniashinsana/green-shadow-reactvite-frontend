import  {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {convertEquipmentArrayTo2DArray} from "../../util/ArrayTo2DArray.ts";
import {Equipment} from "../../models/Equipment.ts";
import Swal from "sweetalert2";
import {deleteEquipment} from "../../reducers/EquipmentSlice.tsx";
import UpdateEquipmentPopup from "../popup/equipment/UpdateEquipmentPopup.tsx";
import SaveEquipmentPopup from "../popup/equipment/SaveEquipmentPopup.tsx";
import ViewEquipmentPopup from "../popup/equipment/ViewEquipmentPopup.tsx";
import HeaderComponent from "../pageheader/HeaderComponent.tsx";
import Table from "../TableComponent.tsx";

const EquipmentWall = () => {
    const dataHeaders = ["equipment Id", "Name", "equipment Type", "status"];
    const [savePopup, setSavePopup] = useState(false);
    const [updatePopup, setUpdatePopup] = useState(false);
    const [viewPopup, setViewPopup] = useState(false);
    const [search, setSearch] = useState("");
    const equipmentData = useSelector((state: { equipment: Equipment[] }) => state.equipment);
    const [filteredData, setFilteredData] = useState(convertEquipmentArrayTo2DArray(equipmentData));
    const [targetEquipment, setTargetEquipment] = useState("");
    const dispatch = useDispatch();

    const handleSavePopup = () => {
        setSavePopup(!savePopup);
    };

    const handleUpdatePopup = (id: string) => {
        setUpdatePopup(!updatePopup);
        setTargetEquipment(id);
    };

    useEffect(() => {
        console.log(equipmentData);
        console.log(convertEquipmentArrayTo2DArray(equipmentData));
        const filteredEquipment = convertEquipmentArrayTo2DArray(equipmentData).filter((equipment: string[]) => {
            return equipment.some((equipmentData: string) =>
                equipmentData.toLowerCase().includes(search.toLowerCase())
            );
        });

        setFilteredData(filteredEquipment);
    }, [search, equipmentData]);

    const handleViewPopup = (id: string) => {
        setViewPopup(!viewPopup);
        setTargetEquipment(id);
    };

    const handleDeleteEquipment = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this Equipment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteEquipment(id));
                Swal.fire("Deleted!", "Equipment has been deleted.", "success");
            } else {
                Swal.fire("Cancelled", "Equipment deletion cancelled", "info");
            }
        });
    };

    return (
        <>
            {savePopup && <SaveEquipmentPopup closePopupAction={handleSavePopup} />}
            {updatePopup && <UpdateEquipmentPopup closePopupAction={handleUpdatePopup} targetEquipment={targetEquipment} />}
            {viewPopup && <ViewEquipmentPopup closePopupAction={handleViewPopup} targetEquipmentId={targetEquipment} />}
            <div className="w-100 p-5 bg-transparent" id="equipment-wall">
                <HeaderComponent section={"Equipment Management"} button={"Add Equipment"} addPopupAction={handleSavePopup} searchAction={setSearch} />
                <Table headersData={dataHeaders} bodyData={filteredData} updatePopupAction={handleUpdatePopup} viewPopupAction={handleViewPopup} deletePopupAction={handleDeleteEquipment} />
            </div>
        </>
    );
};

export default EquipmentWall;

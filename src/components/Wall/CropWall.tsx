import { Crop } from "../../models/Crop.ts";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "../../models/Field.ts";
import { Log } from "../../models/Log.ts";
import Swal from "sweetalert2";
import UpdateCropPopup from "../popup/crop/UpdateCropPopup.tsx";
import SaveCropPopup from "../popup/crop/SaveCropPopup.tsx";
import ViewCropPopup from "../popup/crop/ViewCropPopup.tsx";
import HeaderComponent from "../pageheader/HeaderComponent.tsx";
import {useEffect, useState} from "react";
import { deleteCrop } from "../../reducers/CropSlice.tsx";
import CardSet from "../CardSet.tsx";

const CropWall = () => {
    const [saveCropPopup, setSaveCropPopup] = useState(false);
    const [updateCropPopup, setUpdateCropPopup] = useState(false);
    const [viewCropPopup, setViewCropPopup] = useState(false);
    const cropData = useSelector((state: { crop: Crop[] }) => state.crop);
    const [targetCrop, setTargetCrop] = useState<Crop>({} as Crop);
    const [crops, setCrops] = useState(cropData);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const handleSaveCropPopup = () => {
        setSaveCropPopup(!saveCropPopup);
    };

    const handleUpdatePopup = (data: Crop | Field | Log) => {
        if ('cropName' in data && 'cropCode' in data) {
            setTargetCrop(data as Crop); // Type narrowed to Crop
            setUpdateCropPopup((prev) => !prev);
        }
    };

    const handleViewCropPopup = (data: Crop | Field | Log) => {
        console.log(data)
        if ('cropName' in data && 'cropCode' in data) {
            setTargetCrop(data as Crop); // Type narrowed to Crop
            setViewCropPopup((prev) => !prev);
        }
    };

    // Filtered crop data based on search, without modifying state unnecessarily
    const filteredCropData = crops.filter((crop: Crop) =>
        crop.cropName.toLowerCase().includes(search.toLowerCase())
    );


    const handeleDeleteCrop = (cropId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this crop?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCrop(cropId));
                Swal.fire("Deleted!", "Crop has been deleted.", "success");
            } else {
                Swal.fire("Cancelled", "Crop deletion cancelled", "info");
            }
        });
    };

    useEffect(() => {
        const filteredCrop = cropData.filter((crop: Crop) => {
            return crop.cropName.toLowerCase().includes(search.toLowerCase())
        })
        setCrops(filteredCrop)
    }, [search, crops]);


    return (
        <>
            {saveCropPopup && <SaveCropPopup closePopupAction={handleSaveCropPopup} />}
            {updateCropPopup && <UpdateCropPopup handleCloseUpdateCropPopup={handleUpdatePopup} targetCrop={targetCrop} />}
            {viewCropPopup && <ViewCropPopup targetCrop={targetCrop} closePopupAction={handleViewCropPopup} />}
            <div className="w-100 p-5 bg-transparent" id="staff-wall">
                <HeaderComponent section={"Crop Management"} button={"Add Crop"} addPopupAction={handleSaveCropPopup} searchAction={setSearch} />
                <CardSet cardType={"crop"} cardSet={filteredCropData} handleUpdatePopup={handleUpdatePopup} handleViewPopup={handleViewCropPopup} handleDeletePopup={handeleDeleteCrop} />
            </div>
        </>
    );
};

export default CropWall;

import { useSelector } from "react-redux";
import { useState } from "react";
import HeaderComponent from "../components/pageheader/HeaderComponent";
import ViewCropPopup from "../components/popup/crop/ViewCropPopup";
import { Crop } from "../models/Crop";
import { Field } from "../models/Field";
import { Log } from "../models/Log";

export function Dashboard() {
    const [search, setSearch] = useState(""); // State for search input
    const [viewCropPopup, setViewCropPopup] = useState(false); // State for crop popup visibility
    const [targetCrop, setTargetCrop] = useState<Crop | null>(null); // State for selected crop

    // @ts-ignore
    const crops = useSelector((state) => state.crop); // Redux crops data

    // Function to handle viewing crop details in the popup
    const handleViewCropPopup = (data: Crop | Field | Log | null) => {
        if (data && "cropName" in data && "cropCode" in data) {
            setTargetCrop(data as Crop); // Type narrowed to Crop
        } else {
            setTargetCrop(null); // Reset target crop if no data is passed
        }
        setViewCropPopup((prev) => !prev); // Toggle popup visibility
    };

    // Filtered crop data based on the search term
    const filteredCropData = crops?.filter((crop: Crop) =>
        crop.cropName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {/* Show Crop Popup */}
            {viewCropPopup && targetCrop && (
                <ViewCropPopup
                    targetCrop={targetCrop}
                    closePopupAction={() => handleViewCropPopup(null)}
                />
            )}

            {/* Header Section */}
            <HeaderComponent
                section="Dashboard"
                button="Crop Details"
                addPopupAction={() => handleViewCropPopup(null)}
                searchAction={setSearch}
            />

            {/* Crop List */}
            <div className="crop-list">
                {filteredCropData?.map((crop: Crop) => (
                    <div
                        key={crop.cropCode}
                        className="crop-item"
                        onClick={() => handleViewCropPopup(crop)}
                    >
                        <h3>{crop.cropName}</h3>
                        <p>Code: {crop.cropCode}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;

import {useSelector} from "react-redux";
import {Crop} from "../models/Crop.ts";

export function Dashboard() {

    // @ts-ignore
    const crops = useSelector((state) =>state.crop);

    return (
        <>
            Dashboard
            {crops.map((crops: Crop) => (
                <div key={crops.cropCode}>{crops.cropCommonName + ' ' + crops.cropScientificName + ' ' + crops.cropImage + ' '  + crops.category + ' ' + crops.cropSeason + ' ' + crops.fieldCode + ' ' }</div>))}


        </>
    );
}
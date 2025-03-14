import { useSelector } from "react-redux";
import { RootState } from "../../store/Store.ts";
import { Equipment } from "../../models/Equipment.ts";
import { Crop } from "../../models/Crop.ts";
import { Field } from "../../models/Field.ts";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function BarChart() {
    const crops: Crop[] = useSelector((state: RootState) => state.crop);
    const equipment: Equipment[] = useSelector((state: RootState) => state.equipment);
    const fields: Field[] = useSelector((state: RootState) => state.field);

    const cropYieldData = crops.reduce<{ [key: string]: number }>((acc, crop) => {
        // @ts-ignore
        acc[crop.cropType] = (acc[crop.cropType] || 0) + crop.cropSeason;
        return acc;
    }, {});


    const equipmentAvailabilityData = crops.reduce<{ [key: string]: number }>((acc, crop) => {
        const fieldEquipments = fields
            .filter(field => field.fieldCode === crop.fieldCode)
            .flatMap(field => equipment.filter(equip => equip.fieldId === field.fieldCode));
        acc[crop.cropType] = (acc[crop.cropType] || 0) + fieldEquipments.length;
        return acc;
    }, {});

    const cropTypes = Object.keys(cropYieldData);

    const options = {
        chart: {
            type: "column",
            style: { fontFamily: "Roboto Flex" },
        },
        title: {
            text: 'Crop Yield & Equipment Availability',
        },
        xAxis: {
            categories: cropTypes,
            title: { text: 'Crop Type' },
            labels: { style: { fontSize: '12px' } },
        },
        yAxis: {
            min: 0,
            title: { text: 'Total' },
            labels: { style: { fontSize: '12px' } },
        },
        tooltip: {
            shared: true,
            pointFormat: "<span style='color:{series.color}'>{series.name}</span>: <b>{point.y}</b><br/>",
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    style: { fontFamily: "Roboto Flex", fontSize: "12px" },
                },
            },
        },
        series: [
            {
                name: "Crop Yield (kg)",
                data: cropTypes.map((type) => cropYieldData[type] || 0),
                color: "#7cb5ec",
            },
            {
                name: "Equipment Availability",
                data: cropTypes.map((type) => equipmentAvailabilityData[type] || 0),
                color: "#f45b5b",
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default BarChart;

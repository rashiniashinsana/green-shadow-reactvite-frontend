import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {Crop} from "../../models/Crop.ts";
import {RootState} from "../../store/Store.ts";

function PieChart() {
    const crops: Crop[] = useSelector((state: RootState) => state.crop);


    const cropCategoryData = crops.reduce<{ [key: string]: number }>((acc, crop) => {
        acc[crop.cropType] = (acc[crop.cropType] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(cropCategoryData).map(([category, count]) => ({
        name: category,
        y: count,
    }));

    const options = {
        chart: {
            type: "pie",
            style: {
                fontFamily: "Roboto Flex",
            },
        },
        title: {
            text: 'Crop Distribution by Category',
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    style: {
                        fontFamily: "Roboto Flex",
                        fontSize: "15px",
                    },
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                },
            },
        },
        series: [
            {
                name: "Crop",
                colorByPoint: true,
                data: chartData,
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default PieChart;

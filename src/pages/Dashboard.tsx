import { GiFarmTractor } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";
import { useSelector } from "react-redux";
import BarChart from "../components/dashboard/BarChart.tsx";
import PieChart from "../components/dashboard/PieChart.tsx";
import { RootState } from "../store/Store.ts";
import Header from "../components/dashboard/Header.tsx";
import LogsWidget from "../components/dashboard/LogCard.tsx";
import StaffCard from "../components/dashboard/StaffCard.tsx";

function Dashboard() {
    const crops = useSelector((state: RootState) => state.crop);
    const equipment = useSelector((state: RootState) => state.equipment);
    const fields = useSelector((state: RootState) => state.field);

    const totalCrops = crops?.length || 0;
    const totalEquipment = equipment?.length || 0;
    const totalFields = fields?.length || 0;

    const stats = [
        { title: "Total Crops", value: totalCrops, icon: FaSeedling, color: "bg-green-500" },
        { title: "Total Equipment", value: totalEquipment, icon: GiFarmTractor, color: "bg-blue-500" },
        { title: "Total Fields", value: totalFields, icon: IoMdStats, color: "bg-purple-500" },
    ];

    return (
        <div className="p-6 space-y-6">
            <Header/>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center p-6 bg-white shadow-md rounded-lg">
                        <stat.icon className={`h-12 w-12 text-white p-3 rounded-full ${stat.color} mr-4`}/>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700">{stat.title}</h2>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>



            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">Crops</h2>
                        <button className="text-sm text-green-500 font-semibold">View All</button>
                    </div>
                    <BarChart/>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center">
                    <PieChart/>
                </div>

            </div>


            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                <LogsWidget/>

                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
                    <StaffCard/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

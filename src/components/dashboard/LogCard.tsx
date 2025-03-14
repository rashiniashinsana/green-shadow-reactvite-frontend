import { useSelector } from "react-redux";
import { Log } from "../../models/Log.ts";
import { RootState } from "../../store/Store.ts";

function LogsWidget() {
    const logs: Log[] = useSelector((state: RootState) => state.log);


    const today = new Date().toISOString().split("T")[0];

    const todayLogs = logs.filter((log) => log.logDate === today);

    return (
        <div className="bg-white shadow-lg rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Today's Logs</h2>
                <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                    {todayLogs.length} {todayLogs.length === 1 ? "Log" : "Logs"}
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {todayLogs.length > 0 ? (
                    todayLogs.map((log) => (
                        <div
                            key={log.logCode}
                            className="bg-green-100 text-green-800 p-3 rounded-lg flex flex-col items-center justify-center shadow-md w-24 h-24"
                        >
                            {log.observedImage && (
                                <img
                                    src={URL.createObjectURL(log.observedImage)}
                                    alt="Observation"
                                    className="w-12 h-12 rounded-md object-cover mb-2"
                                />
                            )}
                            <p className="text-xs font-semibold text-center">{log.logDetail}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 p-3 rounded col-span-full text-center">No logs for today.</div>
                )}
            </div>
        </div>
    );
}

export default LogsWidget;

import { Cpu, HardDrive, Settings } from "lucide-react";
import { useState, useEffect } from "react";

function MainContent() {
  const [systemData, setSystemData] = useState({
    cpu: { temp: 0, usage: 0, model: "" },
    board: { model: "", temp: 0 },
    nvme: { model: "", temp: 0, totalGB: 0, usedGB: 0, freeGB: 0 },
  });

  const getTempColor = (temp) => {
    if (temp < 50) return "text-green-400";
    if (temp < 80) return "text-yellow-400";
    return "text-red-500";
  };

  useEffect(() => {
    async function fetchSystemData() {
      try {
        const res = await fetch("http://127.0.0.1:8000/sysInfo");
        const data = await res.json();
        setSystemData(data);
      } catch (error) {
        console.error("Error fetching system data:", error);
      }
    }

    fetchSystemData();
    const interval = setInterval(fetchSystemData, 5000);
    return () => clearInterval(interval);
  }, []);

  const nvmeUsagePercent =
    systemData.nvme.totalGB > 0
      ? ((systemData.nvme.usedGB / systemData.nvme.totalGB) * 100).toFixed(1)
      : 0;

  return (
    <div className="space-y-6">
      {/* CPU */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold">CPU</h3>
        </div>
        <p className="text-gray-400 text-sm mb-4">{systemData.cpu.model}</p>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Usage</span>
            <span className="font-semibold text-lg">
              {systemData.cpu.usage.toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Temperature</span>
            <span
              className={`font-semibold text-lg ${getTempColor(
                systemData.cpu.temp
              )}`}
            >
              {systemData.cpu.temp.toFixed(1)}°C
            </span>
          </div>
        </div>
      </div>

      {/* Motherboard */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold">Motherboard</h3>
        </div>
        <p className="text-gray-400 text-sm mb-4">{systemData.board.model}</p>
        <div className="flex justify-between">
          <span className="text-gray-400">Temperature</span>
          <span
            className={`font-semibold text-lg ${getTempColor(
              systemData.board.temp
            )}`}
          >
            {systemData.board.temp.toFixed(1)}°C
          </span>
        </div>
      </div>

      {/* Storage */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <HardDrive className="w-6 h-6 text-orange-400" />
          <h3 className="text-xl font-semibold">Storage</h3>
        </div>
        <p className="text-gray-400 text-sm mb-4">{systemData.nvme.model}</p>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Usage</span>
            <span className="font-semibold text-lg">{nvmeUsagePercent}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Temperature</span>
            <span
              className={`font-semibold text-lg ${getTempColor(
                systemData.nvme.temp
              )}`}
            >
              {systemData.nvme.temp.toFixed(1)}°C
            </span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Total:</span>
            <span>{systemData.nvme.totalGB} GB</span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Used:</span>
            <span>{systemData.nvme.usedGB} GB</span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Free:</span>
            <span>{systemData.nvme.freeGB} GB</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;

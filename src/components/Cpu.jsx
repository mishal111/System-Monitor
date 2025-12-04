import { Cpu as CpuIcon } from "lucide-react";
import { useState, useEffect } from "react";

function CpuCard() {
  const [systemData, setSystemData] = useState({
    cpu: { temp: 0, usage: 0, model: "Loading..." },
  });

  const getTempColor = (temp) => {
    if (temp < 50) return "text-green-400";
    if (temp < 80) return "text-yellow-400";
    return "text-red-500";
  };

  useEffect(() => {
    
    const fetchCpuInfo = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/cpuInfo");
        const data = await res.json();
        
        setSystemData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };


    fetchCpuInfo();

    const interval = setInterval(fetchCpuInfo, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <CpuIcon className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">CPU Status</h3>
      </div>

      <p className="text-gray-400 text-sm mb-6 h-5">
        {systemData.cpu.model}
      </p>

      <div className="space-y-4">

        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <span className="text-gray-400">Usage</span>
          <span className="font-semibold text-lg text-white">
            {systemData.cpu.usage ? systemData.cpu.usage.toFixed(1) : 0}%
          </span>
        </div>

        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <span className="text-gray-400">Temperature</span>
          <span
            className={`font-semibold text-lg ${getTempColor(
              systemData.cpu.temp
            )}`}
          >
            {systemData.cpu.temp ? systemData.cpu.temp.toFixed(1) : 0}°C
          </span>
        </div>
      </div>
    </div>
  );
  
}

export default CpuCard;
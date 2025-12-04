import { useState,useEffect } from "react"
import { HardDrive } from "lucide-react"

function NVME(){
    const[systemData,setSystemData]=useState({
        memory:{
            name:"Loading...",
            temp:0,
            totalGB:0,
            usedGB:0,
            freeGB:0,
        },
    })
    const getTempColor = (temp) => {
    if (temp < 50) return "text-green-400";
    if (temp < 80) return "text-yellow-400";
    return "text-red-500";
  };

  useEffect(()=>{
    const fetchMemoryInfo = async()=>  {
        try{
            const res = await fetch ("http://127.0.0.1:8000/nvmeInfo");
            const data = await res.json();

            setSystemData(data);
        }
        catch(error){
            console.error("Error:",error);
        }
    };

    fetchMemoryInfo();
    const interval = setInterval(fetchMemoryInfo,1000);
    return()=>clearInterval(interval);
  },[])

  return(
    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <HardDrive className="w-6 h-6 text-green-400" />
        <h3 className="text-xl font-semibold text-white">Memory Status</h3>
      </div>

      <p className="text-gray-400 text-sm mb-6 h-5">
        {systemData.memory.name}
      </p>

      <div className="space-y-4">

        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <span className="text-gray-400">Total</span>
          <span className="font-semibold text-lg text-white">
            {systemData.memory.totalGB? systemData.memory.totalGB.toFixed(1) : 0}GB
          </span>
        </div>
        
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <span className="text-gray-400">Used</span>
          <span className="font-semibold text-lg text-white">
            {systemData.memory.usedGB? systemData.memory.usedGB.toFixed(1) : 0}GB
          </span>
        </div>

        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <span className="text-gray-400">Free</span>
          <span className="font-semibold text-lg text-white">
            {systemData.memory.freeGB? systemData.memory.freeGB.toFixed(1) : 0}GB
          </span>
        </div>

        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <span className="text-gray-400">Temperature</span>
          <span
            className={`font-semibold text-lg ${getTempColor(
              systemData.memory.temp
            )}`}
          >
            {systemData.memory.temp ? systemData.memory.temp.toFixed(1) : 0}°C
          </span>
        </div>
      </div>
    </div>
  );

}
export default NVME
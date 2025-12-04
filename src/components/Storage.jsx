import { Settings } from "lucide-react";
import { useState,useEffect} from "react";
function Storage(){

    const[systemData,setSystemData]=useState({
        board:{name:"Loading",temp:0},
    })
    const getTempColor = (temp) => {
    if (temp < 50) return "text-green-400";
    if (temp < 80) return "text-yellow-400";
    return "text-red-500";
  };

  useEffect(()=>{
    const fetchBoardInfo = async()=>  {
        try{
            const res = await fetch ("http://127.0.0.1:8000/boardInfo");
            const data = await res.json();

            setSystemData(data);
        }
        catch(error){
            console.error("Error:",error);
        }
    };

    fetchBoardInfo();
    const interval = setInterval(fetchBoardInfo,1000);
    return()=>clearInterval(interval);
  },[])

  return(
    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-6 h-6 text-orange-400" />
        <h3 className="text-xl font-semibold text-white">Board Status</h3>
      </div>

      <p className="text-gray-400 text-sm mb-6 h-5">
        {systemData.board.name}
      </p>

      <div className="space-y-4">

        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <span className="text-gray-400">Temperature</span>
          <span
            className={`font-semibold text-lg ${getTempColor(
              systemData.board.temp
            )}`}
          >
            {systemData.board.temp ? systemData.board.temp.toFixed(1) : 0}°C
          </span>
        </div>
      </div>
    </div>
  );
}
export default Storage
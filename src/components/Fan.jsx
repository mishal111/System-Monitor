import { Fan as FanIcon } from "lucide-react";
import { useState, useEffect } from "react";

function FanCard() {
  const [fans, setFans] = useState([
    { name: "Loading...", speed: 0 },
    { name: "Loading...", speed: 0 },
  ]);

  useEffect(() => {
    const fetchFanInfo = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/fanInfo");
        const data = await res.json();

        if (Array.isArray(data)) {
          setFans(data);
        }
      } catch (error) {
        console.error("Error fetching fans:", error);
      }
    };

    fetchFanInfo();
    const interval = setInterval(fetchFanInfo, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg border border-gray-700">
      <div className="flex items-center gap-3 mb-4">

        <FanIcon className="w-6 h-6 text-blue-400 animate-spin-slow" />
        <h3 className="text-xl font-semibold text-white">Fan Status</h3>
      </div>

      <div className="space-y-4">

        {fans.length > 0 ? (
          fans.map((fan, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-700 pb-2"
            >

              <span className="text-gray-400 capitalize">
                {fan.name || `Fan ${index + 1}`}
              </span>

              <span className="font-semibold text-lg text-white">
                {fan.speed} <span className="text-sm text-gray-500">RPM</span>
              </span>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center">No fans detected</div>
        )}
      </div>
    </div>
  );
}

export default FanCard;
import { Activity } from "lucide-react";

function Background({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">System Monitor</h1>
          </div>
        </div>

        {children}

      </div>
    </div>
  );
}

export default Background;

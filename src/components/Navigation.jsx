import { Activity, Thermometer, Fan, FileText } from "lucide-react";

function Navigation({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-2 mb-6 bg-gray-800 p-1 rounded-lg">
      {[
        { id: "status", icon: Activity, label: "System Status" },
        { id: "fan", icon: Fan, label: "Fan Control" },
        { id: "logs", icon: FileText, label: "Logs" }
      ].map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            <Icon size={18} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default Navigation;

import { Settings } from "lucide-react";

function ModeSelector({ mode, handleModeChange }) {
  
  const selectMode=async (selectedMode)=>{
    await fetch("http://127.0.0.1:8000/mode",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({command:selectedMode}),

    });
    handleModeChange(selectedMode);
  };

  return (
    <div className="mb-6 bg-gray-800 p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-semibold">Performance Mode</h2>
      </div>

      <div className="flex gap-3">
        {['quiet', 'balanced', 'performance'].map(m => (
          <button
            key={m}
            onClick={() => selectMode(m)}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              mode === m
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ModeSelector;

import React from "react";

const AQIInfo = ({ onClose }) => {
  const levels = [
    { range: "0–50", label: "Good 😊", desc: "Air quality is satisfactory." },
    { range: "51–100", label: "Moderate 😐", desc: "Acceptable; sensitive groups may be affected." },
    { range: "101–150", label: "Unhealthy for Sensitive Groups 😷", desc: "Children and elderly should reduce outdoor activity." },
    { range: "151–200", label: "Unhealthy 🤒", desc: "Everyone may start to feel health effects." },
    { range: "201–300", label: "Very Unhealthy ☠️", desc: "Health warnings of emergency conditions." },
    { range: "301+", label: "Hazardous 💀", desc: "Serious risk of respiratory issues." },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-3">
      <div className="bg-black p-5 sm:p-6 rounded-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg sm:text-xl font-bold mb-3 text-center">
          AQI Levels Guide
        </h2>

        <ul className="space-y-3 text-sm sm:text-base">
          {levels.map((lvl, i) => (
            <li key={i} className="border-b border-white/20 pb-2">
              <strong>{lvl.range}</strong> – {lvl.label}
              <br />
              <span className="text-gray-300 text-xs sm:text-sm">
                {lvl.desc}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AQIInfo;

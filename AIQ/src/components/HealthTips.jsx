import React from "react";
import { getHealthMessage } from "../utils/aqiUtils";

const HealthTips = ({ aqi }) => {
  if (aqi === null || aqi === undefined) return null;

  const message = getHealthMessage(aqi);

  return (
    <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl shadow-md text-center w-full max-w-md mx-auto">
      <h3 className="font-semibold text-base sm:text-lg mb-2">
        💡 Health Advice
      </h3>
      <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
        {message}
      </p>
    </div>
  );
};

export default HealthTips;

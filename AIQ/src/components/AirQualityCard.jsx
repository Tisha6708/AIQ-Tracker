import React from "react";
import { getAQIColor } from "../utils/aqiUtils";

const AirQualityCard = ({ aqiData, city }) => {
  if (!aqiData) return null;

  const aqi = Number(aqiData.aqi || 0);
  const dominentpol = aqiData.dominentpol || "N/A";

  // Tailwind background class from utils
  const bgColor = getAQIColor(aqi);

  return (
    <div
      className={`${bgColor} bg-opacity-90 p-5 sm:p-6 rounded-2xl shadow-xl text-center w-full max-w-md mx-auto transition-colors duration-300`}
    >
      {/* Location */}
      <h2 className="text-base sm:text-lg font-semibold mb-1 text-white">
        📍 {city || aqiData.city?.name || "Unknown Location"}
      </h2>

      {/* AQI Value */}
      <p className="text-4xl sm:text-5xl font-bold leading-tight text-white">
        {aqi}
      </p>

      {/* Pollutant */}
      <p className="text-xs sm:text-sm mt-3 text-white/90">
        Dominant Pollutant:{" "}
        <span className="font-semibold uppercase">{dominentpol}</span>
      </p>
    </div>
  );
};

export default AirQualityCard;

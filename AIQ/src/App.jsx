import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import AirQualityCard from "./components/AirQualityCard";
import HealthTips from "./components/HealthTips";
import AQIChart from "./components/AQIChart";
import AQIInfo from "./components/AQIInfo";
import "./App.css";

const App = () => {
  const [aqiData, setAqiData] = useState(null);
  const [city, setCity] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAQI = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    try {
      const encodedCity = encodeURIComponent(cityName);
      const res = await axios.get(
        `https://api.waqi.info/feed/${encodedCity}/?token=${import.meta.env.VITE_WAQI_TOKEN}`
      );

      if (res.data.status === "ok" && res.data.data) {
        setAqiData(res.data.data);
        setCity(cityName);
      } else {
        alert("City not found. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch AQI data. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentLocationAQI = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported on your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get(
            `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${import.meta.env.VITE_WAQI_TOKEN}`
          );
          if (res.data.status === "ok" && res.data.data) {
            setAqiData(res.data.data);
            setCity("Your Location");
          } else {
            alert("Couldn't fetch AQI for your location.");
          }
        } catch (error) {
          console.error("Error fetching current location AQI:", error);
          alert("Failed to fetch your location data.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Permission denied or location unavailable.");
        setLoading(false);
      }
    );
  };

  // 🔒 Normalize forecast data safely
  const forecastData =
    aqiData?.forecast?.daily?.pm25?.map((item, i) => ({
      time: item?.day || `Day ${i + 1}`,
      aqi: item?.avg || 0,
    })) || [];

  return (
    <div className="min-h-screen bg-black text-white py-6 px-4 sm:p-6 relative">
      {/* Info Button */}
      <button
        onClick={() => setShowInfo(true)}
        className="absolute top-4 right-4 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition"
      >
        ℹ️ AQI Info
      </button>

      <h1 className="text-3xl font-bold text-center mb-6 mt-9">
        Real-Time Air Quality Tracker
      </h1>

      {/* Search + Current Location */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3 mb-6 w-full max-w-2xl mx-auto">
        <SearchBar onSearch={fetchAQI} />
        <button
          onClick={fetchCurrentLocationAQI}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold w-full sm:w-auto"
        >
          📍 Use My Location
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-300 italic">Fetching data...</p>
      )}

      {aqiData && !loading && (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
          <AirQualityCard aqiData={aqiData} city={city} />
          <AQIChart data={forecastData} />
          <HealthTips aqi={aqiData.aqi || aqiData?.iaqi?.pm25?.v || 0} />
        </div>
      )}

      {showInfo && <AQIInfo onClose={() => setShowInfo(false)} />}
    </div>
  );
};

export default App;

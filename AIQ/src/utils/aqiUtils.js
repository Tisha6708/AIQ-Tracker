export const getAQIColor = (aqi) => {
  if (aqi <= 50) return "bg-green-600";
  if (aqi <= 100) return "bg-yellow-500";
  if (aqi <= 150) return "bg-orange-500";
  if (aqi <= 200) return "bg-red-500";
  if (aqi <= 300) return "bg-purple-600";
  return "bg-rose-700";
};

export const getHealthMessage = (aqi) => {
  if (aqi <= 50) return "✅ Excellent air quality. Enjoy the outdoors!";
  if (aqi <= 100) return "😐 Moderate. Sensitive people should be cautious.";
  if (aqi <= 150) return "⚠️ Unhealthy for sensitive groups.";
  if (aqi <= 200) return "🚫 Unhealthy. Reduce outdoor activities.";
  if (aqi <= 300) return "😷 Very unhealthy. Stay indoors.";
  return "☠️ Hazardous. Avoid going outside!";
};

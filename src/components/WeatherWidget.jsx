import { useSelector } from "react-redux";
import { CloudRain } from "lucide-react";
import { useEffect } from "react";

const WeatherWidget = () => {
  const { data, loading, error } = useSelector((state) => state.weather);
  console.log("Weather data:", data);

  useEffect(() => {
    console.log("Weather updated:", data);
  }, [data]);

  if (loading) {
    return (
      <div className="d-flex align-items-center text-muted small">
        <CloudRain size={16} className="me-1" />
        <span>Loading weather...</span>
      </div>
    );
  }

  if (error || !data) {
    return null;
  }

  return (
    <div className="d-flex align-items-center small">
      <img
        src={data.icon || "/placeholder.svg"}
        alt={data.condition}
        width="32"
        height="32"
      />
      <div className="ms-1">
        <span className="fw-medium">{data.temperature}°C</span>
        <span className="mx-1">•</span>
        <span>{data.condition}</span>
        <span className="mx-1">•</span>
        <span className="text-muted">{data.location}</span>
      </div>
    </div>
  );
};

export default WeatherWidget;

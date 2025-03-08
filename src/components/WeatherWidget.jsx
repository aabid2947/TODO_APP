

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { CloudRain } from "lucide-react";
import { fetchWeather } from "../store/weather/weatherSlice";

// Map icon keywords from the API response to your local asset image paths
const iconMapping = {
  "clear-day": "../assets/clear-day.png",
  "clear-night": "../assets/clear-night.png",
  "rain": "../assets/rain.png",
  "snow": "../assets/snow.png",
  "partly-cloudy-night": "../assets/partially-cludy-night.png",
  // Add additional mappings as needed...
};

const WeatherWidget = () => {
  const dispatch = useDispatch();
  // Get the user from auth state to retrieve the saved city
  const { user } = useSelector((state) => state.auth);
  const { data, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    if (user && user.city) {
      // Fetch weather using the saved city from the user data
      dispatch(fetchWeather(user.city));
    }
  }, [dispatch, user]);

  // Display a loading indicator while fetching weather data
  if (loading) {
    return (
      <div className="d-flex align-items-center text-muted small">
        <CloudRain size={16} className="me-1" />
        <span>Loading weather...</span>
      </div>
    );
  }

  // If there's an error or no data, render nothing
  if (error || !data) {
    return null;
  }

  // Lookup the appropriate icon URL using the mapping.
  // If the API's icon keyword isn't found, fall back to a placeholder image.
  const iconUrl = iconMapping[data.icon] || "../assets/partially-cludy-night.png";

  return (
    <div className="d-flex mx-2 align-items-center small">
      <img src={iconUrl} width="32" height="32" alt="weather icon" />
      <div className="ms-1">
        <span>{data.condition}</span>
        <span className="mx-1">•</span>
      </div>
    </div>
  );
};

export default WeatherWidget;

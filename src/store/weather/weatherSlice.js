import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for the weather slice.
// - data: stores the weather data fetched from the API.
// - loading: indicates if the fetch request is in progress.
// - error: holds any error messages from the fetch request.
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// API configuration details.
// The API key is now loaded from the environment variables.
// Note: In Vite, only variables prefixed with VITE_ are exposed to the client.
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

// Async thunk to fetch weather data based on a city name.
// The default city is "New York" if none is provided.
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city = "New York", { rejectWithValue }) => {
    try {
      // Encode the city to handle spaces and special characters.
      const API_URL = `${BASE_URL}/${encodeURIComponent(city)}?unitGroup=us&key=${API_KEY}&contentType=json`;
      
      // Make the API request.
      const response = await fetch(API_URL);

      // If the response is not OK, throw an error.
      if (!response.ok) {
        throw new Error("Weather data not available");
      }
      
      // Parse the response JSON.
      const data = await response.json();

      // Return an object containing only the relevant weather details.
      return {
        temperature: data.currentConditions.temp,     // Current temperature.
        condition: data.currentConditions.conditions,     // Weather condition description.
        icon: data.currentConditions.icon || "",          // Icon keyword for the weather (with a fallback).
        location: data.resolvedAddress,                   // The resolved location name from the API.
      };
    } catch (error) {
      // Return a rejected value with the error message if an error occurs.
      return rejectWithValue(error.message);
    }
  }
);

// Create a weather slice with Redux Toolkit.
const weatherSlice = createSlice({
  name: "weather",   // Name of the slice.
  initialState,      // Initial state for the slice.
  reducers: {},      // No synchronous reducers are defined in this slice.
  extraReducers: (builder) => {
    builder
      // When the fetchWeather action is pending, set loading to true and clear previous errors.
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When the fetchWeather action is fulfilled, save the fetched data and set loading to false.
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      // When the fetchWeather action is rejected, store the error message and set loading to false.
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer to be used in the Redux store.
export default weatherSlice.reducer;

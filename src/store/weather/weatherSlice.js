import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const API = `http://api.weatherapi.com/v1/current.json?key=e5501bce584b48c291744003250803&q=London&aqi=no`;
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city = "London", { rejectWithValue }) => {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error("Weather data not available");
      }
      const data = await response.json();
      // Adjusted for WeatherAPI.com structure:
      return {
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon.startsWith("//")
          ? "https:" + data.current.condition.icon
          : data.current.condition.icon,
        location: data.location.name,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;

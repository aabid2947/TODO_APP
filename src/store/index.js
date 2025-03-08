// Import configureStore from Redux Toolkit to set up the Redux store.
import { configureStore } from "@reduxjs/toolkit";
// Import useDispatch hook from react-redux for dispatching actions.
import { useDispatch } from "react-redux";

// Import reducers from the corresponding slices.
import tasksReducer from "./tasks/tasksSlice";
import authReducer from "./auth/authSlice";
import weatherReducer from "./weather/weatherSlice";

// Configure and create the Redux store by combining multiple reducers.
export const store = configureStore({
  reducer: {
    // 'tasks' slice manages the tasks-related state.
    tasks: tasksReducer,
    // 'auth' slice manages the authentication-related state.
    auth: authReducer,
    // 'weather' slice manages the weather-related state.
    weather: weatherReducer,
  },
});

// Custom hook to use the dispatch function with the correct type (if using TypeScript).
export const useAppDispatch = () => useDispatch();

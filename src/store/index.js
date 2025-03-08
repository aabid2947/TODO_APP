import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import tasksReducer from "./tasks/tasksSlice";
import authReducer from "./auth/authSlice";
import weatherReducer from "./weather/weatherSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    weather: weatherReducer,
  },
});

export const useAppDispatch = () => useDispatch();

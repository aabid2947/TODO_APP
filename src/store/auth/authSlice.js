import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for the authentication slice.
// It includes flags for authentication status, user data, loading and error messages.
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Async thunk to handle user login.
// It simulates a delay and validates against hardcoded credentials.
// Additionally, it saves the user's city along with other details.
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, city }, { rejectWithValue }) => {
    try {
      // Simulate a 1-second API delay.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if the credentials match the hardcoded values.
      if (email === "user@example.com" && password === "password") {
        // Create a user object that includes the entered city.
        const user = {
          id: "1",
          name: "John Doe",
          email: "user@example.com",
          city, // Save the city from login.
          avatar: "/placeholder.svg?height=40&width=40",
        };

        // Persist user data and authentication status in localStorage.
        // Also, store the city value so it can be used later.
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("city", city);

        // Return the user object as the fulfilled action payload.
        return user;
      }

      // If credentials do not match, return a rejected action with an error message.
      return rejectWithValue("Invalid email or password");
    } catch (error) {
      // In case of any unexpected error, return a generic error message.
      return rejectWithValue("Login failed. Please try again.");
    }
  }
);

// Async thunk to handle user logout.
// This removes user data and authentication flags from localStorage.
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("city");
  return null;
});

// Async thunk to check authentication status when the app loads.
// It retrieves data from localStorage and returns the user if authenticated.
export const checkAuthStatus = createAsyncThunk("auth/checkStatus", async () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const user = localStorage.getItem("user");

  // If authenticated and user data exists, parse and return it.
  if (isAuthenticated && user) {
    return JSON.parse(user);
  }

  // Otherwise, return null to indicate no authenticated user.
  return null;
});

// Create the authentication slice with Redux Toolkit.
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // No synchronous reducers are defined here.
  extraReducers: (builder) => {
    // Handle the pending, fulfilled, and rejected states for the login async thunk.
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle logout; reset authentication state.
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      // Handle the pending and fulfilled states for checking auth status.
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      });
  },
});

// Export the auth reducer to be included in the Redux store.
export default authSlice.reducer;

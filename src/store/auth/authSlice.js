import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

// Mock login function
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (email === "user@example.com" && password === "password") {
        const user = {
          id: "1",
          name: "John Doe",
          email: "user@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
        };

        // Store in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");

        return user;
      }

      return rejectWithValue("Invalid email or password");
    } catch (error) {
      return rejectWithValue("Login failed. Please try again.");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  // Clear localStorage
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
  return null;
});

export const checkAuthStatus = createAsyncThunk("auth/checkStatus", async () => {
  // Check if user is logged in from localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const user = localStorage.getItem("user");

  if (isAuthenticated && user) {
    return JSON.parse(user);
  }

  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
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

export default authSlice.reducer;

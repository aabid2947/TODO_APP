// Import the necessary functions from Redux Toolkit to create slices and async thunks.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state for the tasks slice.
const initialState = {
  tasks: [],    // Array to store the list of tasks.
  loading: false, // Boolean to indicate if tasks are being loaded.
  error: null,  // Stores error messages, if any.
};

// Async thunk to load tasks from localStorage.
// It retrieves the 'tasks' item from localStorage and parses it as JSON.
// If there are no saved tasks, it returns an empty array.
export const loadTasks = createAsyncThunk("tasks/loadTasks", async () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});

// Helper function to save the current tasks array to localStorage.
const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Create the tasks slice using createSlice.
const tasksSlice = createSlice({
  name: "tasks",      // Name of the slice.
  initialState,       // The initial state defined above.
  reducers: {
    // Action to add a new task.
    addTask: (state, action) => {
      // Create a new task object with default properties and any additional payload properties.
      const newTask = {
        id: Date.now().toString(),       // Unique id using current timestamp.
        createdAt: new Date().toISOString(), // Timestamp for when the task was created.
        important: false,                // Default 'important' flag set to false.
        description: '',                 // Default empty description.
        ...action.payload,               // Spread any additional properties provided in the action payload.
      };
      // Add the new task to the tasks array.
      state.tasks.push(newTask);
      // Save the updated tasks array to localStorage.
      saveTasks(state.tasks);
    },
    // Action to toggle the completion status of a task.
    toggleTaskCompletion: (state, action) => {
      // Find the task by id from the action payload.
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        // Toggle the 'completed' flag.
        task.completed = !task.completed;
        // Save the updated tasks array.
        saveTasks(state.tasks);
      }
    },
    // Action to toggle the importance of a task.
    toggleImportant: (state, action) => {
      // Find the task by id.
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        // Toggle the 'important' flag.
        task.important = !task.important;
        // Save the updated tasks array.
        saveTasks(state.tasks);
      }
    },
    // Action to delete a task.
    deleteTask: (state, action) => {
      // Filter out the task with the specified id.
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      // Save the updated tasks array.
      saveTasks(state.tasks);
    },
    // Action to update an existing task.
    updateTask: (state, action) => {
      // Find the index of the task to be updated by its id.
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        // Update the task with the new data from the action payload.
        state.tasks[index] = action.payload;
        // Save the updated tasks array.
        saveTasks(state.tasks);
      }
    },
  },
  // Extra reducers to handle the async thunk for loading tasks.
  extraReducers: (builder) => {
    builder
      // When the loadTasks thunk is pending, set loading to true.
      .addCase(loadTasks.pending, (state) => {
        state.loading = true;
      })
      // When loadTasks is fulfilled, update the tasks array with the fetched data and set loading to false.
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      // If loadTasks is rejected, set loading to false and store the error message.
      .addCase(loadTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tasks";
      });
  },
});

// Export the action creators for dispatching.
export const { addTask, toggleTaskCompletion, toggleImportant, deleteTask, updateTask } = tasksSlice.actions;

// Export the reducer to be used in the Redux store.
export default tasksSlice.reducer;

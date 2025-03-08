"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addTask, toggleTaskCompletion, toggleImportant } from "../store/tasks/tasksSlice"
import { Star, Bell, RotateCcw, Calendar, X } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { format } from "date-fns"
import WeatherWidget from "./WeatherWidget"
import { DayPicker } from "react-day-picker" // Import react-day-picker for calendar UI
import "react-day-picker/dist/style.css" // Import default styles (customize as needed)

const TaskList = ({ onSelectTask, filterImportant = false, selectedTaskId = null }) => {
  const dispatch = useDispatch()

  // Retrieve tasks and loading state from the Redux store.
  const { tasks, loading } = useSelector((state) => state.tasks)

  // Local state for new task details and date picker visibility.
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDueDate, setNewTaskDueDate] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Get the current theme from our custom ThemeContext.
  const { theme } = useTheme()

  // Handler to add a new task.
  // It dispatches the addTask action with the entered title and due date.
  const handleAddTask = (e) => {
    e.preventDefault()
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({
          title: newTaskTitle.trim(),
          completed: false,
          priority: "medium",
          dueDate: newTaskDueDate || null,
        }),
      )
      // Clear input fields after adding the task.
      setNewTaskTitle("")
      setNewTaskDueDate("")
    }
  }

  // Handler to toggle the completion status of a task.
  const handleToggleTask = (id) => {
    dispatch(toggleTaskCompletion(id))
  }

  // Handler to toggle the "important" flag on a task.
  // Uses event.stopPropagation() to prevent triggering parent click handlers.
  const handleToggleImportant = (id, e) => {
    e.stopPropagation()
    dispatch(toggleImportant(id))
  }

  // Filter tasks based on whether only important tasks should be shown.
  const filteredTasks = filterImportant ? tasks.filter((task) => task.important) : tasks

  // Separate tasks into incomplete and completed groups.
  const incompleteTasks = filteredTasks.filter((task) => !task.completed)
  const completedTasks = filteredTasks.filter((task) => task.completed)

  // Handler for selecting a task (e.g., to view task details).
  const handleTaskSelect = (task) => {
    onSelectTask(task)
  }

  // Helper function to calculate the remaining time until a task's due date.
  const getTimeLeft = (dueDate) => {
    if (!dueDate) return ""
    const now = new Date()
    const due = new Date(dueDate)
    const diff = due - now
    if (diff <= 0) return "Overdue"
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} left`
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} left`
    return "Less than 1 hour left"
  }

  // Handler to select a due date from the date picker.
  // It sets the newTaskDueDate and hides the date picker.
  const handleDateSelect = (date) => {
    setNewTaskDueDate(date.toISOString())
    setShowDatePicker(false)
  }

  // Handler to refresh the add-task form and close the date picker.
  const handleRefresh = () => {
    setNewTaskTitle("")
    setNewTaskDueDate("")
    setShowDatePicker(false)
  }

  return (
    <>
      {/* Inline CSS styles based on the current theme */}
      <style>{`
        .task-list-container {
          background-color: ${theme === "dark" ? "#212121" : "#f8f9fa"};
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        /* Styles for the Add Task Section */
        .add-task-section {
          padding: 1rem 1.5rem;
          background-color: ${theme === "dark" ? "#2c332d" : "#E5EBE6"};
          border-bottom: 1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
        }
        .add-task-header {
          margin-bottom: 1rem;
          font-size: 1.5rem;
          color: ${theme === "dark" ? "white" : "#333"};
        }
        .add-task-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .task-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid ${theme === "dark" ? "#555" : "#ccc"};
          border-radius: 8px;
          color: ${theme === "dark" ? "white" : "#333"};
          background: ${theme === "dark" ? "#2c2c2c" : "white"};
        }
        .task-input::placeholder {
          color: ${theme === "dark" ? "rgba(255,255,255,0.6)" : "#888"};
        }
        /* Styles for the Action Buttons Row */
        .action-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .left-buttons {
          display: flex;
          gap: 1rem;
        }
        .left-buttons button {
          background: none;
          border: none;
          color: ${theme === "dark" ? "rgba(255,255,255,0.7)" : "#555"};
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
        }
        .left-buttons button:hover {
          opacity: 0.8;
        }
        .add-task-btn {
          background-color: #316a33;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .add-task-btn:hover {
          background-color: #3d843f;
        }
        /* Styles for the Date Picker Modal Overlay */
        .date-picker-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .date-picker-card {
          background-color: ${theme === "dark" ? "#333" : "white"};
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          text-align: center;
          position: relative;
        }
        /* Styles for the Task List Section */
        .tasks-container {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        }
        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .task-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          border-radius: 8px;
          background-color: ${theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"};
          transition: background-color 0.2s;
          cursor: pointer;
        }
        .task-item:hover {
          background-color: ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"};
        }
        .task-title {
          color: ${theme === "dark" ? "white" : "#333"};
          margin-left: 12px;
          max-width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }
        .completed .task-title {
          color: ${theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"};
          text-decoration: line-through;
        }
        /* Styles for the Star Button */
        .star-btn {
          background: none;
          border: none;
          color: ${theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"};
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
          cursor: pointer;
        }
        .star-btn:hover {
          color: #ffd700;
        }
        .star-btn.important {
          color: #ffd700;
          fill: ${theme === "dark" ? "white" : "black"};
        }
        /* Styles for custom checkboxes */
        .custom-checkbox {
          position: relative;
          width: 20px;
          height: 20px;
        }
        .custom-checkbox input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }
        .custom-checkbox label {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          border: 2px solid ${theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"};
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .custom-checkbox input:checked + label {
          background-color: #2C332D;
          border-color: #4caf50;
        }
        .custom-checkbox input:checked + label:after {
          content: "";
          position: absolute;
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        /* Scrollbar styling for the task list */
        .tasks-container::-webkit-scrollbar {
          width: 8px;
        }
        .tasks-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .tasks-container::-webkit-scrollbar-thumb {
          background-color: ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
          border-radius: 4px;
        }
        .tasks-container::-webkit-scrollbar-thumb:hover {
          background-color: ${theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"};
        }
        .task-item.selected {
          border: 2px solid #4caf50;
          background-color: ${theme === "dark" ? "rgba(76,175,80,0.1)" : "rgba(76,175,80,0.1)"};
        }
      `}</style>

      {/* Main container for the task list */}
      <div className="task-list-container">
        {/* Add Task Section */}
        <div className="add-task-section">
          {/* Header for Add Task or Important Tasks view */}
          <h2 className="add-task-header">{filterImportant ? "Important Tasks" : "Add A Task"}</h2>

          {/* Form to add a new task */}
          <form onSubmit={handleAddTask} className="add-task-form">
            {/* Input field for task title */}
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a task..."
              className="task-input"
            />
            {/* Action buttons for notifications, refresh, and calendar */}
            <div className="action-buttons">
              <div className="left-buttons">
                <button type="button">
                  <Bell size={20} />
                </button>
                <button type="button" onClick={handleRefresh}>
                  <RotateCcw size={20} />
                </button>
                <button type="button" onClick={() => setShowDatePicker(!showDatePicker)}>
                  <Calendar size={20} />
                </button>
              </div>
              {/* Button to submit the new task */}
              <div className="right-button">
                <button type="submit" className="add-task-btn">
                  ADD TASK
                </button>
              </div>
            </div>
          </form>

          {/* Date Picker Modal Overlay */}
          {showDatePicker && (
            <div className="date-picker-overlay">
              <div className="date-picker-card">
                {/* Close button for the date picker */}
                <button
                  onClick={() => setShowDatePicker(false)}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: "none",
                    border: "none",
                    color: theme === "dark" ? "rgba(255,255,255,0.7)" : "#333",
                    cursor: "pointer",
                  }}
                >
                  <X size={16} />
                </button>
                {/* Render the DayPicker for selecting a due date */}
                <DayPicker
                  mode="single"
                  selected={newTaskDueDate ? new Date(newTaskDueDate) : undefined}
                  onSelect={(date) => date && handleDateSelect(date)}
                  disabled={{ before: new Date() }} // Disable selection of past dates
                />
              </div>
            </div>
          )}

          {/* Display selected due date and remaining time */}
          {newTaskDueDate && (
            <div className="selected-date-display">
              Due: {format(new Date(newTaskDueDate), "PPP")} ({getTimeLeft(newTaskDueDate)})
            </div>
          )}
        </div>

        {/* Task List Section */}
        <div className="tasks-container">
          {loading ? (
            // Loading indicator when tasks are being fetched
            <div className="text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredTasks.length === 0 ? (
            // Message when no tasks are available
            <div className="text-center text-muted p-4">
              <p>
                {filterImportant
                  ? "No important tasks yet. Star a task to mark it as important!"
                  : "No tasks yet. Add your first task above!"}
              </p>
            </div>
          ) : (
            // Render the list of tasks
            <div className="tasks-list">
              {incompleteTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-item ${selectedTaskId === task.id ? "selected" : ""}`}
                  onClick={() => handleTaskSelect(task)}
                >
                  <div className="d-flex align-items-center flex-grow-1" style={{ width: "100%", overflow: "hidden" }}>
                    {/* Custom checkbox to mark task as completed */}
                    <div className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                        onClick={(e) => e.stopPropagation()}
                        id={`task-${task.id}`}
                      />
                      <label onClick={(e) => e.stopPropagation()} htmlFor={`task-${task.id}`}></label>
                    </div>
                    {/* Render a weather widget next to the task */}
                    <div style={{ marginRight: "8px" }}>
                      <WeatherWidget />
                    </div>
                    {/* Task title with text truncation */}
                    <span className="task-title"> {task.title}</span>
                    {/* Display due date information if available */}
                    {task.dueDate && (
                      <span
                        className="time-left"
                        style={{
                          marginLeft: "auto",
                          marginRight: "8px",
                          fontSize: "0.85rem",
                          color: theme === "dark" ? "rgba(255,255,255,0.7)" : "#555",
                        }}
                      >
                        {getTimeLeft(task.dueDate)}
                      </span>
                    )}
                  </div>
                  {/* Star button to toggle important flag */}
                  <button
                    className={`star-btn ${task.important ? "important" : ""}`}
                    onClick={(e) => handleToggleImportant(task.id, e)}
                  >
                    <Star size={18} fill={task.important ? (theme === "dark" ? "white" : "black") : "none"} />
                  </button>
                </div>
              ))}

              {/* Render completed tasks if any */}
              {completedTasks.length > 0 && (
                <div className="completed-section mt-4">
                  <h6 className="text-muted mb-3">Completed</h6>
                  {completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`task-item completed ${selectedTaskId === task.id ? "selected" : ""}`}
                      onClick={() => handleTaskSelect(task)}
                    >
                      <div className="d-flex align-items-center flex-grow-1" style={{ width: "100%", overflow: "hidden" }}>
                        {/* Custom checkbox for completed tasks */}
                        <div className="custom-checkbox">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleTask(task.id)}
                            onClick={(e) => e.stopPropagation()}
                            id={`task-${task.id}`}
                          />
                          <label onClick={(e) => e.stopPropagation()} htmlFor={`task-${task.id}`}></label>
                        </div>
                        {/* Weather widget for completed tasks */}
                        <div style={{ marginRight: "8px" }}>
                          <WeatherWidget />
                        </div>
                        {/* Task title for completed tasks */}
                        <span className="task-title">{task.title}</span>
                        {/* Display due date and remaining time if available */}
                        {task.dueDate && (
                          <span
                            className="time-left"
                            style={{
                              marginLeft: "auto",
                              marginRight: "8px",
                              fontSize: "0.85rem",
                              color: theme === "dark" ? "rgba(255,255,255,0.7)" : "#555",
                            }}
                          >
                            {getTimeLeft(task.dueDate)}
                          </span>
                        )}
                      </div>
                      {/* Star button for toggling important flag for completed tasks */}
                      <button
                        className={`star-btn ${task.important ? "important" : ""}`}
                        onClick={(e) => handleToggleImportant(task.id, e)}
                      >
                        <Star size={18} fill={task.important ? (theme === "dark" ? "white" : "black") : "none"} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TaskList

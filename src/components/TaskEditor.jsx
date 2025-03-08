"use client";

import { useState } from "react";
import { Plus, Star, Bell, Calendar, RotateCcw, X, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../store/tasks/tasksSlice";
import { useTheme } from "../contexts/ThemeContext";

// TaskEditor component lets the user edit a task (toggle important, delete, etc.)
// and provides additional actions such as adding a step, setting a reminder, or adding a due date.
export default function TaskEditor({ task, onClose }) {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  // Local state to track checkbox status (used to visually mark task as completed)
  const [isChecked, setIsChecked] = useState(false);

  // Handler to toggle the "important" flag of the task.
  // Dispatches an updateTask action with the updated important status.
  const handleToggleImportant = () => {
    dispatch(updateTask({ ...task, important: !task.important }));
  };

  // Handler to delete the task.
  // Dispatches a deleteTask action and then closes the editor.
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    onClose();
  };

  // Handler for repeating a task.
  // If the task is completed, mark it as uncompleted (to repeat it) and close the editor.
  const handleRepeat = () => {
    if (task && task.completed) {
      dispatch(updateTask({ ...task, completed: false }));
      onClose();
    }
  };

  // Handler for "Add Due Date" action.
  // Here, simply close the editor so that another dialog (for picking a date) can be opened.
  const handleAddDueDate = () => {
    onClose();
  };

  // Define styling colors based on the current theme.
  const containerBg = theme === "dark" ? "#1e1e1e" : "#fff";
  const textColor = theme === "dark" ? "rgba(255,255,255,0.9)" : "#333";
  const btnLinkColor = theme === "dark" ? "rgba(255,255,255,0.7)" : "#333";
  const borderColor = theme === "dark" ? "rgba(255,255,255,0.1)" : "#ccc";

  return (
    <div
      className="task-editor d-flex flex-column"
      style={{
        backgroundColor: containerBg,
        width: "400px",
        position: "relative",
      }}
    >
      {/* Main content section of the editor */}
      <div className="p-3">
        <div className="d-flex align-items-center mb-3">
          {/* Checkbox to mark task as completed visually */}
          <div className="form-check d-flex align-items-center">
            <input
              className="form-check-input me-2"
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              id="todoCheck"
              style={{
                width: "18px",
                height: "18px",
                backgroundColor: "transparent",
                borderColor: theme === "dark" ? "rgba(255,255,255,0.5)" : "#666",
              }}
            />
            {/* Task title display, with strikethrough if checked */}
            <label
              className="form-check-label"
              htmlFor="todoCheck"
              style={{
                textDecoration: isChecked ? "line-through" : "none",
                color: textColor,
              }}
            >
              {task ? task.title : "Task Title"}
            </label>
          </div>
          {/* Button to toggle the task's important status */}
          <button
            className="btn"
            onClick={handleToggleImportant}
            style={{
              background: "none",
              border: "none",
              color: task && task.important ? "gold" : btnLinkColor,
              textDecoration: "none",
            }}
          >
            <Star size={18} />
          </button>
        </div>

        {/* List of additional action options */}
        <ul className="list-unstyled" style={{ marginBottom: "1rem" }}>
          {/* Option to add a step to the task */}
          <li>
            <button
              className="btn btn-link d-flex align-items-center"
              style={{ color: btnLinkColor, textDecoration: "none" }}
            >
              <Plus size={18} className="me-2" />
              <span>Add Step</span>
            </button>
          </li>
          {/* Option to set a reminder for the task */}
          <li>
            <button
              className="btn btn-link d-flex align-items-center"
              style={{ color: btnLinkColor, textDecoration: "none" }}
            >
              <Bell size={18} className="me-2" />
              <span>Set Reminder</span>
            </button>
          </li>
          {/* Option to add or change the due date for the task */}
          <li>
            <button
              className="btn btn-link d-flex align-items-center"
              style={{ color: btnLinkColor, textDecoration: "none" }}
              onClick={handleAddDueDate}
            >
              <Calendar size={18} className="me-2" />
              <span>Add Due Date</span>
            </button>
          </li>
          {/* Option to repeat the task (mark as uncompleted if it was completed) */}
          <li>
            <button
              className="btn btn-link d-flex align-items-center"
              style={{ color: btnLinkColor, textDecoration: "none" }}
              onClick={handleRepeat}
            >
              <RotateCcw size={18} className="me-2" />
              <span>Repeat</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Footer section with close and delete options */}
      <div
        className="d-flex justify-content-between align-items-center p-2"
        style={{
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        {/* Button to close the editor */}
        <button
          className="btn"
          style={{
            background: "none",
            border: "none",
            color: btnLinkColor,
            textDecoration: "none",
          }}
          onClick={onClose}
        >
          <X size={18} />
        </button>
        {/* Display task creation date (static for now) */}
        <span
          style={{
            color: theme === "dark" ? "rgba(255,255,255,0.5)" : "#666",
            fontSize: "0.875rem",
          }}
        >
          Created Today
        </span>
        {/* Button to delete the task */}
        <button
          className="btn"
          style={{
            background: "none",
            border: "none",
            color: "red",
            textDecoration: "none",
          }}
          onClick={handleDelete}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

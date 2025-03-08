"use client";

import { useState } from "react";
import { Plus, Star, Bell, Calendar, RotateCcw, X, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../store/tasks/tasksSlice";
import { useTheme } from "../contexts/ThemeContext";

export default function TaskEditor({ task, onClose }) {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    onClose();
  };

  const handleRepeat = () => {
    // If the task is completed, mark it as uncompleted and close editor
    if (task && task.completed) {
      dispatch(updateTask({ ...task, completed: false }));
      onClose();
    }
  };

  // When clicking "Add Due Date", close the editor (so that another dialog can open)
  const handleAddDueDate = () => {
    // Here you might open a date picker dialog in your app.
    onClose();
  };

  return (
    <div
      className="task-editor d-flex flex-column"
      style={{
        backgroundColor: "#1e1e1e",
        width: "400px",
        position: "relative",
      }}
    >
      {/* Main Content */}
      <div className="p-3">
        <div className="d-flex align-items-center mb-3">
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
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
            />
            <label
              className="form-check-label"
              htmlFor="todoCheck"
              style={{
                textDecoration: isChecked ? "line-through" : "none",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              {task ? task.title : "Task Title"}
            </label>
          </div>
          <button
            className="btn"
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
            }}
          >
            <Star size={18} />
          </button>
        </div>

        {/* Action Options as a List */}
        <ul className="list-unstyled" style={{ marginBottom: "1rem" }}>
          <li>
            <button
              className="btn btn-link d-flex align-items-center"
              style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
            >
              <Plus size={18} className="me-2" />
              <span>Add Step</span>
            </button>
          </li>
          <li>
            <button
              className="btn btn-link d-flex align-items-center"
              style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
            >
              <Bell size={18} className="me-2" />
              <span>Set Reminder</span>
            </button>
          </li>
          <li>
            <button
              className="btn btn-link d-flex align-items-center"
              style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
              onClick={handleAddDueDate}
            >
              <Calendar size={18} className="me-2" />
              <span>Add Due Date</span>
            </button>
          </li>
          <li>
            <button
              className="btn btn-link d-flex align-items-center"
              style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
              onClick={handleRepeat}
            >
              <RotateCcw size={18} className="me-2" />
              <span>Repeat</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div
        className="d-flex justify-content-between align-items-center p-2 border-top"
        style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <button
          className="btn"
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
          }}
          onClick={onClose}
        >
          <X size={18} />
        </button>
        <span
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.875rem",
          }}
        >
          Created Today
        </span>
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

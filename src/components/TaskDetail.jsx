"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../store/tasks/tasksSlice";
import { X, Calendar, AlertTriangle, Clock, Check } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

// TaskDetail component displays detailed info about a selected task.
// It allows editing the title, changing the priority, setting the due date,
// and deleting the task. The modal visibility is controlled by the "show" prop.
const TaskDetail = ({ task, show, onClose }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  // Local state to hold editable fields.
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  // Update local state when the task prop changes.
  useEffect(() => {
    setTitle(task.title);
    setPriority(task.priority);
    setDueDate(task.dueDate || "");
  }, [task]);

  // Save changes by dispatching an update action.
  const handleSave = () => {
    dispatch(
      updateTask({
        ...task,
        title,
        priority,
        dueDate: dueDate || undefined,
      })
    );
  };

  // Delete the task and close the modal.
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    onClose();
  };

  // Return the appropriate Bootstrap variant based on priority.
  const getPriorityVariant = (p) => {
    switch (p) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  // Return an icon component based on the priority.
  const getPriorityIcon = (p) => {
    switch (p) {
      case "high":
        return <AlertTriangle size={16} />;
      case "medium":
        return <Clock size={16} />;
      case "low":
        return <Check size={16} />;
      default:
        return null;
    }
  };

  // If the modal is not to be shown, return null.
  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      {/* Scoped CSS styles */}
      <style jsx>{`
        .modal-backdrop-custom {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${theme === "dark"
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(0, 0, 0, 0.1)"};
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
        }
        .modal-content {
          background-color: ${theme === "dark" ? "#292929" : "#fff"};
          color: ${theme === "dark" ? "#fff" : "#333"};
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }
        .modal-header {
          border-bottom: 1px solid ${theme === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)"};
        }
        .modal-footer {
          border-top: 1px solid ${theme === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)"};
        }
        .form-control {
          background-color: ${theme === "dark" ? "#1f1f1f" : "#fff"};
          color: ${theme === "dark" ? "#fff" : "#333"};
          border: 1px solid ${theme === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)"};
        }
        .form-control:focus {
          background-color: ${theme === "dark" ? "#1f1f1f" : "#fff"};
          color: ${theme === "dark" ? "#fff" : "#333"};
        }
      `}</style>

      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">Task Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              {/* Task Title */}
              <div className="mb-3">
                <label htmlFor="taskTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="taskTitle"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    handleSave();
                  }}
                />
              </div>

              {/* Task Priority Options */}
              <div className="mb-3">
                <label className="form-label">Priority</label>
                <div className="d-flex gap-2">
                  {["low", "medium", "high"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`btn btn-${getPriorityVariant(p)} ${
                        priority === p ? "active" : ""
                      }`}
                      onClick={() => {
                        setPriority(p);
                        handleSave();
                      }}
                    >
                      {getPriorityIcon(p)}
                      <span className="ms-1">
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Due Date Input */}
              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">
                  Due Date
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <Calendar size={16} />
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => {
                      setDueDate(e.target.value);
                      handleSave();
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete Task
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        {/* Backdrop for the modal */}
        <div className="modal-backdrop fade show"></div>
      </div>
    </div>
  );
};

export default TaskDetail;

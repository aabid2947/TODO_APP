import { useState } from "react";
import { Plus, Star, Bell, Calendar, RotateCcw, X, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../store/tasks/tasksSlice";
import { useTheme } from "../contexts/ThemeContext";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function TaskEditor({ task, onClose }) {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  // Local state:
  // - isChecked: reflects if the task is completed.
  // - showDatePicker: controls visibility of the date picker modal.
  // - selectedDate: stores the currently selected due date.
  const [isChecked, setIsChecked] = useState(task?.completed || false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(task?.dueDate ? new Date(task.dueDate) : null);

  // Toggle the "important" flag on the task.
  const handleToggleImportant = () => {
    dispatch(updateTask({ ...task, important: !task.important }));
  };

  // Toggle task completion when the checkbox is clicked.
  const handleToggleCompletion = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    dispatch(updateTask({ ...task, completed: newValue }));
  };

  // Delete the task.
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    onClose();
  };

  // Repeat task: if the task is completed, mark it as uncompleted.
  const handleRepeat = () => {
    if (task && task.completed) {
      dispatch(updateTask({ ...task, completed: false }));
      setIsChecked(false);
      onClose();
    }
  };

  // Open the date picker modal.
  const handleAddDueDate = () => {
    setShowDatePicker(true);
  };

  // Handle selection of a date from the date picker.
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    dispatch(updateTask({ ...task, dueDate: date.toISOString() }));
    setShowDatePicker(false);
  };

  // Styling variables based on the current theme.
  const containerBg = theme === "dark" ? "#1e1e1e" : "#fff";
  const textColor = theme === "dark" ? "rgba(255,255,255,0.9)" : "#333";
  const btnLinkColor = theme === "dark" ? "rgba(255,255,255,0.7)" : "#333";
  const borderColor = theme === "dark" ? "rgba(255,255,255,0.1)" : "#ccc";

  return (
    <>
      {/* Main Task Editor Container */}
      <div
        className="task-editor d-flex flex-column"
        style={{
          backgroundColor: containerBg,
          width: "400px",
          position: "relative",
        }}
      >
        {/* Top Section: Task Title, Completion Checkbox, and Important Star */}
        <div className="p-3">
          <div className="d-flex align-items-center mb-3">
            {/* Checkbox for toggling task completion */}
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={isChecked}
                onChange={handleToggleCompletion}
                id="todoCheck"
                style={{
                  width: "18px",
                  height: "18px",
                  backgroundColor: "transparent",
                  borderColor: theme === "dark" ? "rgba(255,255,255,0.5)" : "#666",
                }}
              />
              {/* Task title with strikethrough if completed */}
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
            {/* Star icon to toggle the important flag, with smooth transition */}
            <button
              className="btn"
              onClick={handleToggleImportant}
              style={{
                background: "none",
                border: "none",
                transition: "color 0.3s ease-in-out, fill 0.3s ease-in-out",
                color: task && task.important ? "gold" : btnLinkColor,
                textDecoration: "none",
              }}
            >
              <Star size={18} fill={task && task.important ? "gold" : "none"} />
            </button>
          </div>

          {/* List of Action Options */}
          <ul className="list-unstyled" style={{ marginBottom: "1rem" }}>
            <li>
              {/* Add Step option */}
              <button
                className="btn btn-link d-flex align-items-center"
                style={{ color: btnLinkColor, textDecoration: "none" }}
              >
                <Plus size={18} className="me-2" />
                <span>Add Step</span>
              </button>
            </li>
            <li>
              {/* Set Reminder option */}
              <button
                className="btn btn-link d-flex align-items-center"
                style={{ color: btnLinkColor, textDecoration: "none" }}
              >
                <Bell size={18} className="me-2" />
                <span>Set Reminder</span>
              </button>
            </li>
            <li>
              {/* Add Due Date option to open the date picker */}
              <button
                className="btn btn-link d-flex align-items-center"
                style={{ color: btnLinkColor, textDecoration: "none" }}
                onClick={handleAddDueDate}
              >
                <Calendar size={18} className="me-2" />
                <span>Add Due Date</span>
              </button>
            </li>
            <li>
              {/* Repeat task option */}
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

        {/* Footer Section: Close and Delete Buttons */}
        <div
          className="d-flex justify-content-between align-items-center p-2"
          style={{
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          {/* Close the editor */}
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
          {/* Display task creation info */}
          <span
            style={{
              color: theme === "dark" ? "rgba(255,255,255,0.5)" : "#666",
              fontSize: "0.875rem",
            }}
          >
            Created Today
          </span>
          {/* Delete the task */}
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

      {/* Date Picker Modal Overlay with Close Button */}
      {showDatePicker && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: theme === "dark" ? "#333" : "white",
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Close button for the date picker */}
            <button
              onClick={() => setShowDatePicker(false)}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "none",
                border: "none",
                color: btnLinkColor,
                cursor: "pointer",
              }}
            >
              <X size={16} />
            </button>
            {/* Date Picker for selecting a due date; past dates are disabled */}
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && handleDateSelect(date)}
              disabled={{ before: new Date() }}
            />
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleTaskCompletion, toggleImportant } from "../store/tasks/tasksSlice";
import { Star, Users, Calendar } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const TaskList = ({ onSelectTask, filterImportant = false, selectedTaskId = null }) => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const { theme } = useTheme();

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({
          title: newTaskTitle.trim(),
          completed: false,
          priority: newTaskPriority,
        })
      );
      setNewTaskTitle("");
      setNewTaskPriority("medium");
    }
  };

  const handleToggleTask = (id) => {
    dispatch(toggleTaskCompletion(id));
  };

  const handleToggleImportant = (id, e) => {
    e.stopPropagation(); // Prevent task selection when clicking the star
    dispatch(toggleImportant(id));
  };

  const filteredTasks = filterImportant 
    ? tasks.filter(task => task.important)
    : tasks;

  const incompleteTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const handleTaskSelect = (task) => {
    console.log("TaskList: Task selected", task);
    onSelectTask(task);
  };

  return (
    <>
      <style>{`
        .task-list-container {
          background-color: ${theme === "dark" ? "#212121" : "#f8f9fa"};
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .add-task-section {
          background-color: ${theme === "dark" ? "#2c332d" : "#E5EBE6"};
          border-bottom: 1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
        }
        .task-input-group {
          background-color: ${theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"};
          border-radius: 8px;
          padding: 8px;
        }
        .task-input {
          background: none;
          border: none;
          color: ${theme === "dark" ? "white" : "#333"};
          outline: none;
          padding: 8px;
          width: 100%;
        }
        .task-input::placeholder {
          color: ${theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"};
        }
        .add-task-btn {
          background-color: #316a33;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0 24px;
          font-weight: 500;
          transition: background-color 0.2s;
          cursor: pointer;
        }
        .add-task-btn:hover {
          background-color: #3d843f;
        }
        .tasks-container {
          flex: 1;
          overflow-y: auto;
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
          background-color: ${theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"};
          transition: background-color 0.2s;
          cursor: pointer;
        }
        .task-item:hover {
          background-color: ${theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"};
        }
        .task-title {
          color: ${theme === "dark" ? "white" : "#333"};
          margin-left: 12px;
        }
        .completed .task-title {
          color: ${theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"};
          text-decoration: line-through;
        }
        .star-btn {
          background: none;
          border: none;
          color: ${theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"};
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .star-btn:hover {
          color: #ffd700;
        }
        .star-btn.important {
          color: #ffd700;
          fill: ${theme === "dark" ? "white" : "black"};
        }
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
          border: 2px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"};
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
        .tasks-container::-webkit-scrollbar {
          width: 8px;
        }
        .tasks-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .tasks-container::-webkit-scrollbar-thumb {
          background-color: ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
          border-radius: 4px;
        }
        .tasks-container::-webkit-scrollbar-thumb:hover {
          background-color: ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"};
        }
        .task-item.selected {
          border: 2px solid #4caf50;
          background-color: ${theme === "dark" ? "rgba(76, 175, 80, 0.1)" : "rgba(76, 175, 80, 0.1)"};
        }
      `}</style>
      <div className="task-list-container">
        {/* Add Task Section */}
        <div className="add-task-section p-4">
          <h2 className={`${theme === "dark" ? "text-white" : "text-dark"} mb-4`}>
            {filterImportant ? "Important Tasks" : "Add A Task"}
          </h2>
          <form onSubmit={handleAddTask} className="d-flex gap-2">
            <div className="task-input-group d-flex align-items-center flex-grow-1">
              <Users size={20} className="text-muted mx-2" />
              <Calendar size={20} className="text-muted mx-2" />
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add a task..."
                className="task-input flex-grow-1"
              />
            </div>
            <button type="submit" className="add-task-btn">
              ADD TASK
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="tasks-container p-4">
          {loading ? (
            <div className="text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center text-muted p-4">
              <p>
                {filterImportant
                  ? "No important tasks yet. Star a task to mark it as important!"
                  : "No tasks yet. Add your first task above!"}
              </p>
            </div>
          ) : (
            <div className="tasks-list">
              {/* Incomplete Tasks */}
              {incompleteTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-item ${selectedTaskId === task.id ? "selected" : ""}`}
                  onClick={() => handleTaskSelect(task)}
                >
                  <div className="d-flex align-items-center">
                    <div className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                        id={`task-${task.id}`}
                      />
                      <label htmlFor={`task-${task.id}`}></label>
                    </div>
                    <span className="task-title">{task.title}</span>
                  </div>
                  <button
                    className={`star-btn ${task.important ? "important" : ""}`}
                    onClick={(e) => handleToggleImportant(task.id, e)}
                  >
                    <Star size={18} fill={task.important ? (theme === "dark" ? "white" : "black") : "none"} />
                  </button>
                </div>
              ))}

              {/* Completed Tasks Section */}
              {completedTasks.length > 0 && (
                <div className="completed-section mt-4">
                  <h6 className="text-muted mb-3">Completed</h6>
                  {completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`task-item completed ${selectedTaskId === task.id ? "selected" : ""}`}
                      onClick={() => handleTaskSelect(task)}
                    >
                      <div className="d-flex align-items-center">
                        <div className="custom-checkbox">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleTask(task.id)}
                            id={`task-${task.id}`}
                          />
                          <label htmlFor={`task-${task.id}`}></label>
                        </div>
                        <span className="task-title">{task.title}</span>
                      </div>
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
  );
};

export default TaskList;

"use client";

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../store/tasks/tasksSlice';
import { X, Calendar, AlertTriangle, Clock, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const TaskDetail = ({ task, show, onClose }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  
  useEffect(() => {
    setTitle(task.title);
    setPriority(task.priority);
    setDueDate(task.dueDate || '');
  }, [task]);

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

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    onClose();
  };

  const getPriorityVariant = (p) => {
    switch (p) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getPriorityIcon = (p) => {
    switch (p) {
      case 'high': return <AlertTriangle size={16} />;
      case 'medium': return <Clock size={16} />;
      case 'low': return <Check size={16} />;
      default: return null;
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <style jsx>{`
        .modal-backdrop-custom {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
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
          border-bottom: 1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
        }
        .modal-footer {
          border-top: 1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
        }
        .form-control {
          background-color: ${theme === "dark" ? "#1f1f1f" : "#fff"};
          color: ${theme === "dark" ? "#fff" : "#333"};
          border: 1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
        }
        .form-control:focus {
          background-color: ${theme === "dark" ? "#1f1f1f" : "#fff"};
          color: ${theme === "dark" ? "#fff" : "#333"};
        }
      `}</style>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Task Details</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="taskTitle" className="form-label">Title</label>
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
              
              <div className="mb-3">
                <label className="form-label">Priority</label>
                <div className="d-flex gap-2">
                  {['low', 'medium', 'high'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`btn btn-${getPriorityVariant(p)} ${priority === p ? 'active' : ''}`}
                      onClick={() => {
                        setPriority(p);
                        handleSave();
                      }}
                    >
                      {getPriorityIcon(p)}
                      <span className="ms-1">{p.charAt(0).toUpperCase() + p.slice(1)}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">Due Date</label>
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
        <div className="modal-backdrop fade show"></div>
      </div>
    </div>
  );
};

export default TaskDetail;

"use client";

import { useState } from "react";
import { Plus, Star, Bell, Calendar, RotateCcw, X, Menu } from "lucide-react";

export default function TaskEditor() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#1e1e1e" }}>
      {/* Main content */}
      <div className="flex-grow-1 p-3">
        {/* Todo item with checkbox and star */}
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
              Buy groceries
            </label>
          </div>
          <button className="btn btn-link ms-auto p-0" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            <Star size={18} />
          </button>
        </div>

        {/* Action buttons */}
        <div className="mb-4">
          <button
            className="btn btn-link d-flex align-items-center ps-0 py-2"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            <Plus size={18} className="me-2" />
            <span>Add Step</span>
          </button>
          <button
            className="btn btn-link d-flex align-items-center ps-0 py-2"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            <Bell size={18} className="me-2" />
            <span>Set Reminder</span>
          </button>
          <button
            className="btn btn-link d-flex align-items-center ps-0 py-2"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            <Calendar size={18} className="me-2" />
            <span>Add Due Date</span>
          </button>
          <button
            className="btn btn-link d-flex align-items-center ps-0 py-2"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            <RotateCcw size={18} className="me-2" />
            <span>Repeat</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        className="d-flex justify-content-between align-items-center p-2 border-top"
        style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <button className="btn btn-link p-1" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <X size={18} />
        </button>
        <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem" }}>Created Today</span>
        <button className="btn btn-link p-1" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <Menu size={18} />
        </button>
      </div>
    </div>
  );
}

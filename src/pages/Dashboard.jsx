import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks } from "../store/tasks/tasksSlice";
import { fetchWeather } from "../store/weather/weatherSlice";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import TaskEditor from "../components/TaskEditor";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // State for selected task and UI control
  const [selectedTask, setSelectedTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("all"); // Available views: "all", "important", "planned", "assigned"
  const [showTaskEditor, setShowTaskEditor] = useState(false);

  // Load tasks and weather data on component mount
  useEffect(() => {
    dispatch(loadTasks());
    dispatch(fetchWeather());
  }, [dispatch]);

  // Handle task selection
  const handleTaskSelect = (task) => {
    console.log("Task selected:", task);
    setSelectedTask(task);
    setShowTaskEditor(true);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle view change (e.g., switching to "important" or "planned" tasks)
  const handleViewChange = (view) => {
    setActiveView(view);
    setShowTaskEditor(false);
    setSelectedTask(null);
  };

  // Close task editor
  const handleCloseTaskEditor = () => {
    console.log("Closing TaskEditor");
    setShowTaskEditor(false);
    setSelectedTask(null);
  };

  // Determine filter options based on the selected view
  const getFilterMode = () => {
    switch (activeView) {
      case "important":
        return { filterImportant: true };
      case "planned":
        return { filterPlanned: true };
      case "assigned":
        return { filterAssigned: true };
      default:
        return {};
    }
  };

  return (
    <div className="vh-100 d-flex flex-column position-relative">
      {/* Navbar with sidebar toggle */}
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="flex-grow-1 d-flex overflow-hidden">
        {/* Sidebar with animation */}
        <div
          className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}
          style={{
            width: isSidebarOpen ? "240px" : "0",
            transition: "width 0.3s ease",
            overflow: "hidden",
          }}
        >
          <Sidebar 
            user={user} 
            activeView={activeView} 
            onViewChange={handleViewChange} 
          />
        </div>

        {/* Main task list container */}
        <div 
          className="flex-grow-1 d-flex flex-column overflow-hidden"
          style={{
            marginRight: showTaskEditor ? "400px" : "0",
            transition: "margin-right 0.3s ease",
          }}
        >
          <TaskList 
            onSelectTask={handleTaskSelect} 
            selectedTaskId={selectedTask?.id}
            viewTitle={activeView.charAt(0).toUpperCase() + activeView.slice(1)}
            {...getFilterMode()}
          />
        </div>

        {/* Task Editor (conditionally rendered) */}
        {selectedTask && showTaskEditor && (
          <TaskEditor 
            task={selectedTask} 
            onClose={handleCloseTaskEditor} 
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

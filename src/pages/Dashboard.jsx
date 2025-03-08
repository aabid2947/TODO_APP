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
  const [selectedTask, setSelectedTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("all"); // "all", "important", "planned", "assigned"
  const [showTaskEditor, setShowTaskEditor] = useState(false);

  useEffect(() => {
    dispatch(loadTasks());
    dispatch(fetchWeather());
  }, [dispatch]);

  const handleTaskSelect = (task) => {
    console.log("Task selected:", task);
    setSelectedTask(task);
    setShowTaskEditor(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    // Close the task editor when changing views
    setShowTaskEditor(false);
    setSelectedTask(null);
  };

  const handleCloseTaskEditor = () => {
    console.log("Closing TaskEditor");
    setShowTaskEditor(false);
    setSelectedTask(null);
  };

  // Determine the filter mode based on active view
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

        {/* Task Editor */}
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

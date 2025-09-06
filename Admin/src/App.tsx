import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";

const App = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Users":
        return (
          <div>
            <h2 className="text-2xl font-bold text-white">Users</h2>
            <p className="mt-2 text-gray-300">Manage your users here.</p>
          </div>
        );
      case "Sensor Data":
        return (
          <div>
            <h2 className="text-2xl font-bold text-white">Sensor Data</h2>
            <p className="mt-2 text-gray-300">
              View and analyze sensor readings.
            </p>
          </div>
        );
      case "Settings":
        return (
          <div>
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <p className="mt-2 text-gray-300">Adjust your preferences here.</p>
          </div>
        );
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen relative bg-gradient-to-br from-purple-900 via-black to-purple-950 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-fuchsia-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>
      </div>

      {/* Sidebar */}
      <Sidebar
        name="Admin User"
        email="admin@example.com"
        onLogout={() => alert("Logged out!")}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 relative z-10">{renderContent()}</main>
    </div>
  );
};

export default App;

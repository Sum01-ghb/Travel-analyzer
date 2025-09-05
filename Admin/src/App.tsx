import { useState } from "react";
import Sidebar from "../components/Sidebar";

const App = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        name="Admin User"
        email="admin@example.com"
        onLogout={() => alert("Logged out!")}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold">{activeTab}</h2>
        <p className="mt-2 text-gray-600">Welcome, to Admin Panel!</p>
      </main>
    </div>
  );
};

export default App;

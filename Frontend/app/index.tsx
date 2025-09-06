import "./global.css";
import { View } from "react-native";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <View className="flex-1">
      {/* Sidebar */}
      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Navbar*/}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onMenuPress={() => setSidebarOpen(true)}
      />

      {/* Main page */}
      <View
        className={`flex-1 items-center justify-center space-y-6 ${
          darkMode ? "bg-white" : "bg-gray-900"
        }`}
      >
        <Card darkMode={darkMode} />
      </View>
    </View>
  );
}

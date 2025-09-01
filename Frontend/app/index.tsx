import "./global.css";
import { Text, View } from "react-native";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Index() {
  // Local state for theme + sidebar
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <View className="flex-1">
      {/* Sidebar (hidden unless sidebarOpen = true) */}
      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Navbar at the top */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onMenuPress={() => setSidebarOpen(true)}
      />

      {/* Main page with inverted color */}
      <View
        className={`flex-1 items-center justify-center ${
          darkMode ? "bg-white" : "bg-gray-900"
        }`}
      >
        <Text
          className={`text-xl font-bold ${
            darkMode ? "text-blue-600" : "text-blue-300"
          }`}
        >
          Welcome to Nativewind!
        </Text>
      </View>
    </View>
  );
}

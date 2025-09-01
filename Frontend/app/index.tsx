import "./global.css";
import { Text, View } from "react-native";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Index() {
  // Local state to sync with Navbar’s theme
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View className="flex-1">
      {/* Navbar at the top */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

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

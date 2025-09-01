import { View, Text, Pressable } from "react-native";
import { X, Flame, Footprints } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

type SidebarProps = {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ darkMode, isOpen, onClose }: SidebarProps) => {
  const translateX = useSharedValue(-300);

  useEffect(() => {
    translateX.value = withTiming(isOpen ? 0 : -300, { duration: 300 });
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className={`absolute left-0 top-0 h-full w-72 p-5 shadow-xl z-50 border-r rounded-r-lg rounded-t-lgr ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-300 border-gray-200"
      }`}
    >
      {/* Close Button */}
      <Pressable onPress={onClose} className="mb-8">
        <X size={26} color={darkMode ? "white" : "black"} />
      </Pressable>

      {/* Sidebar Title */}
      <Text
        className={`text-2xl font-bold mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Dashboard
      </Text>

      {/* Stats Section */}
      <View className="space-y-4">
        {/* Calories Box */}
        <View
          className={`flex-row items-center p-4 rounded-2xl shadow-md mb-8 ${
            darkMode ? "bg-gray-600" : "bg-gray-100"
          }`}
        >
          <Flame size={28} color={darkMode ? "#f87171" : "#dc2626"} />
          <View className="ml-3">
            <Text
              className={`text-base font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Calories Burned
            </Text>
            <Text
              className={`text-xl font-bold ${
                darkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              450 kcal
            </Text>
          </View>
        </View>

        {/* Footsteps Box */}
        <View
          className={`flex-row items-center p-4 rounded-2xl shadow-md ${
            darkMode ? "bg-gray-600" : "bg-gray-100"
          }`}
        >
          <Footprints size={28} color={darkMode ? "#60a5fa" : "#2563eb"} />
          <View className="ml-3">
            <Text
              className={`text-base font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Footsteps
            </Text>
            <Text
              className={`text-xl font-bold ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              8,200
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default Sidebar;

import { View, Text, Pressable } from "react-native";
import { Menu, Moon, Sun } from "lucide-react-native";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
};

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  return (
    <View
      className={`flex-row items-center justify-between px-4 py-3 shadow-md h-20 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Left - Menu Icon */}
      <Pressable>
        <Menu size={24} color={darkMode ? "white" : "black"} />
      </Pressable>

      {/* Middle - Title */}
      <Text
        className={`text-2xl font-bold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Travel Analyzer
      </Text>

      {/* Right - Toggle */}
      <Pressable onPress={() => setDarkMode(!darkMode)}>
        {darkMode ? (
          <Sun size={24} color="white" />
        ) : (
          <Moon size={24} color="black" />
        )}
      </Pressable>
    </View>
  );
};

export default Navbar;

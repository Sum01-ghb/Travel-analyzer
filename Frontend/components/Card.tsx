import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import {
  ChevronDown,
  Play,
  Pause,
  Car,
  Bus,
  Footprints,
  Bike,
} from "lucide-react-native";
import cn from "clsx";

const vehicles = [
  { label: "Car", icon: Car },
  { label: "Bus", icon: Bus },
  { label: "Auto", icon: Bike },
  { label: "Walk", icon: Footprints },
];

const Card = ({ darkMode }: { darkMode: boolean }) => {
  const [selected, setSelected] = useState("Car");
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedVehicle = vehicles.find((v) => v.label === selected);

  return (
    <View
      className={cn(
        "w-full max-w-sm rounded-2xl shadow-lg p-4",
        darkMode ? "bg-gray-800" : "bg-slate-300"
      )}
    >
      {/* Title */}
      <Text
        className={cn(
          "text-lg font-semibold text-center mb-3",
          darkMode ? "text-gray-100" : "text-gray-700"
        )}
      >
        Choose your transport
      </Text>

      {/* Dropdown Toggle */}
      <TouchableOpacity
        className={cn(
          "flex-row items-center justify-between rounded-xl px-3 py-2 border",
          darkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-gray-200 border-gray-300"
        )}
        onPress={() => setOpen(!open)}
      >
        <View className="flex-row items-center">
          {selectedVehicle && (
            <selectedVehicle.icon size={18} color="#22c55e" />
          )}
          <Text
            className={cn("ml-2", darkMode ? "text-gray-200" : "text-gray-800")}
          >
            {selected}
          </Text>
        </View>
        <ChevronDown size={20} color="gray" />
      </TouchableOpacity>

      {/* Custom Dropdown */}
      {open && (
        <View
          className={cn(
            "mt-2 rounded-xl border",
            darkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-300"
          )}
        >
          <FlatList
            data={vehicles}
            keyExtractor={(item) => item.label}
            renderItem={({ item }) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelected(item.label);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex-row items-center px-4 py-3 border-b",
                    darkMode ? "border-gray-700" : "border-gray-200"
                  )}
                >
                  <Icon
                    size={18}
                    color={selected === item.label ? "#22c55e" : "#6b7280"}
                  />
                  <Text
                    className={cn(
                      "ml-3 text-base",
                      selected === item.label
                        ? "text-green-500 font-semibold"
                        : darkMode
                          ? "text-gray-200"
                          : "text-gray-800"
                    )}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      {/* Action Button */}
      <TouchableOpacity
        onPress={() => setIsPlaying(!isPlaying)}
        className={cn(
          "mt-5 w-32 h-32 rounded-full items-center justify-center self-center",
          isPlaying ? "bg-red-500" : "bg-green-500"
        )}
      >
        {isPlaying ? (
          <Pause size={40} color="white" />
        ) : (
          <Play size={40} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Card;

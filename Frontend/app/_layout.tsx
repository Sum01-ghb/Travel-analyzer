import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Hide native header since we’re using our own Navbar */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* Status bar adapts to theme */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

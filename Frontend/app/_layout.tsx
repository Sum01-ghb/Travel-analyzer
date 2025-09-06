import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import "./global.css";
import { requestAllPermissions } from "@/services/Permissions";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    requestAllPermissions().then((res) => {
      console.log("✅ Permission results:", res);

      if (!res.location) {
        Toast.show({
          type: "error",
          text1: "Location Permission Denied",
          text2: "Some features may not work properly.",
        });
      }

      if (!res.motion) {
        Toast.show({
          type: "error",
          text1: "Motion Permission Denied",
          text2: "Motion sensors may not work properly.",
        });
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
      <Toast />
    </SafeAreaView>
  );
}

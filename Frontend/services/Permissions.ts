import * as Location from "expo-location";
import { Platform } from "react-native";
import { DeviceMotion } from "expo-sensors";

export interface PermissionResult {
  location: boolean;
  motion: boolean;
}

export async function requestAllPermissions(): Promise<PermissionResult> {
  try {
    // Location permission
    const { status: locationStatus } =
      await Location.requestForegroundPermissionsAsync();

    if (locationStatus !== "granted") {
      console.warn("⚠️ Location permission not granted");
    }

    // Motion / sensors permission
    let motionGranted = true;
    if (Platform.OS === "ios") {
      const { status: motionStatus } =
        await DeviceMotion.requestPermissionsAsync();
      motionGranted = motionStatus === "granted";
      if (!motionGranted) {
        console.warn("⚠️ Motion permission not granted");
      }
    }

    return {
      location: locationStatus === "granted",
      motion: motionGranted,
    };
  } catch (error) {
    console.error("Permission error:", error);
    return { location: false, motion: false };
  }
}

import * as Location from "expo-location";
import { Accelerometer, Gyroscope, Magnetometer } from "expo-sensors";

export interface SensorData {
  timestamp: number;
  location?: {
    latitude: number;
    longitude: number;
    speed: number | null;
  };
  accelerometer?: { x: number; y: number; z: number };
  gyroscope?: { x: number; y: number; z: number };
  magnetometer?: { x: number; y: number; z: number };
}

let accelSub: any = null;
let gyroSub: any = null;
let magSub: any = null;
let locationSub: Location.LocationSubscription | null = null;

// We'll keep collected data in memory for now
const dataLog: SensorData[] = [];

export async function startSensors() {
  console.log("▶️ Starting sensors...");

  // Location updates
  locationSub = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 2000,
      distanceInterval: 1,
    },
    (loc) => {
      dataLog.push({
        timestamp: Date.now(),
        location: {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          speed: loc.coords.speed,
        },
      });
    }
  );

  // Accelerometer
  accelSub = Accelerometer.addListener((data) => {
    dataLog.push({
      timestamp: Date.now(),
      accelerometer: data,
    });
  });
  Accelerometer.setUpdateInterval(1000); // 1s

  // Gyroscope
  gyroSub = Gyroscope.addListener((data) => {
    dataLog.push({
      timestamp: Date.now(),
      gyroscope: data,
    });
  });
  Gyroscope.setUpdateInterval(1000);

  // Magnetometer (compass)
  magSub = Magnetometer.addListener((data) => {
    dataLog.push({
      timestamp: Date.now(),
      magnetometer: data,
    });
  });
  Magnetometer.setUpdateInterval(1000);
}

export function stopSensors() {
  console.log("⏹️ Stopping sensors...");
  accelSub?.remove();
  gyroSub?.remove();
  magSub?.remove();
  locationSub?.remove();

  accelSub = null;
  gyroSub = null;
  magSub = null;
  locationSub = null;
}

export function getCollectedData(): SensorData[] {
  return dataLog;
}

export function clearData() {
  dataLog.length = 0;
}

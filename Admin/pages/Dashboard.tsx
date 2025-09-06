import { Activity, Move, Compass } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";

const valueStyle = (color: string) =>
  `px-3 py-1 rounded-lg font-mono text-sm font-semibold ${color} bg-gray-800/60 border border-white/10 shadow-inner`;

const getDirection = (deg: number) => {
  const dirs = [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
  ];
  return dirs[Math.round(deg / 45) % 8];
};

const Dashboard = () => {
  const [accelData, setAccelData] = useState<{ time: number; accel: number }[]>(
    []
  );

  const [gyroData, setGyroData] = useState<{ x: number; y: number; z: number }>(
    {
      x: 0,
      y: 0,
      z: 0,
    }
  );

  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Accelerometer
      setAccelData((prev) => {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const z = Math.random() * 2 - 1;
        const accel = Math.sqrt(x * x + y * y + z * z);

        const next = [...prev, { time: prev.length, accel }];
        return next.slice(-15);
      });

      // Gyroscope
      setGyroData({
        x: Math.random() * 360,
        y: Math.random() * 360,
        z: Math.random() * 360,
      });

      // Magnetometer
      setHeading(Math.floor(Math.random() * 360));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
      <div className="mb-6 relative z-10">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Dashboard
        </h1>
        <p className="text-gray-300 font-medium">Motion sensor data overview</p>
      </div>

      <div className="flex flex-1 gap-6 relative z-10">
        {/* Left side */}
        <div className="flex-1 space-y-6">
          {/* Accelerometer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-2xl bg-gray-900/60 backdrop-blur-md p-6 shadow-lg border border-purple-500/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <Move className="text-purple-400" size={30} />
              <h2 className="text-2xl font-semibold text-white">
                Accelerometer
              </h2>
            </div>

            <div className="h-32 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" hide />
                  <YAxis stroke="#aaa" domain={[0, 2]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="accel"
                    stroke="#a855f7"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {accelData.length > 0 && (
              <div>
                <span className={valueStyle("text-purple-400")}>
                  Acceleration:{" "}
                  {accelData[accelData.length - 1].accel.toFixed(2)}
                </span>
              </div>
            )}
          </motion.div>

          {/* Gyroscope */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-2xl bg-gray-900/60 backdrop-blur-md p-6 shadow-lg border border-fuchsia-500/30 flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-4 self-start">
              <Activity className="text-fuchsia-400" size={30} />
              <h2 className="text-2xl font-semibold text-white">Gyroscope</h2>
            </div>

            {/* 3D Cube */}
            <div className="w-16 h-16 mb-8 perspective-500">
              <motion.div
                className="relative w-full h-full"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateX: gyroData.x,
                  rotateY: gyroData.y,
                  rotateZ: gyroData.z,
                }}
                transition={{ duration: 1 }}
              >
                {["front", "back", "right", "left", "top", "bottom"].map(
                  (face) => (
                    <div
                      key={face}
                      className="absolute w-full h-full bg-gradient-to-br from-pink-500/60 to-purple-600/60 border border-white/10"
                      style={{
                        transform: (() => {
                          switch (face) {
                            case "front":
                              return "translateZ(32px)";
                            case "back":
                              return "rotateY(180deg) translateZ(32px)";
                            case "right":
                              return "rotateY(90deg) translateZ(32px)";
                            case "left":
                              return "rotateY(-90deg) translateZ(32px)";
                            case "top":
                              return "rotateX(90deg) translateZ(32px)";
                            case "bottom":
                              return "rotateX(-90deg) translateZ(32px)";
                            default:
                              return "";
                          }
                        })(),
                      }}
                    />
                  )
                )}
              </motion.div>
            </div>

            {/* Values */}
            <div className="flex gap-3">
              <span className={valueStyle("text-purple-400")}>
                X: {gyroData.x.toFixed(1)}°
              </span>
              <span className={valueStyle("text-pink-400")}>
                Y: {gyroData.y.toFixed(1)}°
              </span>
              <span className={valueStyle("text-indigo-400")}>
                Z: {gyroData.z.toFixed(1)}°
              </span>
            </div>
          </motion.div>

          {/* Magnetometer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-2xl bg-gray-900/60 backdrop-blur-md p-6 shadow-lg border border-indigo-500/30"
          >
            {/* Title */}
            <div className="flex items-center gap-3 mb-4">
              <Compass className="text-indigo-400" size={30} />
              <h2 className="text-2xl font-semibold text-white">
                Magnetometer
              </h2>
            </div>

            <div className="flex items-center justify-center gap-6">
              {/* Compass */}
              <div className="relative w-32 h-32 rounded-full border-2 border-indigo-400 flex items-center justify-center">
                <motion.div
                  className="absolute w-1 h-14 bg-red-500 rounded origin-center"
                  animate={{ rotate: heading }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                />

                {/* Labels */}
                <span className="absolute top-1 text-xs text-gray-300">N</span>
                <span className="absolute right-1 text-xs text-gray-300">
                  E
                </span>
                <span className="absolute bottom-1 text-xs text-gray-300">
                  S
                </span>
                <span className="absolute left-1 text-xs text-gray-300">W</span>
                <span className="absolute top-5 right-5 text-[10px] text-gray-400">
                  NE
                </span>
                <span className="absolute bottom-5 right-5 text-[10px] text-gray-400">
                  SE
                </span>
                <span className="absolute bottom-5 left-5 text-[10px] text-gray-400">
                  SW
                </span>
                <span className="absolute top-5 left-5 text-[10px] text-gray-400">
                  NW
                </span>
              </div>

              <div className="flex flex-col items-start text-indigo-300">
                <span className="text-xl font-semibold">{heading}°</span>
                <span className="text-lg">{getDirection(heading)}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right side (Summary) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="w-1/3 rounded-2xl bg-gray-900/60 backdrop-blur-md p-6 shadow-lg border border-purple-500/30"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Summary</h2>
          <ul className="text-gray-300 text-lg space-y-3">
            <li>Steps: 0</li>
            <li>Calories Burned: 0</li>
            <li>Activity: Idle</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

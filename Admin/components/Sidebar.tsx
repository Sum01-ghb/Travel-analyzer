import React from "react";
import cn from "clsx";
import { LogOut } from "lucide-react";

type SidebarProps = {
  name: string;
  email: string;
  avatarUrl?: string;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const getInitials = (fullName: string) =>
  fullName
    .split(" ")
    .map((s) => s[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");

const Sidebar: React.FC<SidebarProps> = ({
  name,
  email,
  avatarUrl,
  onLogout,
  activeTab,
  onTabChange,
}) => {
  const tabs = ["Dashboard", "Users", "Sensor Data", "Settings"];

  return (
    <section
      className={cn(
        "w-72 max-w-full h-screen sticky top-0 flex flex-col border-r bg-white dark:bg-gray-900 dark:border-gray-800 px-5 py-6 rounded-r-sm"
      )}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Admin Panel
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Travel Analyzer
        </p>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 rounded-xl border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 border-gray-200 p-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-14 w-14 rounded-full border-2 border-white dark:border-gray-700 object-cover"
          />
        ) : (
          <div className="h-14 w-14 rounded-full grid place-items-center font-semibold text-white bg-gradient-to-br from-indigo-500 to-purple-500">
            {getInitials(name)}
          </div>
        )}

        <div className="min-w-0">
          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
            {name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {email}
          </p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="mt-6 space-y-2 text-md font-bold">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "block w-full text-left rounded-lg px-3 py-2 transition-colors cursor-pointer",
              activeTab === tab
                ? "bg-gray-200 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-medium px-4 py-2 transition-colors cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </section>
  );
};

export default Sidebar;

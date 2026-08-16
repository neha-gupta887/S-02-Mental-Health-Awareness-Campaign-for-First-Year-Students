import { useState } from "react";
import { useNotifications } from "../context/NotificationContext.jsx";

import NotificationHeader from "../components/notifications/NotificationHeader";
import NotificationStats from "../components/notifications/NotificationStats";
import NotificationSearch from "../components/notifications/NotificationSearch";
import NotificationFilters from "../components/notifications/NotificationFilters";
import NotificationList from "../components/notifications/NotificationList";
import NotificationEmptyState from "../components/notifications/NotificationEmptyState";
import ClearFiltersButton from "../components/notifications/ClearFiltersButton";
import NotificationSort from "../components/notifications/NotificationSort";

function Notifications() {
  const {
    notifications: notificationList,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useNotifications();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  const stats = [
    {
      title: "Total",
      value: notificationList.length,
      color: "text-emerald-600",
    },
    {
      title: "Unread",
      value: unreadCount,
      color: "text-red-500",
    },
    {
      title: "Today",
      value: notificationList.filter(
        (notification) =>
          notification.time.includes("min") ||
          notification.time.includes("hour")
      ).length,
      color: "text-blue-500",
    },
    {
      title: "Read Rate",
      value: notificationList.length
        ? `${Math.round(
            (notificationList.filter(
              (notification) => notification.read
            ).length /
              notificationList.length) *
              100
          )}%`
        : "0%",
      color: "text-purple-500",
    },
  ];

  const filteredNotifications = [...notificationList]
    .filter((notification) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        notification.title.toLowerCase().includes(search) ||
        notification.message.toLowerCase().includes(search);

      let matchesFilter = true;

      if (selectedFilter === "Unread") {
        matchesFilter = !notification.read;
      }

      if (selectedFilter === "Today") {
        matchesFilter =
          notification.time.includes("min") ||
          notification.time.includes("hour");
      }

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "unread") {
        return Number(a.read) - Number(b.read);
      }

      if (sortBy === "oldest") {
        return a.id - b.id;
      }

      return b.id - a.id;
    });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <NotificationHeader unreadCount={unreadCount} />

        <NotificationStats stats={stats} />

        <NotificationSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <NotificationFilters
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />

        {(searchTerm || selectedFilter !== "All") && (
          <ClearFiltersButton
            setSearchTerm={setSearchTerm}
            setSelectedFilter={setSelectedFilter}
          />
        )}

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredNotifications.length} notification
          {filteredNotifications.length !== 1 ? "s" : ""}

          {selectedFilter !== "All" && (
            <> • Filter: {selectedFilter}</>
          )}
        </p>

        <NotificationSort
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            onClick={markAllAsRead}
            disabled={
              notificationList.length === 0 ||
              notificationList.every(
                (notification) => notification.read
              )
            }
            className="rounded-xl bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Mark All as Read
          </button>

          <button
            onClick={clearAllNotifications}
            disabled={notificationList.length === 0}
            className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear All
          </button>
        </div>

        <div className="mt-12">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Notifications ({filteredNotifications.length})
          </h2>

          {filteredNotifications.length === 0 ? (
            <NotificationEmptyState />
          ) : (
            <NotificationList
              notifications={filteredNotifications}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          )}

        </div>

      </div>
    </div>
  );
}

export default Notifications;

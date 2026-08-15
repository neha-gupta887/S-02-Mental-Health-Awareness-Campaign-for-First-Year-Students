import { createContext, useState, useMemo, useContext } from "react";
import toast from "react-hot-toast";
import { notifications as initialNotifications } from "../data/notifications";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  // NOTE: This component uses static data. State changes are not persistent across sessions.
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    toast.success("Notification marked as read.");
  };

  const markAllAsRead = () => {
    if (unreadCount === 0) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read.");
  };

  const deleteNotification = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notification?"
    );
    if (!confirmed) return;

    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification deleted.");
  };

  const clearAllNotifications = () => {
    if (notifications.length === 0) return;
    const confirmed = window.confirm(
      "Are you sure you want to clear all notifications?"
    );
    if (!confirmed) return;

    setNotifications([]);
    toast.success("All notifications cleared.");
  };

  const value = {
    notifications,
    setNotifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}
import { createContext, useContext } from "react";

export interface NotificationOptions {
  key?: string;
  severity?: "success" | "error" | "info" | "warning";
  autoHideDuration?: number;
  actionText?: string;
  onAction?: () => void;
}

export interface NotificationsContextType {
  show: (message: string, options?: NotificationOptions) => string;
  close: (key?: string) => void;
}

// 🔹 Cria o contexto com tipo seguro
const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// 🔹 Hook seguro — impede uso fora do Provider
export function useNotifications(): NotificationsContextType {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
}

export default NotificationsContext;

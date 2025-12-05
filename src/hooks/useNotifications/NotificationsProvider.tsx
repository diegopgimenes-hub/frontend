import { Alert, AlertColor, Button, Snackbar } from "@mui/material";
import React, { useCallback, useState } from "react";
import NotificationsContext, { NotificationOptions } from "./NotificationsContext";

interface Notification {
  key: string;
  message: string;
  severity: AlertColor;
  autoHideDuration: number;
  actionText?: string;
  onAction?: () => void;
}

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const show = useCallback((message: string, options: NotificationOptions = {}): string => {
    const key = options.key ?? Date.now().toString();
    const notification: Notification = {
      key,
      message,
      severity: options.severity ?? "info",
      autoHideDuration: options.autoHideDuration ?? 4000,
      actionText: options.actionText,
      onAction: options.onAction,
    };

    setNotifications(prev => [...prev, notification]);
    return key;
  }, []);

  const close = useCallback((key?: string) => {
    if (key) {
      setNotifications(prev => prev.filter(n => n.key !== key));
    } else {
      setNotifications([]);
    }
  }, []);

  const handleClose = useCallback(
    (key: string) => {
      close(key);
    },
    [close],
  );

  return (
    <NotificationsContext.Provider value={{ show, close }}>
      {children}

      {notifications.map(n => (
        <Snackbar
          key={n.key}
          open={true}
          autoHideDuration={n.autoHideDuration}
          onClose={() => handleClose(n.key)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={n.severity}
            variant="filled"
            onClose={() => handleClose(n.key)}
            action={
              n.actionText ? (
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    n.onAction?.();
                    handleClose(n.key);
                  }}
                >
                  {n.actionText}
                </Button>
              ) : undefined
            }
          >
            {n.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationsContext.Provider>
  );
};

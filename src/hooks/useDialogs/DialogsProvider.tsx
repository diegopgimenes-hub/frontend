import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import { ConfirmOptions, DialogsContext } from "./DialogsContext";

interface DialogState extends ConfirmOptions {
  open: boolean;
  resolve?: (_value: boolean) => void;
}

interface DialogsProviderProps {
  children: ReactNode;
}

export const DialogsProvider: React.FC<DialogsProviderProps> = ({ children }) => {
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    title: "",
    description: "",
    severity: "info",
  });

  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise(resolve => {
      setDialogState({
        open: true,
        ...options,
        resolve,
      });
    });
  };

  const handleClose = (result: boolean) => {
    if (dialogState.resolve) dialogState.resolve(result);
    setDialogState(prev => ({ ...prev, open: false }));
  };

  const value = { confirm };

  return (
    <DialogsContext.Provider value={value}>
      {children}

      <Dialog open={dialogState.open} onClose={() => handleClose(false)}>
        {dialogState.title && <DialogTitle>{dialogState.title}</DialogTitle>}

        <DialogContent>
          {dialogState.severity && (
            <Alert severity={dialogState.severity} sx={{ mb: 2 }}>
              {dialogState.description}
            </Alert>
          )}
          {!dialogState.severity && dialogState.description && (
            <DialogContentText>{dialogState.description}</DialogContentText>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose(false)}>{dialogState.cancelText || "Cancel"}</Button>
          <Button onClick={() => handleClose(true)} variant="contained" color="error">
            {dialogState.confirmText || "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </DialogsContext.Provider>
  );
};

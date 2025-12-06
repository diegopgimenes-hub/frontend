import AddIcon from "@mui/icons-material/Add";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import UserForm from "./UserForm";

interface UserCreateProps {
  open: boolean;
  onClose: () => void;
}

export default function UserCreate({ open, onClose }: UserCreateProps) {
  const handleSuccess = () => {
    // Você pode emitir um evento, chamar um callback, etc.
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="user-create-dialog"
    >
      <DialogTitle id="user-create-dialog">
        <AddIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Novo Usuário
      </DialogTitle>

      <DialogContent dividers>
        <UserForm key="user-form-create" onSuccess={handleSuccess} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

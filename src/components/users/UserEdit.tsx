import EditIcon from "@mui/icons-material/Edit";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import UserForm from "./UserForm";

interface UserEditProps {
  open: boolean;
  userId: number | null;
  onClose: () => void;
}

export default function UserEdit({ open, userId, onClose }: UserEditProps) {
  if (!userId) return null;

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <EditIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Editar Usuário
      </DialogTitle>

      <DialogContent dividers>
        <UserForm key={`user-form-edit-${userId}`} userId={userId} onSuccess={handleSuccess} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

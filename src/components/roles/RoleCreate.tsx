import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import RoleForm from "./RoleForm";

interface RoleCreateProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RoleCreate({ open, onClose, onSuccess }: RoleCreateProps) {
  const handleSuccess = () => {
    // chama callback externa, se existir
    if (onSuccess) onSuccess();
    // fecha o modal automaticamente
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Criar Role</DialogTitle>
      <DialogContent>
        <RoleForm onSuccess={handleSuccess} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}

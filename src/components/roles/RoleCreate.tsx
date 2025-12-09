import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import RoleForm from "./RoleForm";

interface RoleCreateProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RoleCreate({ open, onClose, onSuccess }: RoleCreateProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Criar Role</DialogTitle>
      <DialogContent>
        <RoleForm onSuccess={onSuccess} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}

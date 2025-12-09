import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import RoleForm from "./RoleForm";

interface RoleEditProps {
  open: boolean;
  roleId: number;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RoleEdit({ open, roleId, onClose, onSuccess }: RoleEditProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Role</DialogTitle>
      <DialogContent>
        <RoleForm roleId={roleId} onSuccess={onSuccess} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}

import { getRole, Role } from "@/api/roleApi";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface RoleShowProps {
  open: boolean;
  roleId: number;
  onClose: () => void;
}

export default function RoleShow({ open, roleId, onClose }: RoleShowProps) {
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    if (open && roleId) {
      getRole(roleId).then(setRole).catch(console.error);
    }
  }, [open, roleId]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Detalhes da Role</DialogTitle>
      <DialogContent>
        {role ? (
          <>
            <Typography variant="subtitle1">ID: {role.id}</Typography>
            <Typography variant="subtitle1">Nome: {role.name}</Typography>
          </>
        ) : (
          <Typography variant="body2">Carregando...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}

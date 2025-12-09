import { getUser, type User } from "@/api/userApi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface UserShowProps {
  open: boolean;
  userId: number | null;
  onClose: () => void;
}

export default function UserShow({ open, userId, onClose }: UserShowProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (open && userId) {
      getUser(userId)
        .then(setUser)
        .catch(() => setUser(null));
    }
  }, [open, userId]);

  if (!userId) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <VisibilityIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Detalhes do Usuário
      </DialogTitle>

      <DialogContent dividers>
        {user ? (
          <Stack spacing={2}>
            <Typography>
              <strong>ID:</strong> {user.id}
            </Typography>
            <Typography>
              <strong>Usuário:</strong> {user.username}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography>
              <strong>Perfis:</strong> {user.roles?.join(", ")}
            </Typography>
            <Typography>
              <strong>Ativo:</strong> {user.enabled ? "Sim" : "Não"}
            </Typography>
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Carregando dados do usuário...
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
